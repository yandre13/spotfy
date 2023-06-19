import { type ModalsProps, modalsAtom } from '@/utils/atoms'
import { useAtom } from 'jotai'

export const useModals = () => {
  const [modals, setModals] = useAtom(modalsAtom)

  const onOpenChange = (modalName: keyof ModalsProps, open: boolean) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: open,
    }))
  }

  const onOpenChangeSignIn = (open: boolean) => {
    onOpenChange('signIn', open)
  }
  const onOpenChangeSignUp = (open: boolean) => {
    onOpenChange('signUp', open)
  }

  return {
    modals,
    onOpenChangeSignIn,
    onOpenChangeSignUp,
  }
}
