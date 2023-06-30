import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createOrRetrieveCustomer } from '@/db/functions/stripe'
import { getAuthSession } from '@/lib/auth'

export async function POST() {
  try {
    const session = await getAuthSession()
    const user = session?.user
    if (!user) throw Error('Could not get user')

    const customer = await createOrRetrieveCustomer(user.id, user.email!)

    if (!customer) throw Error('Could not get customer')
    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}account`,
    })

    return NextResponse.json({ url, status: 200 })
  } catch (err: any) {
    console.log(err)
    new NextResponse('Internal Error', { status: 500 })
  }
}
