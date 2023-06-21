import Header from '@/components/client/header'
import ListItem from '@/components/client/list-item'
import UploadForm from '@/components/client/upload-test'
import Box from '@/components/ui/box'
import { getAuthSession } from '@/lib/auth'

export default async function Home() {
  const session = await getAuthSession()
  return (
    <section className="p-2 h-full pl-0">
      <Box className="h-full overflow-hidden">
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
            <div>List of songs!</div>
            {JSON.stringify(session, null, 2)}
            <UploadForm />
          </div>
        </div>
      </Box>
    </section>
  )
}
