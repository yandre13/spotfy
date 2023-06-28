'use client'

import { Plus } from 'lucide-react'
import ModalDialog from '../modal'
import UploadModalForm from './upload-modal-form'
import useModals from '@/hooks/use-modals'
import useAuth from '@/hooks/use-auth'

export default function LibraryAdd() {
  const { modals, onOpenChangeSignIn, onOpenChangeUpload } = useModals()
  const { user } = useAuth()

  const handleClick = (e: boolean) => {
    if (!user) {
      onOpenChangeSignIn(true)
      return
    }
    onOpenChangeUpload(e)
  }

  return (
    <ModalDialog
      label={
        <Plus className="text-neutral-400 transition cursor-pointer hover:text-white" />
      }
      labelClass="p-0 h-auto bg-transparent border-none"
      title="Add a new song"
      content={<UploadModalForm />}
      open={modals.upload}
      onOpenChange={handleClick}
    />
  )
}
