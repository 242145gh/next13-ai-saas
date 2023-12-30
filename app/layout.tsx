import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { ToasterProvider } from '@/components/toaster-provider'
import { ModalProvider } from '@/components/modal-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wisdom Source ai - Chat with your Idols',
  description: 'Chat with your Idols, Actors, Carton Charachters, Predsidents, Heros and more use the power of wisdom source ai',
  keywords: 'Actor ai, Carton ai, idol ai, Wisdom Source ai, character ai, Predsidents chat, actor chat, president ai, hero ai, '
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html className="dark" lang="en" suppressHydrationWarning>
        
        <body className={font.className}>
          <Analytics />
          <SpeedInsights/>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
