import { NextRequest, NextResponse } from 'next/server'
import { addLikedSong, removeLikedSong } from '@/db/functions/songs'
import { getAuthSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const songId = req.nextUrl.searchParams.get('songId')
    const session = await getAuthSession()
    if (!songId || !session?.user.id) {
      return NextResponse.error()
    }
    const likedSong = await addLikedSong(songId, session?.user.id)

    console.log({ likedSong })
    const response = {
      status: 201,
      message: 'new song added successfully',
      data: likedSong,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.log({ error })
    return NextResponse.error()
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const songId = req.nextUrl.searchParams.get('songId')
    const session = await getAuthSession()
    if (!songId || !session?.user.id) {
      return NextResponse.error()
    }
    const unlikedSong = await removeLikedSong(songId, session?.user.id)

    console.log({ unlikedSong })
    const response = {
      status: 201,
      message: 'new song added successfully',
      data: unlikedSong,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.log({ error })
    return NextResponse.error()
  }
}
