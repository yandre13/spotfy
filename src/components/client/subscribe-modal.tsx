'use client'
import ModalDialog from '../modal'
import useModals from '@/hooks/use-modals'
import useGetProducts from '@/hooks/use-get-products'
import useAuth from '@/hooks/use-auth'
import type { ProductWithPrices } from '@/db/functions/products'
import type { Price } from '@prisma/client'
import { Button } from '../ui/button'
import Spinner from '../spinner'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { getStripe } from '@/lib/stripe-client'

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100)

  return priceString
}

function WrapperContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-2 mt-4 px-3">
      <p className="text-center text-neutral-400 text-sm mb-4 mt-1">
        Listen to all the music you want, anytime. No ads. Unlimited skips.
      </p>
      {children}
    </div>
  )
}

function ContentModal({
  products,
  loading,
}: {
  products: ProductWithPrices[]
  loading: boolean
}) {
  const [loadingSession, setLoadingSession] = useState(false)
  const { user, userInfo, subscribed } = useAuth()
  const { toast } = useToast()

  console.log('user: ', subscribed)

  const handleCheckout = async (price: Price) => {
    setLoadingSession(true)
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to subscribe',
        variant: 'destructive',
      })
      return
    }
    if (userInfo?.subscriptions.length) {
      toast({
        title: 'Oops!',
        description: 'You are already subscribed',
      })
      return
    }
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ price }),
      })
      const { sessionId } = await res.json()
      const stripe = await getStripe()
      if (!sessionId) {
        toast({
          title: 'Error',
          description: 'There was an error subscribing on session creation',
          variant: 'destructive',
        })
        return
      }
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error subscribing',
        variant: 'destructive',
      })
      console.log('error: ', error)
    } finally {
      setLoadingSession(false)
    }
  }

  if (!products.length) {
    return (
      <WrapperContent>
        <div className="text-center flex justify-center items-center">
          {loading ? <Spinner /> : <p>No products available.</p>}
        </div>
      </WrapperContent>
    )
  }

  if (userInfo?.subscriptions.length) {
    return (
      <WrapperContent>
        <div className="text-center">
          <p>You are already subscribed.</p>
        </div>
      </WrapperContent>
    )
  }

  return (
    <WrapperContent>
      {!loading &&
        products.map((product) => {
          if (!product.prices.length)
            return (
              <div key={product.id}>
                <p>No prices available for product {product.name}</p>
              </div>
            )
          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={loadingSession}
            >
              Subscribe for {formatPrice(price)} a month
              {loadingSession && <Spinner className="ml-2" size="sm" />}
            </Button>
          ))
        })}
      {loading && <Spinner />}
    </WrapperContent>
  )
}

export default function SubscribeModal() {
  const { modals, onOpenChangeSubscribe } = useModals()
  const { products, loading } = useGetProducts()

  return (
    <ModalDialog
      title="Subscribe to premium to continue"
      content={<ContentModal products={products || []} loading={loading} />}
      open={modals.subscribe}
      onOpenChange={onOpenChangeSubscribe}
    />
  )
}
