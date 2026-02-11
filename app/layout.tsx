import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Dancing_Script } from 'next/font/google'
import { getBasePath } from '@/lib/basepath'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
})

export const metadata: Metadata = {
  title: 'Our Love Story',
  description: 'A digital Valentine\'s Day scrapbook of our most cherished memories together.',
}

export const viewport: Viewport = {
  themeColor: '#e8ddd3',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${playfair.variable} ${dancing.variable} font-sans antialiased`}>
        <audio
          id="background-music"
          loop
          preload="auto"
          style={{ display: 'none' }}
          crossOrigin="anonymous"
        >
          <source src={getBasePath("/music/love-song.mp3")} type="audio/mpeg" />
        </audio>
        {children}
      </body>
    </html>
  )
}
