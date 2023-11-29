"use client"


import { useState } from "react"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
  } from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ItemForm } from "./ItemForm"
import { RequestItemForm } from "./RequestItemForm"
import { Item } from "@/constants/inventory_columns"
import { UploadForm } from "./UploadForm"
import { Label } from "../ui/label"
import Papa from "papaparse"
import { Plus, Upload, PenSquare} from "lucide-react"
import Link from "next/link"
import ItemInfo from "./ItemInfo"
import TagInfo from "./TagInfo"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const emptyItem: Item = {
    id: "",
    name: "",
    vendor: "",
    stock: 0,
    requests: 0,
    currStock: 0,
    lastOrder: "",
    location: "",
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedItems, setUploadedItems] = useState<Item[]>([]);
    const [showForm, setShowForm] = useState(false);
    const table = useReactTable({ 
        data, 
        columns, 
        getCoreRowModel: getCoreRowModel(), 
        onSortingChange: setSorting, 
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        Papa.parse(event.target.files[0], {
            skipEmptyLines: true,
            complete: function(results) {
                const headersArray: string[] = results.data[0] as string[];
                let itemsArray = results.data.slice(1) as string[][];
                let uploadItems: Item[] = [];
                itemsArray.forEach((item) => {
                    let itemObject = {
                        id: item[0],
                        name: item[0],
                        vendor: item[1],
                        stock: parseInt(item[2]),
                        currStock: parseInt(item[2]),
                        location: item[3],
                        lastOrder: item[4],
                        requests: 0,
                        tag: "In Stock",
                    };
                    uploadItems.push(itemObject);
                    
                });
                setUploadedItems(uploadItems);
                setShowForm(true);
                console.log(uploadItems);
            }
        });
    }

    return (
        <div>
            <div className="flex items-center pb-4 justify-between">
                <Input
                placeholder="Filter items..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm border-slate-300 rounded-xl"
                />
                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild className="bg-black">
                            <Button className="bg-blue-650 hover:bg-blue-400 text-white px-6 py-4 rounded-xl"> 
                                <Plus className="mr-2 h-4 w-4" /> Add Item
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl sm:max-w-[425px] bg-white ">
                            <h1 className="text-lg font-bold">Add an item.</h1>
                            <ItemForm item={emptyItem}/>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild className="bg-black">
                            <Button className="bg-blue-650 hover:bg-blue-400 text-white px-6 py-4 rounded-xl ">
                                <PenSquare className="mr-2 h-4 w-4"/>Request Item
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl sm:max-w-[425px] bg-white ">
                            <h1 className="text-lg font-bold">Request an item.</h1>
                            <RequestItemForm name="" vendor=""/>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild className="bg-black">
                            <Button className="bg-orange-400 hover:bg-orange-200 text-white px-6 py-4 rounded-xl ">
                                <Upload className="mr-2 h-4 w-4" /> Upload from CSV
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl sm:max-w-[425px] bg-white ">
                            {
                            showForm ? (
                                <UploadForm items={uploadedItems} />
                            ) : (
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="file">Inventory CSV File</Label>
                                    <Input className=" border-neutral-200 rounded-xl mt-2" id="file" type="file" accept=".csv" onChange={changeHandler}/>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="rounded-xl border bg-slate-50">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {
                                    cell.getContext().column.id === "name" 
                                    ? (<ItemInfo cell={cell} cellInfo={cell.getContext().row.original as Item}/>)
                                    : cell.getContext().column.id === "tag"
                                    ? (
                                        <TagInfo cell={cell} cellInfo={cell.getContext().row.original as Item}/>
                                    )
                                    : flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                </TableCell>
                                ))}
                            </TableRow>
                            
                        // <Dialog>
                        // <DialogTrigger asChild className="bg-black">
                        // </DialogTrigger>
                        // <DialogContent className="rounded-xl sm:max-w-[425px] bg-white ">
                        //     <h1 className="text-lg font-bold">Add an item.</h1>
                        // </DialogContent>
                        // </Dialog>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
            <div className="flex">
            <div className="flex-1 text-sm text-muted-foreground py-4">
                {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected. */}
            </div>
            <div className="flex items-center justify-end space-x-2 mt-2">
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                Previous
                </Button>
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                Next
                </Button>
            </div>
            </div>
        </div>
      )    
}


  