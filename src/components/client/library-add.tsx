'use client'

import { Plus } from 'lucide-react'
import useModals from '@/hooks/use-modals'
import useAuth from '@/hooks/use-auth'
import { Button } from '../ui/button'

export default function LibraryAdd() {
  const { onOpenChangeSignIn, onOpenChangeUpload, onOpenChangeSubscribe } =
    useModals()
  const { user, subscribed } = useAuth()

  const handleClick = () => {
    if (!user) {
      onOpenChangeSignIn(true)
      return
    }
    if (!subscribed) {
      //TODO: when user has 3 songs, show modal to subscribe
      onOpenChangeSubscribe(true)
      return
    }
    onOpenChangeUpload(true)
  }

  return (
    <Button variant="ghost" className="w-auto h-auto p-1" onClick={handleClick}>
      <Plus className="text-neutral-400 transition cursor-pointer hover:text-white" />
    </Button>
  )
}
