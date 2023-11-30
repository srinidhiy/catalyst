"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from  "next/navigation" 
import { Input } from "../ui/input"
import {
    Box,
    SimpleGrid,
    Flex,
    useColorModeValue,
  } from '@chakra-ui/react';
    import {ComplexTable} from '@/views/admin/default/components/ComplexTable';
    import PieCard from '@/views/admin/default/components/PieCard';
    import Tasks from '@/views/admin/default/components/Tasks';
    import TotalSpent from '@/views/admin/default/components/TotalSpent';
    import MiniCalendar from '@/views/admin/default/components/MiniCalendar';
    import CheckTable from '@/views/admin/default/components/CheckTable';
    import tableDataCheck from "@/views/admin/default/variables/tableDataCheck"
    import AppWrappers from '@/components/dashboard/AppWrappers';
    import { Grid } from '@chakra-ui/react';
  import { Button } from "../ui/button"
  import { RequestTable } from "@/components/shared/RequestTable"
  import { archiveColumns } from "@/constants/archivedrequestcolumns"
  import { useEffect, useState } from "react"

import { getDocs, getFirestore, query, where } from "firebase/firestore"
import { collection } from "firebase/firestore"
import firebaseConfig from "@/firebase"
import { initializeApp } from "firebase/app"
import { ArchivedRequestTable } from "../shared/ArchivedRequestTable"
import {Item} from "@/constants/noselectcolumn"
import {columns} from "@/constants/noselectcolumn"



export default function DashboardMain() {



  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [requests, setItems] = useState<Item[]>([]);
  const [archivedRequests, setArchivedRequests] = useState<Item[]>([]);


  useEffect(() => {
      const getInventory = async() => {
          const items: Item[] = [];
          // console.log("Getting items");
          const requestQuery = query(collection(db, "requests"), where("status", "==", "Pending Approval"));
          const querySnapshot = await getDocs(requestQuery);
          querySnapshot.forEach((doc) => {
              // console.log(doc.id, " => ", doc.data());
  
              items.push(doc.data() as Item);
          });
          setItems(items);
      }
      getInventory();

      const getArchivedRequests = async() => {
          const requests: Item[] = [];
          const requestQuery = query(collection(db, "requests"), where("status", "!=", "Pending Approval"));
          const querySnapshot = await getDocs(requestQuery);
          querySnapshot.forEach((doc) => {
              // console.log(doc.id, " => ", doc.data());
  
              requests.push(doc.data() as Item);
          });
          setArchivedRequests(requests);
      }
      getArchivedRequests();
      
  }, [])



    return (
        <>
        <div className="ml-[-10px] rounded-l-xl flex flex-col items-start w-full h-screen bg-slate-100">
            <div className="flex justify-between w-full px-5 py-4 border-b border-zinc-300">
                <h1 className="text-blue-650 font-medium text-3xl ml-3 mt-1">DASHBOARD</h1>
            </div>


            <div className="max-h-screen overflow-y-auto mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" style={{ marginTop: '15px' }}>
            <AppWrappers>
                <Flex>
            <Box pt={{ }}>


        
      



<SimpleGrid columns={6} gap="20px" mb="20px">
  <Box gridColumn="span 4" h="100%">
    <PieCard />
  </Box>
  <Box gridColumn="span 2" h="100%" overflow="auto">
    <CheckTable tableData={tableDataCheck} />
  </Box>
</SimpleGrid>

  
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2}} gap="20px" mb="20px">
      <ComplexTable columns={columns} data={requests}/>

        <TotalSpent />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
      </SimpleGrid>
    </Box>
    </Flex>
    </AppWrappers>
    </div>
            
        </div>
        
        </>
    )
    
}