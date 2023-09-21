import './globals.css'
import type { Metadata } from 'next'
import NavigationBar from './NavigationBar'
import Providers from './Providers'
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: 'PALITKO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='w-full h-full dark:bg-zinc-950 transition-all'>
        <Providers>
          <header>
            <NavigationBar />
          </header>
          <main>
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
