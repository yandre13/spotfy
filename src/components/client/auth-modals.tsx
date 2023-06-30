'use client'

import useModals from '@/hooks/use-modals'
import ModalDialog from '../modal'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import Spinner from '../spinner'
import GoogleIcon from '../svg/google'

function SignInContent({ signUp }: { signUp?: boolean }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
      console.log('auth error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const label = signUp ? 'Sign up with Google' : 'Sign in with Google'
  return (
    <div className="mt-4 flex justify-center flex-col items-center">
      <p className="text-base text-neutral-400 mb-4">
        {signUp ? 'Sign up with your account:' : 'Sign in to your account:'}
      </p>
      <Button className="gap-x-3 mb-2" onClick={loginWithGoogle}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <GoogleIcon />
            {label}
          </>
        )}
      </Button>
    </div>
  )
}

export function SignInModal() {
  const { modals, onOpenChangeSignIn } = useModals()

  return (
    <ModalDialog
      title="Welcome back!"
      content={<SignInContent />}
      open={modals.signIn}
      onOpenChange={onOpenChangeSignIn}
    />
  )
}

export function SignUpModal() {
  const { modals, onOpenChangeSignUp } = useModals()

  return (
    <ModalDialog
      title="Welcome to Spotfy!"
      content={<SignInContent signUp />}
      open={modals.signUp}
      onOpenChange={onOpenChangeSignUp}
    />
  )
}
