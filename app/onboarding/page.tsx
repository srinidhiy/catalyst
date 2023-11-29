"use client"

import firebaseConfig from "../../firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { currentUser, useAuth } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { collection, getDocs } from "firebase/firestore";
import { set } from "firebase/database";
import { Input } from "@/components/ui/input";
import { createOrganization, joinOrganization } from "@/lib/actions/organizations.actions";
import { useRouter } from "next/navigation";
import LeftNavbar from "@/components/shared/LeftNavbar";
import Image from "next/image";
import { Item } from "@/constants/inventory_columns";
import Papa from "papaparse";
import { FileUploader } from "react-drag-drop-files";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileTypes = ["CSV"];
    const router = useRouter();

    const changeHandler = (file: any) => {
        setSelectedFile(file);
        Papa.parse(file, {
            skipEmptyLines: true,
            complete: function(results) {
                let itemsArray = results.data.slice(1) as string[][];
                itemsArray.forEach((item) => {
                    setDoc(doc(db, "items", item[0]), {
                        id: item[0],
                        name: item[0],
                        vendor: item[1],
                        stock: parseInt(item[2]),
                        currStock: parseInt(item[2]),
                        location: item[3],
                        lastOrder: item[4],
                        requests: 0,
                        tag: "In Stock",
                    }).then(() => {
                        router.push("/inventory")
                    });
                    
                });
            }
        });
    }
    
    return (
        <main>
            <div className="flex flex-col items-center justify-between w-full h-screen py-10">
                <Image src="/assets/blue_logo.svg" alt="logo" width={250} height={250} />
                <div className="flex flex-col items-center justify-center">
                    <h1 className=" text-4xl font-semibold">Let's get started!</h1>
                    <p className="w-7/12 text-center my-5">Upload the spreadsheet your lab currently uses to track inventory below. Our technology uses this data to provide insights into better managing your inventory, stock and ordering.</p>
                    <FileUploader handleChange={changeHandler} name="file" types={fileTypes} />
                    <p className="mt-10">Don't have a spreadsheet? <a className="text-blue-650" href="/inventory">Click here</a> to manually add items.</p>
                </div>
                <div>
                </div>
            </div>
        </main>
    );
}