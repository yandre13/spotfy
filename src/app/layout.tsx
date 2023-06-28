import '../styles/globals.css'
import Sidebar from '@/components/sidebar'
import { Figtree } from 'next/font/google'
import { cn } from '@/lib/cn'
import Providers from '@/utils/providers'
import { Toaster } from '@/components/ui/toaster'
import Player from '@/components/client/player'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotfy',
  description: 'Listen to music for free.',
}

export const revalidate = 0

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, 'md:grid md:grid-cols-[300px_1fr]')}>
        <Providers>
          <Sidebar />
          <main className="p-2 h-full pl-0 [&>section]:h-full" id="Main">
            {children}
            <Toaster />
          </main>
          <Player />
        </Providers>
      </body>
    </html>
  )
}
