import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'

import {
  upsertProduct,
  upsertPrice,
  handleSubscriptionChange,
} from '@/db/functions/stripe'

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export async function POST(request: Request) {
  const body = await request.text() // for stripe webhooks, we need to read the body as text
  const sig = headers().get('Stripe-Signature')

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!sig || !webhookSecret) return
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProduct(event.data.object as Stripe.Product) // create or update product in database when product is created or updated in Stripe
          break
        case 'price.created':
        case 'price.updated':
          await upsertPrice(event.data.object as Stripe.Price) // create or update price in database when price is created or updated in Stripe
          break
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription
          const res = await handleSubscriptionChange(
            subscription.id,
            subscription.customer as string,
            {
              isCreate: event.type === 'customer.subscription.created',
            }
          ) // create or update subscription in database when subscription is created, updated, or deleted in Stripe
          console.log(res)
          break
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription
            const res = await handleSubscriptionChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              {
                isCreate: true,
              }
            ) // create or update subscription in database when subscription is created in Stripe
            console.log(res)
          }
          break
        default:
          throw new Error('Unhandled relevant event!')
      }
    } catch (error) {
      console.log(error)
      return new NextResponse(
        'Webhook error: "Webhook handler failed. View logs."',
        { status: 400 }
      )
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
