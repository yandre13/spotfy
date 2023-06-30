import { db } from '@/lib/db'

export async function getProducts() {
  const products = await db.product.findMany({
    include: {
      prices: true,
    },
  })
  return products
}

export type ProductWithPrices = Awaited<ReturnType<typeof getProducts>>[0]
