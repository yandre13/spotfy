import '../styles/globals.css'
import Sidebar from '@/components/sidebar'
import { Figtree } from 'next/font/google'
import { cn } from '@/lib/cn'
import Providers from '@/context/providers'
import { Toaster } from '@/components/ui/toaster'
import Player from '@/components/client/player'
import AuthProvider from '@/context/auth-context'
import { getAuthSession } from '@/lib/auth'
import { getUserInfo } from '@/db/functions/users'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotfy',
  description: 'Listen to music for free.',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()
  const user = session?.user ?? null
  const userInfo = await getUserInfo(user?.id)

  return (
    <html lang="en">
      <body className={cn(font.className, 'md:grid md:grid-cols-[300px_1fr]')}>
        <AuthProvider auth={{ user, userInfo }}>
          <Providers>
            <Sidebar />
            <main className="p-2 h-full pl-0 [&>section]:h-full" id="Main">
              {children}
              <Toaster />
            </main>
            <Player />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
