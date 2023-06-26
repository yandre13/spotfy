import Cookies from 'js-cookie'
import { SESSION_NAME } from './constants'
import type { Session } from 'next-auth'
import { decrypt } from './crypto'

export type User = Session['user'] | null
export const removeUserCookie = () => Cookies.remove(SESSION_NAME)

export const getUserCookie = (callback?: () => void) => {
  const userCookies = Cookies.get(SESSION_NAME) ?? ''
  const decryptedUser = userCookies ? decrypt(userCookies) : null
  const user: User = decryptedUser ? JSON.parse(decryptedUser) : null

  if (callback) {
    callback()
  }
  return user
}
