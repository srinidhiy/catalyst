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
                    <h1 className="px-3">Status</h1>
                    <ArrowUpDown className="h-4 w-4" />    
                </Button>
            )
        },
        accessorKey: "status",
    },
]