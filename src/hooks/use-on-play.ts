import { Song } from '@prisma/client'
import useAuth from './use-auth'
import useModals from './use-modals'
import usePlayer from './use-player'

export default function useOnPlay(songs: Song[]) {
  const player = usePlayer()
  const { onOpenChangeSignIn, onOpenChangeSubscribe } = useModals()
  const { user, subscribed } = useAuth()

  const onPlay = (songId: string) => {
    if (!user) {
      onOpenChangeSignIn(true)
      return
    }
    // if (!subscribed) {
    //   onOpenChangeSubscribe(true)
    //   return
    // } //for now music is free
    player.setActiveId(songId)
    player.setIds(songs.map((song) => song.id))
  }

  return {
    onPlay,
  }
}
