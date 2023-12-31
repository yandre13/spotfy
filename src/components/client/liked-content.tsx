'use client'

import type { SongWithLiked } from '@/db/functions/songs'
import MediaItem from './media-item'
import LikeButton from './like-button'
import useOnPlay from '@/hooks/use-on-play'

export default function LikedContent({ songs }: { songs: SongWithLiked[] }) {
  const { onPlay } = useOnPlay(songs)

  const handleClick = (id: string) => {
    onPlay(id)
  }

  if (songs.length === 0) {
    return (
      <div className="flex flex-col text-neutral-400 mt-4">No songs found</div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <MediaItem {...song} onClick={handleClick}>
            <LikeButton songId={song.id} isLiked={song.liked} />
          </MediaItem>
        </div>
      ))}
    </div>
  )
}
