'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'

export default function SongItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative group flex flex-col items-center justify-center rounded-md
    overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={'/images/liked.png'}
          fill
          alt="Song image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">TS</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">By: TS</p>
      </div>
      <div className="absolute bottom-24 right-4">
        <PlayButton />
      </div>
    </div>
  )
}

function PlayButton() {
  return (
    <button
      className="transition opacity-0 rounded-full flex items-center bg-green-500
    p-4 drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
    >
      <Play className="text-black fill-black pl-0.5 h-5 w-5" />
    </button>
  )
}
