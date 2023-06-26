'use client'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { usePathname } from 'next/navigation'
import { Home, Search } from 'lucide-react'

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
  return (
    <ul className="flex flex-col gap-y-4 px-5 py-4">
      {routes.map((route, index) => (
        <SidebarItem key={index} {...route}></SidebarItem>
      ))}
    </ul>
  )
}
