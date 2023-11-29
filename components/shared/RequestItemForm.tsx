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
import { FieldValue, Firestore, addDoc, collection, doc, getDoc, getFirestore, increment, setDoc, updateDoc } from "firebase/firestore";
import { currentUser, useUser } from "@clerk/nextjs";
import { DialogClose } from "../ui/dialog";
  

const ItemFormSchema = z.object({
    name: z.string({
        required_error: "Please enter a name",
    }).min(1),
    vendor: z.string().min(1),
    stock: z.string().min(1),
    link: z.string(),
});

interface RequestItemFormProps {
    name: string;
    vendor: string;
}

export function RequestItemForm({name, vendor}: RequestItemFormProps) {
    const [showForm, setShowForm] = useState(true);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const { user } = useUser();

    const form = useForm<z.infer<typeof ItemFormSchema>>({
        resolver: zodResolver(ItemFormSchema),
        defaultValues: {
            name: name,
            vendor: vendor,
            stock: "",
            link: "",
        }
    });

    async function onSubmit(data: z.infer<typeof ItemFormSchema>) {
        // add item to database
        console.log(data);
        await setDoc(doc(db, "requests", data.name), {
            name: data.name,
            vendor: data.vendor,
            stock: parseInt(data.stock),
            status: "Pending Approval",
            user: user?.primaryEmailAddress?.emailAddress,
            link: data.link,
        });

        const itemRef = doc(db, "items", data.name);
        const itemDoc = await getDoc(itemRef);
        if (itemDoc.exists()) {
            await updateDoc(itemRef, {
                requests: increment(1),
            })
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* <FormDescription className=" text-lg font-bold">Request an item.</FormDescription> */}
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
            name="link"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Link to item</FormLabel>
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
                <h1 className="text-lg font-bold">Item requested!</h1>
                <div className="flex gap-3">
                    <Button onClick={onAdded}>Add another item.</Button>
                    <DialogClose>
                        <Button onClick={window.location.reload.bind(window.location)} className="bg-slate-300 rounded-xl hover:bg-slate-400xl ">
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </div>
        )
    )
}

