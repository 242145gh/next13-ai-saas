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
  title: 'Wisdom Source ai - Chat with famous people and ai characters',
  description: 'Chat with famous people and ai characters, Actors, Carton Charachters, Predsidents, Heros, ai characters harness wisdom sources powerful ai engine',
  keywords: 'Actor ai, Carton ai, idol ai, Wisdom Source ai, character ai, Predsidents chat, actor chat, president ai, hero ai, chatbot cartoon, chatbot famous, chat with idols',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html className="dark" lang="en" suppressHydrationWarning>
        
        <body className="main-font">
     
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
