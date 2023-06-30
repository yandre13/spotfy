import Spinner from '@/components/spinner'
import Box from '@/components/ui/box'

export default function Loading() {
  return (
    <section>
      <Box className="h-full p-4 flex items-center justify-center">
        <Spinner size="xl" />
      </Box>
    </section>
  )
}
