'use client'
import { Play } from 'lucide-react'
import Image from 'next/image'

type Props = {
  title: string
  href: string
  image: string
}
export default function ListItem({ title, href, image }: Props) {
  const onClick = () => {
    //TODO: Add auth check
    console.log('clicked')
  }

  return (
    <button
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/20 transition pr-4 hover:bg-neutral-100/20"
      onClick={onClick}
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <p className="font-medium truncate py-5">{title}</p>
      <div className="absolute transition opacity-0 translate-y-7 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110 group-hover:translate-y-0 hover:animate-spin">
        <Play className="h-5 w-5 text-black fill-black pl-0.5" />
      </div>
    </button>
  )
}
