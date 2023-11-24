"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from  "next/navigation" 
import { Input } from "../ui/input"
import { useEffect, useState } from "react"


export default function DashboardMain() {
    return (
        <>
        <div className="ml-[-9px] rounded-l-xl flex flex-col items-start w-full h-screen bg-slate-100">
            <div className="flex justify-between w-full px-5 py-4 border-b border-zinc-300">
                <h1 className="text-blue-650 font-medium text-3xl ml-3 mt-1">DASHBOARD</h1>
                <Input
                    type="search"
                    placeholder="Search..."
                    className="md:w-[100px] lg:w-[300px] bg-slate-300 border-slate-400 rounded-2xl"
                />
            </div>
            
        </div>
        
        </>
    )
    
}