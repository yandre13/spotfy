'use client'

import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import useDebounce from '@/hooks/use-debounce'
import { useRouter } from 'next/navigation'

export default function SearchInput() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 400)
  const router = useRouter()

  useEffect(() => {
    router.push(`/search?q=${debouncedValue}`)
  }, [debouncedValue, router])

  return (
    <div className="">
      <Input
        type="text"
        id="author"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What do you want to listen to?"
        className="bg-neutral-800 text-neutral-100 border-neutral-600 focus:border-neutral-500 focus:ring-neutral-500
        !placeholder-neutral-400
        "
      />
    </div>
  )
}
