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
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { Item } from "@/constants/inventory_columns";
import dayjs from "dayjs";
import { DialogClose } from "../ui/dialog";
import { useRouter } from "next/navigation";

const ItemFormSchema = z.object({
    name: z.string({
        required_error: "Please enter a name",
    }).min(1),
    vendor: z.string().min(1),
    stock: z.coerce.number().min(0),
    location: z.string().min(1),
});

interface ItemFormProps {
    item: Item;
}

export function ItemForm({item}: ItemFormProps ) {
    const [showForm, setShowForm] = useState(true);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const form = useForm<z.infer<typeof ItemFormSchema>>({
        resolver: zodResolver(ItemFormSchema),
        defaultValues: {
            name: item.name,
            vendor: item.vendor,
            stock: item.stock,
            location: item.location,
        }
    });

    const router = useRouter();
    async function onSubmit(data: z.infer<typeof ItemFormSchema>) {
        // add item to database
        console.log(data);
        const docRef = doc(db, "items", data.name);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, {
                stock: docSnap.data()?.currStock + data.stock,
                currStock: docSnap.data()?.currStock + data.stock,
            })
        } else {
            await setDoc(doc(db, "items", data.name), {
                name: data.name,
                vendor: data.vendor,
                stock: data.stock,
                location: data.location,
                currStock: data.stock,
                lastOrder: (dayjs().format("MM-DD-YYYY")).toString(),
                requests: 0,
                tag: "In Stock",
            });
        }

        setShowForm(false);
    }

    function onAdded() {
        setShowForm(true);
        // clear form
        form.reset();
        
    }

    return (
        showForm ? (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mb-5">
            {/* <FormDescription className=" text-lg font-bold">Add an item to your inventory.</FormDescription>  */}
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="vendor"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Item Vendor</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Amount of Stock</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Item Location</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <div className="flex gap-3">
                <Button className="bg-blue-650 hover:bg-blue-400 text-white px-6 py-4 rounded-xl" type="submit">Submit</Button>
                <DialogClose>
                    <Button onClick={window.location.reload.bind(window.location)} className="bg-slate-300 rounded-xl hover:bg-slate-400 ">
                        Close
                    </Button>
                </DialogClose>
            </div>
        </form>
        </Form>
        ) : (
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-lg font-bold">Item added!</h1>
                <div className="flex flex-col gap-3">
                    <Button onClick={onAdded}>Add another item.</Button>
                    <DialogClose>
                        <Button onClick={window.location.reload.bind(window.location)} className="bg-blue-650 hover:bg-blue-400 text-white px-6 py-4 rounded-xl ">
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </div>
        )
    )
}

