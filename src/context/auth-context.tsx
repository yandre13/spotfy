'use client'

import type { Session } from 'next-auth'
import type { UserInfo } from '@/db/functions/users'
import { createContext, useRef } from 'react'

type User = Session['user'] | null
type AuthContextType = {
  user: User
  userInfo: UserInfo
  subscribed: boolean
  reachedUploadLimit: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userInfo: null,
  subscribed: false,
  reachedUploadLimit: false,
})

export default function AuthProvider({
  auth: { user, userInfo },
  children,
}: {
  auth: {
    user: User
    userInfo: UserInfo
  }
  children: React.ReactNode
}) {
  const authRef = useRef<AuthContextType>({
    user,
    userInfo,
    subscribed: !!userInfo?.subscriptions.length, // TODO: validate if has a canceled subscription
    reachedUploadLimit: (userInfo?.songs ?? []).length >= 3,
  })

  return (
    <AuthContext.Provider value={authRef.current}>
      {children}
    </AuthContext.Provider>
  )
}
