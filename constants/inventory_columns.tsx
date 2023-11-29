"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type Item = {
    id: string;
    name: string;
    vendor: string;
    stock: number;
    currStock: number;
    lastOrder: string;
    requests: number;
    location ?: string;
    tag ?: string;
    tagColor ?: string;
}

export const columns: ColumnDef<Item>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            />
        ),
        // enableSorting: false,
        // enableHiding: false,
    },
    {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <h1 className="px-3">Name</h1>
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
                    <h1 className="px-3">Vendor</h1>
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
                    <h1 className="px-3">Stock</h1>
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
                    <h1 className="px-3">Requests</h1>
                    <ArrowUpDown className="h-4 w-4" />    
                </Button>
            )
        },
        accessorKey: "requests",
    },
    {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <h1 className="px-3">Location</h1>
                    <ArrowUpDown className="h-4 w-4" />    
                </Button>
            )
        },
        accessorKey: "location",
    },
    {
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <h1 className="px-3">Tag</h1>
                    <ArrowUpDown className="h-4 w-4" />    
                </Button>
            )
        },
        accessorKey: "tag",
    },
]