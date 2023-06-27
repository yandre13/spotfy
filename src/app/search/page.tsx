import Header from '@/components/client/header'
import SearchContent from '@/components/client/search-content'
import SearchInput from '@/components/client/search-input'
import Box from '@/components/ui/box'
import { getSongsByTitle } from '@/db/functions/songs'
import { getAuthSession } from '@/lib/auth'

export const revalidate = 0

interface SearchProps {
  searchParams: { q: string }
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const { q = '' } = searchParams
  const session = await getAuthSession()
  const songs = await getSongsByTitle(q, {
    userId: session?.user?.id,
  })

  return (
    <section className="p-2 h-full pl-0">
      <Box className="h-full overflow-hidden">
        <Header title="Search" className="from-neutral-800" />
        <div className="px-6">
          <SearchInput />
          <SearchContent songs={songs} query={q} />
        </div>
      </Box>
    </section>
  )
}
