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
import { FieldValue, Firestore, doc, getFirestore, increment, setDoc, updateDoc } from "firebase/firestore";
import { DialogClose } from "../ui/dialog";

interface ApproveFormProps {
    namesArray: string[]; // Array of document names
  }

const ItemFormSchema = z.object({
    status: z.string({
        required_error: "Please enter an order date.",
    }).min(1),
});

export function ApproveForm({ namesArray }: ApproveFormProps) {
    const [showForm, setShowForm] = useState(true);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const form = useForm<z.infer<typeof ItemFormSchema>>({
        resolver: zodResolver(ItemFormSchema),
        defaultValues: {
            status: "",
        }
    });

    async function onSubmit(data: z.infer<typeof ItemFormSchema>) {
        console.log(data);
        
        console.log(namesArray)
        namesArray.forEach(async (name) => {
            const requestRef = doc(db, "requests", name);
            await updateDoc(requestRef, {
                status: "Ordered on " + data.status,
            })

            const itemRef = doc(db, "items", name);
            await updateDoc(itemRef, {
                requests: increment(-1),
                lastOrder: data.status,
            })

        });


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
            name="status"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Order Date </FormLabel>
                <FormControl>
                    <Input placeholder="MM-DD-YYYY" {...field} />
                </FormControl>
                </FormItem>
            )}
            />

            <Button className="bg-slate-300 rounded-xl hover:bg-slate-400" type="submit">Submit</Button>
            
        </form>
        </Form>
        ) : (
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-lg font-bold">Item(s) approved!</h1>
                <DialogClose>
                    <Button onClick={window.location.reload.bind(window.location)} className="bg-blue-650 hover:bg-blue-400 text-white px-6 py-4 rounded-xl ">
                        Close
                    </Button>
                </DialogClose>
            </div>
        )
    )
}

