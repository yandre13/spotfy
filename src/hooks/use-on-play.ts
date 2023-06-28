import { Song } from '@prisma/client'
import useAuth from './use-auth'
import useModals from './use-modals'
import usePlayer from './use-player'

export default function useOnPlay(songs: Song[]) {
  const player = usePlayer()
  const { onOpenChangeSignIn } = useModals()
  const { user } = useAuth()

  const onPlay = (songId: string) => {
    if (!user) {
      onOpenChangeSignIn(true)
      return
    }
    player.setActiveId(songId)
    player.setIds(songs.map((song) => song.id))
  }

  return {
    onPlay,
  }
}
