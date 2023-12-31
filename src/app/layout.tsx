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
import { SignInModal, SignUpModal } from '@/components/client/auth-modals'
import UploadModal from '@/components/client/upload-modal'
import SubscribeModal from '@/components/client/subscribe-modal'

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
            <main
              className="lg:p-2 h-full lg:pl-0 [&>section]:h-full max-h-screen"
              id="Main"
            >
              {children}
              <Toaster />
            </main>
            <Player />
            <SignInModal />
            <SignUpModal />
            <UploadModal />
            <SubscribeModal />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
