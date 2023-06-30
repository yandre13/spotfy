'use client'
import { cn } from '@/lib/cn'
import { useLayoutEffect, useRef } from 'react'

export default function Box({
  children,
  className,
  asPageContainer = false,
}: {
  children: React.ReactNode
  className?: string
  asPageContainer?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    function handleResize() {
      if (element && element.classList.contains('PageContainer')) {
        const hasScrollBar = element.scrollHeight > element.clientHeight
        if (hasScrollBar) {
          element.classList.remove('overflow-hidden')
          element.classList.add('overflow-y-auto')
        } else {
          element.classList.remove('overflow-y-auto')
          element.classList.add('overflow-hidden')
        }
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={cn(
        'bg-neutral-900 rounded-lg h-fit w-full',
        asPageContainer && 'PageContainer Box',
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  )
}
