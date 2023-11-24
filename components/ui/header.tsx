'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Logo from './logo'
import Dropdown from '@/components/utils/dropdown'
import MobileMenu from './mobile-menu'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'


export default function Header() {

  const [top, setTop] = useState<boolean>(true)

  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }  

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow itmes-center justify-end">
            {/* Desktop sign in links */}
          
              <SignedIn>
            {/* Mount the UserButton component */}
              <UserButton />
              </SignedIn>
              <SignedOut>
            {/* Signed out users get sign in button */}
              <SignInButton />
              </SignedOut>

          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
