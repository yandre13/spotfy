import { playerAtom } from '@/utils/atoms'
import { useAtom } from 'jotai'

export default function usePlayer() {
  const [state, setState] = useAtom(playerAtom)

  const setIds = (ids: string[]) => {
    setState((prev) => ({
      ...prev,
      ids,
    }))
  }
  const setActiveId = (activeId: string) => {
    setState((prev) => ({
      ...prev,
      activeId,
    }))
  }
  const reset = () => {
    setState((prev) => ({
      ...prev,
      ids: [],
      activeId: null,
    }))
  }
  const setVolume = (volume: number) => {
    setState((prev) => ({
      ...prev,
      volume,
    }))
  }
  const setIsPlaying = (isPlaying: boolean) => {
    setState((prev) => ({
      ...prev,
      isPlaying,
    }))
  }
  return {
    ids: state.ids,
    activeId: state.activeId,
    setIds,
    setActiveId,
    reset,
    volume: state.volume,
    setVolume,
    isPlaying: state.isPlaying,
    setIsPlaying,
  }
}
