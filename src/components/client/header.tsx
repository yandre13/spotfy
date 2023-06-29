'use client'

import { cn } from '@/lib/cn'
import { ChevronRight, Home, Search } from 'lucide-react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { signIn, signOut } from 'next-auth/react'
import ModalDialog from '../modal'
import GoogleIcon from '../svg/google'
import useModals from '@/hooks/use-modals'
import useAuth from '@/hooks/use-auth'
import Spinner from '../spinner'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import SubscribeButton from './subscribe-button'

type Props = {
  title?: string
  className?: string
  children?: React.ReactNode
}

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

export default function Header({ className, title, children }: Props) {
  const router = useRouter()
  const { modals, onOpenChangeSignIn, onOpenChangeSignUp } = useModals()
  const { user } = useAuth()

  const handleSignOut = async () => {
    signOut()
    router.refresh()
  }

  return (
    <header
      className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition p-1"
            onClick={() => router.back()}
          >
            <ChevronLeft className="pr-0.5" />
          </button>
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition p-1"
            onClick={() => router.forward()}
          >
            <ChevronRight className="pl-0.5" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75">
            <Home className="text-black h-5 w-5" />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75">
            <Search className="text-black h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user && (
            <>
              <Button onClick={handleSignOut}>Sign out</Button>
              {/* <Button className="w-auto p-2">
                <User />
              </Button> */}
              <SubscribeButton />
            </>
          )}
          {!user && (
            <>
              <ModalDialog
                label="Sign up"
                title="Welcome!"
                content={<SignInContent signUp />}
                variant="ghost"
                open={modals.signUp}
                onOpenChange={onOpenChangeSignUp}
              />

              <ModalDialog
                label="Sign in"
                title="Welcome back!"
                content={<SignInContent />}
                variant="default"
                open={modals.signIn}
                onOpenChange={onOpenChangeSignIn}
              />
            </>
          )}
        </div>
      </div>
      {typeof title === 'string' && (
        <h1 className="text-3xl font-semibold pt-2">{title}</h1>
      )}
      {children}
    </header>
  )
}
