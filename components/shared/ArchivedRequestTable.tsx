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

  import { PenSquare } from 'lucide-react';
  import { RequestItemForm } from './RequestItemForm';


import { Input } from "../ui/input"
import { Button } from "../ui/button"
import RequestTagInfo from "./RequestTagInfo";
import { ArchiveRequest } from '@/constants/archivedrequestcolumns';

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

export function ArchivedRequestTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
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
            <div className="flex items-center pb-4 justify-between">
            <h1 className="text-2xl font-bold">Archive</h1>
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
                            cell.getContext().column.id === "status" 
                            ? (
                                <RequestTagInfo cell={cell} cellInfo={row.original as ArchiveRequest}/>
                            )
                            : flexRender(cell.column.columnDef.cell, cell.getContext())
                            }
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





  