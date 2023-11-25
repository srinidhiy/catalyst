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
                <Input
                    type="search"
                    placeholder="Search..."
                    className="md:w-[100px] lg:w-[300px] bg-slate-300 border-slate-400 rounded-2xl"
                />
            </div>
            <div className="flex gap-2 h-screen w-full">
                <div className="flex flex-col py-5 px-5 bg-blue-100 rounded-xl mx-7 my-7">
                    <div className="flex flex-col py-2 px-10">
                        {/* <button className="bg-blue-650 hover:bg-blue-400 text-white px-6 py-4 rounded-2xl ">Add Item</button> */}
                        <Dialog>
                        <DialogTrigger asChild className="bg-black">
                            <Button className="bg-blue-650 hover:bg-blue-400 text-white px-6 py-4 rounded-2xl">Add Item</Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl sm:max-w-[425px] bg-white ">
                            <ItemForm />
                        </DialogContent>
                        </Dialog>
                        <Dialog>
                        <DialogTrigger asChild className="bg-black">
                            <button className="bg-blue-650 hover:bg-blue-400 text-white mt-3 px-6 py-2 rounded-2xl ">Request Item</button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl sm:max-w-[425px] bg-white ">
                            <RequestItemForm />
                        </DialogContent>
                        </Dialog>
                        <button className="bg-orange-400 hover:bg-orange-200 text-white mt-3 px-6 py-4 rounded-2xl ">Upload from CSV</button>
                    </div>
                    <div className="flex flex-col py-2">
                        <h1>Items at risk</h1>
                    </div>
                </div>

                <div className="my-7">
                    <DataTable columns={columns} data={items} />
                </div>
            </div>
        </div>
        
        </>
    )
    
}