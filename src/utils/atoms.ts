import { atom } from 'jotai'

const initialModals = {
  signIn: false,
  signUp: false,
  subscribe: false,
}
export type ModalsProps = typeof initialModals
export const modalsAtom = atom(initialModals)
