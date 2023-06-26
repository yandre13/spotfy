import { db } from '@/lib/db'
import { type Song, Prisma } from '@prisma/client'

export async function getSongs() {
  const songs = await db.song.findMany()
  return songs
}

export async function getSongsByUser(userId: string | null) {
  if (!userId) {
    return []
  }
  const songs = await db.song.findMany({
    where: {
      user_id: userId,
    },
  })
  return songs || []
}

export async function addSong(
  song: Pick<Song, 'title' | 'author' | 'image_url' | 'song_url' | 'user_id'>
) {
  const newSong = await db.song.create({
    data: song,
  })

  return newSong
}

export async function getSongsByTitle(title: string) {
  const songs = (await db.$queryRaw(
    Prisma.sql`SELECT * FROM public."Song" WHERE SIMILARITY(title, ${title}) > 0.15`
  )) as Song[]
  return songs || []
}
