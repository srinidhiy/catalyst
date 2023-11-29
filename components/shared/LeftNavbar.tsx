"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from  "next/navigation" 

import {sidebarLinks} from "@/constants"
import { SignedIn, UserButton } from "@clerk/nextjs"

export default function LeftNavbar() {
    const router = useRouter();
    const pathname = usePathname();

    const textStyles = "text-white text-lora ml-5";
    const activeTextStyles = "text-blue-650 text-lora ml-5";
    const background = "py-4 px-14"
    const activeBackground = "py-4 px-14 bg-blue-200"

    return (
        <>
        <div className="flex flex-col items-start w-1/6 h-screen bg-blue-650">
            <div className=" py-4 px-4 mr-2 mt-1">
                <Link href="/home">
                    <Image src="/assets/logo_extended.png" alt="logo" width={200} height={200} /> 
                </Link>
            </div>
            <div className="flex flex-col justify-between flex-1">
            <div className="flex w-full flex-1 flex-col mt-5">
                {
                    sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname == link.route;
                    console.log("isActive", isActive, pathname, link.route)

                    return (
                        <div className={isActive ? activeBackground : background}>
                            <Link 
                                href={link.route}
                                key={link.label}
                                className="flex items-center"
                            >
                                <Image
                                    src={isActive ? link.selectedImgURL : link.imgURL}
                                    alt={link.label}
                                    className="ml-[-25px]"
                                    width={24}
                                    height={24}
                                />
                                <h1 className={isActive ? activeTextStyles : textStyles}>{link.label}</h1>
                            </Link>
                        </div>
                    )})
                }
            </div>

            <div className="mb-5 flex items-center px-6">
                <SignedIn>
                    <UserButton />
                    <h1 className=" text-white text-lora ml-5">Profile</h1>
                </SignedIn>
            </div>

            </div>
        </div>
        
        </>
    )
    
}