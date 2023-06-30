import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'

export default function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return {
    user: auth.user,
    userInfo: auth.userInfo,
    subscribed: auth.subscribed,
  }
}
