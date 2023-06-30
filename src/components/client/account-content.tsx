'use client'

import useAuth from '@/hooks/use-auth'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import Spinner from '../spinner'
import useModals from '@/hooks/use-modals'

export default function AccountContent() {
  const { userInfo, subscribed } = useAuth()
  const [loadingLink, setLoadingLink] = useState(false)
  const { onOpenChangeSubscribe } = useModals()
  const { toast } = useToast()

  const goToCustomerPortal = async () => {
    try {
      setLoadingLink(true)
      const res = await fetch('/api/stripe/create-portal-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      })
      const { url } = await res.json()
      if (url) {
        window.location.assign(url)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error opening the customer portal',
        variant: 'destructive',
      })
      console.log('error: ', error)
    } finally {
      setLoadingLink(false)
    }
  }

  const handleClickSubscribe = () => {
    onOpenChangeSubscribe(true)
  }

  return (
    <div className="mb-7">
      {!subscribed && (
        <div className="flex flex-col gap-y-4 items-baseline">
          <p>No active plan.</p>
          <Button onClick={handleClickSubscribe}>Subscribe</Button>
        </div>
      )}
      {subscribed && (
        <div className="flex flex-col gap-y-4 items-baseline">
          <p>
            You are currently on the
            <b> {userInfo?.subscriptions[0].price.product.name} </b>
            plan.
          </p>
          <Button onClick={goToCustomerPortal}>
            Open customer portal
            {loadingLink && <Spinner />}
          </Button>
        </div>
      )}
    </div>
  )
}
