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

interface RequestData {
    name: string;
    vendor: string;
    stock: number;
    link: string;
}

interface requestLinkProps {
    cell: Cell<any, unknown>;
    cellInfo: RequestData;
}

export default function RequestLink({ cell, cellInfo }: requestLinkProps) {
    if (cellInfo.link == null) {
        cellInfo.link = "";
    }
    return (
        cellInfo.link == "" ? flexRender(cell.column.columnDef.cell, cell.getContext())
                            : (
                                <a href={cellInfo.link} target="_blank" className="text-blue-500 hover:underline">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </a>
                            )
  )
}