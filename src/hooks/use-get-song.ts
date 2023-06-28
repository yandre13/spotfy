import type { SongWithLiked } from '@/db/functions/songs'
import { useEffect, useMemo, useState } from 'react'

export default function useGetSong(id: string) {
  const [loading, setLoading] = useState(true)
  const [song, setSong] = useState<SongWithLiked | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    const fetchSong = async () => {
      const res = await fetch(`/api/songs/${id}`)
      const { data } = (await res.json()) as { data: SongWithLiked }
      console.log('data', data)
      setSong(data)
      setLoading(false)
    }

    fetchSong()
  }, [id])

  const props = useMemo(
    () => ({
      loading,
      song,
    }),
    [loading, song]
  )

  return props
}
