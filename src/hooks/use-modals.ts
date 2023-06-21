import { type ModalsProps, modalsAtom } from '@/utils/atoms'
import { useAtom } from 'jotai'
import useAuth from './use-auth'

export const useModals = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const { user } = useAuth()
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

  const onOpenChangeUpload = (open: boolean) => {
    console.log('user', user)
    if (!user) {
      onOpenChange('signIn', open)
    } else {
      onOpenChange('upload', open)
    }
  }

  return {
    modals,
    onOpenChangeSignIn,
    onOpenChangeSignUp,
    onOpenChangeUpload,
  }
}
