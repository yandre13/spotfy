import { atom } from 'jotai'

const initialModals = {
  signIn: false,
  signUp: false,
  subscribe: false,
  upload: false,
}
export type ModalsProps = typeof initialModals
export const modalsAtom = atom(initialModals)

export type PlayerProps = {
  ids: string[]
  activeId: string | null
  volume: number
  isPlaying: boolean
}
const initialPlayer = {
  ids: [],
  activeId: null,
  volume: 50,
  isPlaying: false,
} as PlayerProps
export const playerAtom = atom(initialPlayer)
