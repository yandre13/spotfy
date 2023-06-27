'use client'
import useAuth from '@/hooks/use-auth'
import useModals from '@/hooks/use-modals'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/cn'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LikeButton({
  songId,
  isLiked,
}: {
  songId: string
  isLiked: boolean
}) {
  const router = useRouter()
  const { onOpenChangeSignIn } = useModals()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleClick = async () => {
    if (!user) {
      onOpenChangeSignIn(true)
      return
    }

    if (isLiked) {
      const res = await fetch(`/api/songs/like?songId=${songId}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data) {
        toast({
          title: 'Success',
          description: 'Song removed from your library',
          duration: 5000,
        })
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          duration: 5000,
          variant: 'destructive',
        })
      }
    } else {
      const res = await fetch(`/api/songs/like?songId=${songId}`, {
        method: 'POST',
      })
      const data = await res.json()
      if (data) {
        toast({
          title: 'Success',
          description: 'Song added to your library',
          duration: 5000,
        })
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          duration: 5000,
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <button className="hover:opacity-75 transition" onClick={handleClick}>
      <Heart
        className={cn(
          'transition-all duration-300 ease-in-out cursor-pointer w-5 h-5',
          isLiked && 'text-green-500 border-green-500 fill-green-500'
        )}
      />
    </button>
  )
}
