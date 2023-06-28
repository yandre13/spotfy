'use client'

import useGetSong from '@/hooks/use-get-song'
import usePlayer from '@/hooks/use-player'
import PlayerContent from './player-content'
import Spinner from '../spinner'

export default function Player() {
  const { activeId } = usePlayer()
  const { loading, song } = useGetSong(activeId!)

  if (!song || !activeId) return null
  const songUrl = process.env.NEXT_PUBLIC_STORAGE_URL + song.song_url
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      {/* {loading && <Spinner />}
      {!loading && (
        <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
      )} */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}
