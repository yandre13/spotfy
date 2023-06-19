'use client'

import { cn } from '@/lib/cn'
import { ChevronRight, Home, Search } from 'lucide-react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'

type Props = {
  title: string
  className?: string
}
export default function Header({ className, title }: Props) {
  const router = useRouter()

  const loginWithGoogle = async () => {
    // setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      // toast({
      //   title: 'Error',
      //   description: 'There was an error logging in with Google',
      //   variant: 'destructive',
      // })
      console.log('auth error: ', error)
    }
    // finally {
    //   setIsLoading(false)
    // }
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
          <>
            <Button variant="ghost">Sign up</Button>
            <Button onClick={loginWithGoogle}>Sign in</Button>
          </>
        </div>
      </div>
      <h1 className="text-3xl font-semibold pt-2">{title}</h1>
    </header>
  )
}
