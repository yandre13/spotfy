'use client'

import useOnPlay from '@/hooks/use-on-play'
import MediaItem from './media-item'
import type { Song } from '@prisma/client'

export default function LibraryContent({ songs }: { songs: Song[] }) {
  const { onPlay } = useOnPlay(songs)

  const handleClick = (id: string) => {
    onPlay(id)
  }

  return (
    <>
      {songs.map((song, index) => (
        <MediaItem key={index} {...song} onClick={handleClick} />
      ))}
    </>
  )
}
