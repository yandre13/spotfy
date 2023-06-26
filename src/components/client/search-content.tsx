import type { Song } from '@prisma/client'
import MediaItem from './media-item'

export default function SearchContent({
  songs,
  query,
}: {
  songs: Song[]
  query: string
}) {
  if (songs.length === 0 && query.length > 0) {
    return (
      <div className="flex flex-col text-neutral-400 mt-5">No songs found</div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full mt-8">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem {...song} />
          </div>
          {/* TODO: Add song actions */}
        </div>
      ))}
    </div>
  )
}
