'use client'

import { ListMusic, Plus } from 'lucide-react'

export default function Library() {
  const handleClick = () => {
    console.log('clicked')
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic className="text-neutral-400" size={26} />
          <p className="font-medium text-neutral-400">Your library</p>
        </div>
        <Plus className="text-neutral-400 transition cursor-pointer hover:text-white" />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of songs!</div>
    </div>
  )
}
