'use client'

import useOnPlay from '@/hooks/use-on-play'
import { Song } from '@prisma/client'
import { Play } from 'lucide-react'
import Image from 'next/image'

export default function SongItem({
  song,
  songs,
}: {
  song: Song
  songs: Song[]
}) {
  // songs is an array of songs
  const { onPlay } = useOnPlay(songs)

  const handleClick = () => {
    onPlay(song.id)
  }

  return (
    <div
      className="relative group flex flex-col items-center justify-center rounded-md
    overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${song.image_url}`}
          fill
          alt="Song image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By: {song.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-4">
        <PlayButton onClick={handleClick} />
      </div>
    </div>
  )
}

function PlayButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="transition opacity-0 rounded-full flex items-center bg-green-500
    p-4 drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
      onClick={onClick}
    >
      <Play className="text-black fill-black pl-0.5 h-5 w-5" />
    </button>
  )
}
