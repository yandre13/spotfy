import Header from '@/components/client/header'
import ListItem from '@/components/client/list-item'
import SongItem from '@/components/client/song-item'
import Box from '@/components/ui/box'
import { getSongs } from '@/db/functions/songs'

export const revalidate = 0

export default async function Home() {
  const songs = await getSongs()

  return (
    <section>
      <Box className="h-full overflow-hidden" asPageContainer>
        <Header title="Welcome back" />
        <div className="px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              title="Liked Songs"
              href="/liked"
              image="/images/liked.png"
            />
          </div>
          <div className="my-8">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Newest songs!</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
              {songs.map((song) => (
                <SongItem key={song.id} song={song} songs={songs} />
              ))}
            </div>
          </div>
        </div>
      </Box>
    </section>
  )
}
