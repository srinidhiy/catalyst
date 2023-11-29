"use client"

import React from 'react';

import {
    flexRender,
    Cell,
  } from "@tanstack/react-table"

import { ArchiveRequest } from '@/constants/archivedrequestcolumns';

interface TagInfoProps {
    cell: Cell<any, unknown>;
    cellInfo: ArchiveRequest;
}

export default function RequestTagInfo({ cell, cellInfo }: TagInfoProps) {
    console.log(cellInfo);
    let tagColor = cellInfo.status.substring(0, 6) == "Denied" ? "red" : "green";

    return (
        <div className="flex items-center">
            <div style={{backgroundColor: tagColor}} className="w-2 h-2 rounded-full mr-2"></div>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
    )
}



