import { User, getUserCookie } from '@/utils/session'
import { useEffect, useState } from 'react'
import { removeUserCookie } from '@/utils/session'

export default function useAuth() {
  const [userState, setUserState] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const user = getUserCookie(() => {
      setLoading(false)
    })
    if (user) {
      setUserState(user)
    }
  }, [])

  return {
    user: userState,
    loading,
    clearUser: removeUserCookie,
  }
}
