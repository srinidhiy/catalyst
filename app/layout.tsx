import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import './globals.css'
import React from 'react'
import Home from './page'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Catalyst',
  description: 'Catalyst Web App',
}

function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
      <h1>Catalyst</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
}


export default function RootLayout({children}: {children: React.ReactNode}){
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <Header />
        <div id="root">{children}</div>
        <Home />
      </body>
    </html>
    </ClerkProvider>
  )
}
