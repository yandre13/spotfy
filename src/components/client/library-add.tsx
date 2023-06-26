'use client'

import { Plus } from 'lucide-react'
import ModalDialog from '../modal'
import UploadModalForm from './upload-modal-form'
import useModals from '@/hooks/use-modals'

export default function LibraryAdd() {
  const { modals, onOpenChangeUpload } = useModals()
  const handleClick = () => {
    console.log('clicked')
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
      onOpenChange={onOpenChangeUpload}
    />
  )
}
