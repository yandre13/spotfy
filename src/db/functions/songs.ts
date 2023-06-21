import { db } from '@/lib/db'
import { Song } from '@prisma/client'

export async function addSong(
  song: Pick<Song, 'title' | 'author' | 'image_url' | 'song_url' | 'user_id'>
) {
  const newSong = await db.song.create({
    data: song,
  })

  return newSong
}
