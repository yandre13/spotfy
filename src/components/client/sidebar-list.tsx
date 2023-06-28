'use client'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { usePathname } from 'next/navigation'
import { Home, Search } from 'lucide-react'
import { useEffect } from 'react'
import usePlayer from '@/hooks/use-player'

type ItemProps = {
  icon: React.FC
  name: string
  path: string
}

const routes = [
  { name: 'Home', path: '/', icon: Home },
  {
    name: 'Search',
    path: '/search',
    icon: Search,
  },
]
export function SidebarItem({ name, path, icon: Icon }: ItemProps) {
  const pathname = usePathname()
  const active = pathname === path
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

export default function SidebarList() {
  const { activeId } = usePlayer()
  useEffect(() => {
    const sidebar = document.getElementById('Sidebar')
    const main = document.getElementById('Main')
    if (sidebar && main) {
      if (activeId) {
        // 100% - 80px
        main.style.height = `calc(100% - 80px)`
        sidebar.style.height = `calc(100% - 80px)`
      } else {
        main.style.height = `100%`
        sidebar.style.height = `100%`
      }
    }
  }, [activeId])

  return (
    <ul className="flex flex-col gap-y-4 px-5 py-4">
      {routes.map((route, index) => (
        <SidebarItem key={index} {...route}></SidebarItem>
      ))}
    </ul>
  )
}
