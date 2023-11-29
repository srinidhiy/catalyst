"use client"
  import { Button } from "../ui/button"
  import { RequestTable } from "@/components/shared/RequestTable"
  import {Item, columns} from "@/constants/requestcolumns"
  import { archiveColumns } from "@/constants/archivedrequestcolumns"
  import { useEffect, useState } from "react"

import { getDocs, getFirestore, query, where } from "firebase/firestore"
import { collection } from "firebase/firestore"
import firebaseConfig from "@/firebase"
import { initializeApp } from "firebase/app"
import { ArchivedRequestTable } from "../shared/ArchivedRequestTable"
import { ScrollArea } from "@radix-ui/react-scroll-area"


export default function RequestsMain() {
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [requests, setItems] = useState<Item[]>([]);
    const [archivedRequests, setArchivedRequests] = useState<Item[]>([]);


    useEffect(() => {
        const getInventory = async() => {
            const items: Item[] = [];
            // console.log("Getting items");
            const requestQuery = query(collection(db, "requests"), where("status", "==", "Pending Approval"));
            const querySnapshot = await getDocs(requestQuery);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
    
                items.push(doc.data() as Item);
            });
            setItems(items);
        }
        getInventory();

        const getArchivedRequests = async() => {
            const requests: Item[] = [];
            const requestQuery = query(collection(db, "requests"), where("status", "!=", "Pending Approval"));
            const querySnapshot = await getDocs(requestQuery);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
    
                requests.push(doc.data() as Item);
            });
            setArchivedRequests(requests);
        }
        getArchivedRequests();
        
    }, [])
          
    
    return (
        <div className="ml-[-9px] rounded-l-xl flex flex-col items-start w-full h-screen bg-slate-100">
            <div className="flex justify-between w-full px-5 py-4 border-b border-zinc-300">
                <h1 className="text-blue-650 font-medium text-3xl ml-3 mt-1">REQUESTS</h1>
            </div>
            
            
            <div className="px-10 flex flex-col w-full py-5 gap-2">
                <RequestTable columns={columns} data={requests}/>
                <ArchivedRequestTable columns={archiveColumns} data={archivedRequests}/>
            </div>
            
        </div>




        
    )
    
}