import { getProducts } from '@/db/functions/products'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const products = await getProducts()

    console.log({ products })
    return NextResponse.json({
      status: 200,
      data: products,
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.error()
  }
}
