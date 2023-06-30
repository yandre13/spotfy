'use client'

import { cn } from '@/lib/cn'
import { ChevronRight, Home, Search, User } from 'lucide-react'
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
import usePlayer from '@/hooks/use-player'
import Link from 'next/link'

type Props = {
  title?: string
  className?: string
  children?: React.ReactNode
}

export default function Header({ className, title, children }: Props) {
  const router = useRouter()
  const { modals, onOpenChangeSignIn, onOpenChangeSignUp } = useModals()
  const { user } = useAuth()
  const player = usePlayer()
  const handleSignOut = async () => {
    player.reset()
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
          <Link
            href="/"
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75"
          >
            <Home className="text-black h-5 w-5" />
          </Link>
          <Link
            href="/search"
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75"
          >
            <Search className="text-black h-5 w-5" />
          </Link>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user && (
            <>
              <Button onClick={handleSignOut}>Sign out</Button>
              <Button className="w-auto p-2" asChild>
                <Link href="/account">
                  <User />
                </Link>
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button variant="ghost" onClick={() => onOpenChangeSignUp(true)}>
                Sign up
              </Button>
              <Button onClick={() => onOpenChangeSignIn(true)}>Sign in</Button>
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
