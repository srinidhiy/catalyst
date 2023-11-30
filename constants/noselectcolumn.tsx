"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type Item = {
    id: string;
    name: string;
    vendor ?: string;
    stock ?: number;
    status: string;
}

export const columns: ColumnDef<Item>[] = [
    {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <h1 className="px-3">NAME</h1>
                    <ArrowUpDown className="h-4 w-4" />    
                </Button>
            )
        },
        accessorKey: "name",
    },
    {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <h1 className="px-3">VENDOR</h1>
                    <ArrowUpDown className="h-4 w-4" />    
                </Button>
            )
        },
        accessorKey: "vendor",
    },
    {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <h1 className="px-3">STOCK</h1>
                    <ArrowUpDown className="h-4 w-4" />    
                </Button>
            )
        },
        accessorKey: "stock",
    },
    {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <h1 className="px-3">STATUS</h1>
                    <ArrowUpDown className="h-4 w-4" />    
                </Button>
            )
        },
        accessorKey: "status",
    },
]