import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import { createOrRetrieveCustomer } from '@/db/functions/stripe'
import { getAuthSession } from '@/lib/auth'

export async function POST(request: Request) {
  const { price, quantity = 1, metadata = {} } = await request.json()

  try {
    const session = await getAuthSession()
    const user = session?.user
    console.log('user', user)
    const customer = await createOrRetrieveCustomer(
      user?.id as string,
      user?.email as string
    )
    console.log('customer', customer)
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}account`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    })

    return NextResponse.json({ sessionId: stripeSession.id, status: 200 })
  } catch (err: any) {
    console.log(err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
