"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

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
  import { ItemForm } from "./ItemForm"
  import { Item } from "@/constants/requestcolumns"
  import { ApproveForm } from "./ApproveForm"


import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

interface Request {
    name: string;
    vendor: string;
    stock: number;
    link: string;
}

export function RequestTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});


    const [selectedNames, setSelectedNames] = useState<string[]>([]); // New state for storing names


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


   // Update the array of selected names when the selected rows change
   let names: string[] = [];
   table.getFilteredSelectedRowModel().rows.forEach((row) => {
    const name = row.original as Request;
    names.push(name.name);
   });


    return (
        <div>
            <div className="flex items-center pb-4">
            <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild className="bg-black">
                            <Button className="bg-blue-650 hover:bg-blue-400 text-white px-6 py-4 rounded-xl " disabled={table.getFilteredSelectedRowModel().rows.length === 0}>
                               Approve Item(s)
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl sm:max-w-[425px] bg-white ">
                            <h1 className="text-lg font-bold">Items to be Approved:</h1>
                            <ul>
                {table.getFilteredSelectedRowModel().rows.map((row) => (
                  <li key={row.id}>
                    Name:{' '} 
                    {row.getVisibleCells().map((cell) => (
                      <span key={cell.id}>
                        {cell.column.id === 'name' ? flexRender(cell.column.columnDef.cell, cell.getContext()): ''}
                      </span>
                    ))}{', '}
                    Vendor:{' '}
                    {row.getVisibleCells().map((cell) => (
                      <span key={cell.id}>
                        {cell.column.id === 'vendor' ? flexRender(cell.column.columnDef.cell, cell.getContext()): ''}
                      </span>
                    ))}{', '}
                    Stock:{' '}
                    {row.getVisibleCells().map((cell) => (
                      <span key={cell.id}>
                        {cell.column.id === 'stock' ? flexRender(cell.column.columnDef.cell, cell.getContext()): ''}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
                            <ApproveForm namesArray={names}/>
                        </DialogContent>
                    </Dialog>
                    
                    </div>

                <Input
                placeholder="Filter items..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm border-slate-300 rounded-xl"
                />
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
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
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
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
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





  