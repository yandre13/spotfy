import { db } from '@/lib/db'

export async function getUserInfo(id?: string) {
  if (!id) return null
  const user = await db.user.findUnique({
    where: { id },
    include: {
      subscriptions: {
        include: {
          price: {
            include: {
              product: true,
            },
          },
        },
      },
      songs: true,
    },
  })
  return user || null
}

export type UserInfo = Awaited<ReturnType<typeof getUserInfo>>
