import { cn } from '@/lib/cn'

type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export default function Spinner({
  size = 'sm',
  className,
}: {
  size?: Size
  className?: string
}) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-[3px] border-current border-t-transparent text-green-800',
        {
          'm-3 h-6 w-6': size === 'sm',
          'm-6 h-10 w-10': size === 'md',
          'm-9 h-14 w-14': size === 'lg',
          'm-12 h-20 w-20': size === 'xl',
          'm-16 h-24 w-24': size === '2xl',
        },
        className
      )}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
