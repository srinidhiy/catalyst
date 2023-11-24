import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import React from 'react'
import './css/style.css'

import Header from '@/components/ui/header'

const inter = Inter({ subsets: ['latin'] })
// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
//   display: 'swap'
// })

export const metadata: Metadata = {
  title: 'Catalyst',
  description: 'Next-Generation Lab Inventory Management',
}

export default function RootLayout({children}: {children: React.ReactNode}){
  return (
    <ClerkProvider>
    <html lang="en">
     <body className={inter.className}>
      {children}
      </body>
    </html>
    </ClerkProvider>
  )
}


// <body className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
// <div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
//   {/* <Header /> */}
//   {children}
// </div>
// </body>
