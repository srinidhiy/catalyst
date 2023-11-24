import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '@/public/logo_blueonwhite.png'

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">
          <Image
              src = {LogoImage}
              alt = "main logo"
              height = "50"
              width = "50"
          />
        <rect width="50" height="50" rx="25" fill="url(#footer-logo)" fillRule="nonzero" />
    </Link>
  )
}
