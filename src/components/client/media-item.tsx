import Image from 'next/image'

export default function MediaItem({
  title,
  author,
  children,
}: {
  title: string
  author: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src="/images/liked.png"
          alt="Media item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className="truncate">{title}</p>
        <p className="text-sm text-neutral-400 truncate">{author}</p>
      </div>
      {children && <div className="ml-auto">{children}</div>}
    </div>
  )
}
