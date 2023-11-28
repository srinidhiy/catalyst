"use client"

import { Input } from "../ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "../ui/button"
  import { RequestTable } from "@/components/shared/RequestTable"
  import {Item, columns} from "../../constants/requestcolumns"
  import { useEffect, useState } from "react"

import { getDocs, getFirestore } from "firebase/firestore"
import { collection } from "firebase/firestore"
import firebaseConfig from "@/firebase"
import { initializeApp } from "firebase/app"


export default function RequestsMain() {
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [requests, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const getInventory = async() => {
            const items: Item[] = [];
            console.log("Getting items");
            const querySnapshot = await getDocs(collection(db, "requests"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
    
                items.push(doc.data() as Item);
            });
            setItems(items);
        }
        getInventory();
        
    }, [])
    
    
    return (
        <>
        <div className="ml-[-9px] rounded-l-xl flex flex-col items-start w-full h-screen bg-slate-100">
            <div className="flex justify-between w-full px-5 py-4 border-b border-zinc-300">
                <h1 className="text-blue-650 font-medium text-3xl ml-3 mt-1">REQUESTS</h1>
                <Input

                    type="search"
                    placeholder="Search..."
                    className="md:w-[100px] lg:w-[300px] bg-slate-300 border-slate-400 rounded-2xl"
                />
            </div>

            <div className="max-h-screen overflow-y-auto mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" style={{ marginTop: '15px' }}>
                    <RequestTable columns={columns} data={requests} />
                </div>

        
            
        </div>
        
        </>
    )
    
}