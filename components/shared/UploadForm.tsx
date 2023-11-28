"use client"

import * as z from "zod";
import { zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import firebaseConfig from "@/firebase";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { Item } from "@/constants/inventory_columns";
import { ItemForm } from "./ItemForm";
import { ScrollArea } from "@/components/ui/scroll-area"


const ItemFormSchema = z.object({
    name: z.string({
        required_error: "Please enter a name",
    }).min(1),
    vendor: z.string().min(1),
    stock: z.string().min(1),
    location: z.string().min(1),
});

interface ItemFormProps {
    items: Item[];
}

export function UploadForm({items}: ItemFormProps) {
    return(

        <ScrollArea className="flex flex-col h-fit max-h-[500px] w-[350px]">
            <h1 className="text-2xl font-bold">Confirm Inventory Items</h1>
            {items.map((item) => (
                <ItemForm item={item} />
            ))}
        </ScrollArea>
    )
}