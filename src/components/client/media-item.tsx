'use client'

import { cn } from '@/lib/cn'
import type { Song } from '@prisma/client'
import { Play } from 'lucide-react'
import Image from 'next/image'

type MediaItemProps = Song &
  (
    | {
        onClick: (id: string) => void
        readOnly?: never
        children?: React.ReactNode
      }
    | {
        onClick?: (id: string) => void
        readOnly: boolean
        children?: React.ReactNode
      }
  )

export default function MediaItem({
  title,
  author,
  id: songId,
  onClick,
  readOnly,
  children,
}: MediaItemProps) {
  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md group"
      role="button"
      onClick={() => {
        if (!readOnly && onClick) {
          onClick(songId)
        }
      }}
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src="/images/liked.png"
          alt="Media item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className="truncate">{title}</p>
        <p className="text-sm text-neutral-400 truncate">{author}</p>
      </div>
      <div className="ml-auto flex items-center gap-x-4">
        {!readOnly && (
          <Play
            className={cn(
              'h-4 w-4 fill-white text-transparent hidden group-hover:block'
            )}
          />
        )}
        {children}
      </div>
    </div>
  )
}
