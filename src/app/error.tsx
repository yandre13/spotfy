'use client' // Error components must be Client Components

import Box from '@/components/ui/box'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <section>
      <Box className="h-full p-4">
        <h2 className="text-neutral-400">Something went wrong!</h2>
        <button
          className="text-neutral-400"
          onClick={
            // Attempt to recover by trying to re-render the segment
            // () => reset()
            () => window.location.reload()
          }
        >
          Try again
        </button>
      </Box>
    </section>
  )
}
