import { ListMusic } from 'lucide-react'
import LibraryAdd from './client/library-add'
import { getAuthSession } from '@/lib/auth'
import { getSongsByUser } from '@/db/functions/songs'
import LibraryContent from './client/library-content'

export default async function Library() {
  const session = await getAuthSession()
  const userId = session?.user?.id || null
  const mySongs = await getSongsByUser(userId)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic className="text-neutral-400" size={26} />
          <p className="font-medium text-neutral-400">Your library</p>
        </div>
        <LibraryAdd />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 overflow-y-auto BoxScroll">
        <LibraryContent songs={mySongs} />
      </div>
    </div>
  )
}
