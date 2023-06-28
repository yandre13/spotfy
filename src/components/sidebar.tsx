import Box from './ui/box'
import Library from './library'
import SidebarList from './client/sidebar-list'
import { Suspense } from 'react'
import Spinner from './spinner'

export default function Sidebar() {
  return (
    <aside className="hidden md:flex h-full" id="Sidebar">
      <nav className="flex flex-col gap-y-2 w-full p-2">
        <Box>
          <SidebarList />
        </Box>
        <Box className="overflow-y-auto h-full">
          <Suspense fallback={<Spinner />}>
            <Library />
          </Suspense>
        </Box>
      </nav>
    </aside>
  )
}
