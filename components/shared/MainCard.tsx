"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from  "next/navigation" 

import {sidebarLinks} from "@/constants"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Input } from "../ui/input"
import { getItems } from "@/lib/actions/items.actions"
import { DataTable } from "./DataTable"
import {Item, columns} from "../../constants/inventory_columns"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { ItemForm } from "./ItemForm"
import { Label } from "../ui/label"

import { getDocs, getFirestore } from "firebase/firestore"
import { collection } from "firebase/firestore"
import firebaseConfig from "@/firebase"
import { initializeApp } from "firebase/app"
import { UploadForm } from "./UploadForm"
import Papa from "papaparse"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { RequestItemForm } from "./RequestItemForm"
import { MenuItem } from "@chakra-ui/react"
import ItemInfo from "./ItemInfo"
  

export default function MainCard() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const getInventory = async() => {
            const items: Item[] = [];
            console.log("Getting items");
            const querySnapshot = await getDocs(collection(db, "items"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
    
                items.push(doc.data() as Item);
            });
            setItems(items);
        }
        getInventory();
        
    }, [])
    
    const router = useRouter();
    const pathname = usePathname();
    return (
        <>
        <div className="ml-[-9px] rounded-l-xl flex flex-col items-start w-full h-screen bg-slate-100">
            <div className="flex justify-between w-full px-5 py-4 border-b border-zinc-300">
                <h1 className="text-blue-650 font-medium text-3xl ml-3 mt-1">INVENTORY</h1>
                {/* <Input
                    type="search"
                    placeholder="Search..."
                    className="md:w-[100px] lg:w-[300px] bg-slate-300 border-slate-400 rounded-2xl"
                /> */}
            </div>
            {/* <div className="flex gap-2 h-screen w-full"> */}
            <div className="px-10 h-screen w-full">
                

                <div className="my-7">
                    <DataTable columns={columns} data={items} />
                </div>

            </div>
        </div>
        
        </>
    )
    
}