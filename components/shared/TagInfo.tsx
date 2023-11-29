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
    Cell,
  } from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Item } from "@/constants/inventory_columns";

interface TagInfoProps {
    cell: Cell<any, unknown>;
    cellInfo: Item;
}

export default function TagInfo({ cell, cellInfo }: TagInfoProps) {
    let tag = cellInfo.tag;
    let tagColor = cellInfo.tagColor;

    return (
        <div className="flex items-center">
            <div style={{backgroundColor: tagColor}} className="w-2 h-2 rounded-full mr-2"></div>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
    )
}



