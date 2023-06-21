import { NextRequest, NextResponse } from 'next/server'
import { addSong } from '@/db/functions/songs'
import { object, string, TypeOf } from 'zod'

// add a new song
const newSongSchema = object({
  title: string(),
  author: string(),
  image_url: string(),
  song_url: string(),
  user_id: string(),
})
type SongRequest = TypeOf<typeof newSongSchema>

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SongRequest
    const newSong = await addSong(body)

    console.log({ newSong })
    return NextResponse.json({
      status: 201,
      message: 'new song added successfully',
      data: newSong,
    })
  } catch (error) {
    console.log({ error })
    return NextResponse.error()
  }
}
