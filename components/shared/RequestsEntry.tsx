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

import { RequestData } from "@/constants/inventory_columns";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase";
import { getFirestore, doc, getDocs } from "firebase/firestore";

interface requestLinkProps {
    cell: Cell<any, unknown>;
    cellInfo: RequestData;
}

// export default function RequestLink({ cell, cellInfo }: requestLinkProps) {
//     const app = initializeApp(firebaseConfig);
//     const db = getFirestore(app);
//     useEffect(() => {
//         // get reqeuests that correspond to this item
//         const requestRef = doc(db, "requests", cellInfo.name);
//         await getDocs(requestRef);
//         await updateDoc(requestRef, {
//             status: "Denied on " + data.status,
//         })

//     }
//     return (
        
//   )
// }