"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from  "next/navigation" 

import {sidebarLinks} from "@/constants"
import { SignedIn, UserButton } from "@clerk/nextjs"

interface Props {
    title: string;

}

export default function MainCard({title}: Props) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
        <div className="ml-[-9px] rounded-l-xl flex flex-col items-start w-full h-screen bg-gray-100">
            <h1 className="text-blue-650 ">{title.toUpperCase()}</h1>
        </div>
        
        </>
    )
    
}