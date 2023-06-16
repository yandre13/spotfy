import { cn } from '@/lib/cn'

export default function Box({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('bg-neutral-900 rounded-lg h-fit w-full', className)}>
      {children}
    </div>
  )
}
