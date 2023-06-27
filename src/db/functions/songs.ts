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

export type SongWithLiked = Song & { liked: boolean }
export async function getSongsByTitle(
  title: string,
  {
    userId,
  }: {
    userId?: string | null
  } = {}
) {
  const songs = (await db.$queryRaw(
    Prisma.sql`SELECT * FROM public."Song" WHERE SIMILARITY(title, ${title}) > 0.15`
  )) as Song[]

  //
  if (userId) {
    const likedSongs = await db.likedSong.findMany({
      where: {
        user_id: userId,
      },
    })
    const likedSongIds = likedSongs.map((song) => song.song_id)
    const songsWithLiked = songs.map((song) => {
      return {
        ...song,
        liked: likedSongIds.includes(song.id),
      }
    }) as SongWithLiked[]
    return songsWithLiked
  }
  // add liked property
  songs.forEach((song) => {
    ;(song as SongWithLiked).liked = false
  })
  return songs as SongWithLiked[]
}

export async function addLikedSong(songId: string, userId: string) {
  const likedSong = await db.likedSong.create({
    data: {
      song_id: songId,
      user_id: userId,
    },
  })
  return likedSong
}
export async function removeLikedSong(songId: string, userId: string) {
  const likedSong = await db.likedSong.delete({
    where: {
      user_id_song_id: {
        user_id: userId,
        song_id: songId,
      },
    },
  })
  return likedSong
}

export async function getLikedSongs(userId: string | undefined) {
  if (!userId) {
    return []
  }
  const likedSongs = await db.likedSong.findMany({
    where: {
      user_id: userId,
    },
    include: {
      song: true,
    },
  })
  const songs = likedSongs.map((likedSong) => {
    // add liked property
    ;(likedSong.song as SongWithLiked).liked = true
    return likedSong.song
  }) as SongWithLiked[]
  return songs || []
}
