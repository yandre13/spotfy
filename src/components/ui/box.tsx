'use client'
import usePlayer from '@/hooks/use-player'
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
  const { activeId } = usePlayer()

  useLayoutEffect(() => {
    if (!asPageContainer) return
    const element = ref.current
    function handleResize() {
      if (element && element.classList.contains('PageContainer')) {
        // if activeId is true rest 80px to clientHeight
        const clientHeight = activeId
          ? element.clientHeight - 80
          : element.clientHeight
        const hasScrollBar = element.scrollHeight > clientHeight
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
  }, [asPageContainer, activeId])

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
