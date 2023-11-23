"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from  "next/navigation" 

import {sidebarLinks} from "@/constants"
import { SignedIn, UserButton } from "@clerk/nextjs"

export default function LeftNavbar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
        <div className="flex flex-col items-start w-20 h-screen bg-blue-650">
            <div className=" py-4 px-4 mr-1">
                <Image src="/assets/logo.png" alt="logo" width={100} height={100} /> 
            </div>
            <div className="flex flex-col justify-between flex-1">
            <div className="flex w-full flex-1 flex-col mt-5 gap-6 px-6">
                {
                    sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname == link.route;
                    console.log("isActive", isActive, pathname, link.route)

                    return (
                        <div>
                            <Link 
                                href={link.route}
                                key={link.label}
                            >
                                <Image
                                    src={isActive ? link.selectedImgURL : link.imgURL}
                                    alt={link.label}
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </div>
                    )})
                }
            </div>

            <div className="mb-5 px-5">
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

            </div>
        </div>
        
        </>
    )
    
}