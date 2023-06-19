import { useSession } from 'next-auth/react'

export default function useAuth() {
  const session = useSession()
  const loading = session?.status === 'loading'
  const user = session?.data?.user ?? null

  return {
    user,
    loading,
  }
}
