import { useEffect, useMemo, useState } from 'react'
import type { ProductWithPrices } from '@/db/functions/products'

export default function useGetProducts() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductWithPrices[] | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/products`)
        const { data } = (await res.json()) as { data: ProductWithPrices[] }
        setProducts(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const props = useMemo(
    () => ({
      loading,
      products,
    }),
    [loading, products]
  )

  return props
}
