import Sidebar from '@/components/client/sidebar'
import '../styles/globals.css'
import { Figtree } from 'next/font/google'
import { cn } from '@/lib/cn'
import Providers from '@/utils/providers'
import { Toaster } from '@/components/ui/toaster'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotfy',
  description: 'Listen to music for free.',
}

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
          <main>
            {children}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  )
}
