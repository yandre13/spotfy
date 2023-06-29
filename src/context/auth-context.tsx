'use client'

import type { Session } from 'next-auth'
import type { UserInfo } from '@/db/functions/users'
import { createContext, useRef } from 'react'

type User = Session['user'] | null
type AuthContextType = {
  user: User
  userInfo: UserInfo
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userInfo: null,
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
  })

  return (
    <AuthContext.Provider value={authRef.current}>
      {children}
    </AuthContext.Provider>
  )
}
