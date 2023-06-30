import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { toDateTime } from '@/utils/stripe'
import type { Subscription, SubscriptionStatus } from '@prisma/client'
import Stripe from 'stripe'

export async function upsertProduct(product: Stripe.Product) {
  try {
    const { id, name, description, images, active, metadata } = product
    const newProduct = await db.product.upsert({
      where: { id },
      create: { id, name, description, image: images[0], active, metadata },
      update: { name, description, image: images[0], active, metadata },
    })
    console.log('newProduct: upsert', newProduct)
    return newProduct
  } catch (error) {
    console.log(error)
  }
}

export async function upsertPrice(price: Stripe.Price) {
  try {
    const {
      id,
      active,
      currency,
      unit_amount,
      product: productId,
      type,
      recurring,
    } = price
    const newPrice = await db.price.upsert({
      where: { id },
      create: {
        id,
        active,
        currency,
        unit_amount,
        product_id: typeof productId === 'string' ? productId : '',
        type,
        interval: recurring?.interval,
        interval_count: recurring?.interval_count,
        trial_period_days: recurring?.trial_period_days,
        metadata: price.metadata,
      },
      update: {
        active,
        currency,
        unit_amount,
        product_id: typeof productId === 'string' ? productId : '',
        type,
        interval: recurring?.interval,
        interval_count: recurring?.interval_count,
        trial_period_days: recurring?.trial_period_days,
        metadata: price.metadata,
      },
    })
    console.log('newPrice: upsert', newPrice)
    return newPrice
  } catch (error) {
    console.log(error)
  }
}

export async function createOrRetrieveCustomer(uuid: string, email: string) {
  try {
    const customer = await db.customer.findUnique({
      where: { id: uuid },
    })
    console.log('customer: findUnique', customer)
    if (!customer) {
      const customerData: Stripe.CustomerCreateParams = {
        metadata: {
          uuid,
        },
        email,
      }
      const stripeCustomer = await stripe.customers.create(customerData)
      const newCustomer = await db.customer.create({
        data: {
          id: uuid,
          stripe_customer_id: stripeCustomer.id,
          email,
        },
      })

      console.log('newCustomer: create', newCustomer)
      return stripeCustomer.id
    }
    return customer.stripe_customer_id
  } catch (error) {
    console.log(error)
  }
}

export async function copyBillingDetailsToCustomer(
  uuid: string,
  payment_method: Stripe.PaymentMethod
) {
  try {
    const customer = payment_method.customer as string
    const { name, phone, address } = payment_method.billing_details
    if (!name || !phone || !address) return

    // @ts-ignore
    await stripe.customers.update(customer, { name, phone, address })
    const user = await db.user.update({
      where: { id: uuid },
      data: {
        billing_address: { ...address },
        // @ts-ignore
        payment_method: { ...payment_method[payment_method.type] },
      },
    })
    return user
  } catch (error) {
    console.log(error)
  }
}

export async function handleSubscriptionChange(
  subscriptionId: string,
  customerId: string,
  {
    isCreate = false,
  }: {
    isCreate?: boolean
  } = {}
) {
  try {
    const customer = await db.customer.findUnique({
      where: { stripe_customer_id: customerId },
      select: { id: true },
    })

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['default_payment_method'],
    })

    const uuid = customer?.id!
    // @ts-ignore
    const subscriptionData: Subscription = {
      id: subscription.id,
      userId: uuid,
      status: subscription.status as SubscriptionStatus,
      price_id: subscription.items.data[0].price.id,
      quantity: subscription.items.data[0].quantity as number,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: subscription.cancel_at
        ? toDateTime(subscription.cancel_at)
        : null,
      canceled_at: subscription.canceled_at
        ? toDateTime(subscription.canceled_at)
        : null,
      current_period_start: toDateTime(subscription.current_period_start),
      current_period_end: toDateTime(subscription.current_period_end),
      created: toDateTime(subscription.created),
      ended_at: subscription.ended_at
        ? toDateTime(subscription.ended_at)
        : null,
      trial_start: subscription.trial_start
        ? toDateTime(subscription.trial_start)
        : null,
      trial_end: subscription.trial_end
        ? toDateTime(subscription.trial_end)
        : null,
    }

    const newSubscription = await db.subscription.upsert({
      where: { id: subscriptionData.id },
      create: {
        ...subscriptionData,
        metadata: subscriptionData.metadata ?? undefined,
      },
      update: {
        ...subscriptionData,
        metadata: subscriptionData.metadata ?? undefined,
      },
    })
    // For a new subscription copy the billing details to the customer object.
    // NOTE: This is a costly operation and should happen at the very end.
    if (isCreate && uuid && subscription.default_payment_method) {
      await copyBillingDetailsToCustomer(
        uuid,
        subscription.default_payment_method as Stripe.PaymentMethod
      )
    }
    return newSubscription
  } catch (error) {
    console.log(error)
  }
}
