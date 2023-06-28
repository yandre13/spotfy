import Header from '@/components/client/header'
import LikedContent from '@/components/client/liked-content'
import Box from '@/components/ui/box'
import { getLikedSongs } from '@/db/functions/songs'
import { getAuthSession } from '@/lib/auth'
import Image from 'next/image'

function Title() {
  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row items-center gap-x-5">
        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
          <Image
            src="/images/liked.png"
            alt="Playlist"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
          <p className="hidden md:block font-semibold text-sm md:text-base lg:text-lg">
            Playlist
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
            Liked Songs
          </h1>
        </div>
      </div>
    </div>
  )
}

//TODO: add middleware to check if user is logged in
export default async function LikedPage() {
  const session = await getAuthSession()
  const likedSongs = await getLikedSongs(session?.user?.id)
  return (
    <section>
      <Box className="h-full overflow-hidden">
        <Header>
          <Title />
        </Header>
        <div className="px-6">
          <LikedContent songs={likedSongs} />
        </div>
      </Box>
    </section>
  )
}
