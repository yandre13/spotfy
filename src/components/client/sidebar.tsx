'use client'
import { Home, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import Box from '../ui/box'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import Library from './library'

type IconType = typeof Home
type ItemProps = {
  icon: IconType
  name: string
  path: string
  active: boolean
}
function SidebarItem({ name, path, icon: Icon, active }: ItemProps) {
  return (
    <li>
      <Link
        href={path}
        className={cn(
          'flex w-full items-center gap-x-4 font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1',
          active && 'text-white'
        )}
      >
        <Icon />
        <div>{name}</div>
      </Link>
    </li>
  )
}

export default function Sidebar() {
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      { name: 'Home', path: '/', active: pathname !== '/search', icon: Home },
      {
        name: 'Search',
        path: '/search',
        active: pathname === '/search',
        icon: Search,
      },
    ],
    [pathname]
  )

  return (
    <aside className="hidden md:flex h-full">
      <nav className="flex flex-col gap-y-2 w-full p-2">
        <Box>
          <ul className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route, index) => (
              <SidebarItem key={index} {...route}></SidebarItem>
            ))}
          </ul>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </nav>
    </aside>
  )
}
