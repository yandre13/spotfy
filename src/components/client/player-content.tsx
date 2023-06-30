'use client'

import MediaItem from './media-item'
import LikeButton from './like-button'
import type { SongWithLiked } from '@/db/functions/songs'
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react'
import useSound from 'use-sound'
import { Slider } from '../ui/slider'
import { cn } from '@/lib/cn'
import usePlayer from '@/hooks/use-player'
import { useEffect } from 'react'

function VolumeControls() {
  const { volume, setVolume } = usePlayer()

  const handleChange = (e: [number]) => {
    setVolume(e[0])
  }

  const IconVolume =
    volume > 0 && volume < 50 ? Volume1 : volume >= 50 ? Volume2 : VolumeX

  return (
    <div className="flex items-center gap-x-2 w-[120px]">
      <button
        onClick={() => setVolume(volume === 0 ? 50 : 0)} //TODO: toggle mute with previous volume
      >
        <IconVolume className="text-neutral-400 fill-neutral-400" />
      </button>
      <Slider
        onValueChange={handleChange}
        value={[volume]}
        defaultValue={[volume]}
        max={100}
        step={1}
      />
    </div>
  )
}

function PlayerControls({ songUrl }: { songUrl: string }) {
  const { ids, activeId, setActiveId, isPlaying, setIsPlaying, volume } =
    usePlayer()

  const Icon = isPlaying ? Pause : Play

  const onPlayPrev = () => {
    if (ids.length === 0) return
    const currentIndex = ids.indexOf(activeId!)
    const prevIndex = currentIndex - 1
    const prevId = ids[prevIndex] || ids[ids.length - 1]
    setActiveId(prevId)
  }

  const onPlayNext = () => {
    if (ids.length === 0) return
    const currentIndex = ids.indexOf(activeId!)
    const nextIndex = currentIndex + 1
    const nextId = ids[nextIndex] || ids[0]
    setActiveId(nextId)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume / 100, // works with 0-1
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  })

  const handlePlay = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  useEffect(() => {
    sound?.play()

    return () => sound?.unload()
  }, [sound])

  return (
    <>
      <button onClick={onPlayPrev}>
        <SkipBack
          className="text-neutral-400 fill-neutral-400 
          hover:text-white hover:fill-white transition"
        />
      </button>
      <button
        className="
        flex items-center justify-center h-10 w-10 rounded-full bg-white p-1
        hover:scale-110 transition"
        onClick={handlePlay}
      >
        <Icon className={cn('text-black fill-black', !isPlaying && 'pl-1')} />
      </button>
      <button onClick={onPlayNext}>
        <SkipForward
          className="text-neutral-400 fill-neutral-400 
          hover:text-white hover:fill-white transition"
        />
      </button>
    </>
  )
}

export default function PlayerContent({
  song,
  songUrl,
}: {
  song: SongWithLiked
  songUrl: string
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full ">
      <div className="flex">
        <div className="flex items-center gap-x-4">
          <MediaItem {...song} readOnly>
            <LikeButton isLiked={song.liked} songId={song.id} />
          </MediaItem>
        </div>
      </div>
      <div className="h-full flex justify-end md:justify-center items-center w-full md:max-w-[722px] gap-x-4 md:gap-x-6">
        <PlayerControls songUrl={songUrl} />
      </div>
      <div className="hidden md:flex items-center justify-end w-full pr-2">
        <VolumeControls />
      </div>
    </div>
  )
}
