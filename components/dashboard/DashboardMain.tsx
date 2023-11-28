"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from  "next/navigation" 
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import {
    Box,
    SimpleGrid,
    Flex,
    useColorModeValue,
  } from '@chakra-ui/react';
    import ComplexTable from '@/views/admin/default/components/ComplexTable';
    import PieCard from '@/views/admin/default/components/PieCard';
    import Tasks from '@/views/admin/default/components/Tasks';
    import TotalSpent from '@/views/admin/default/components/TotalSpent';
    import tableDataComplex from '@/views/admin/default/variables/tableDataComplex';
    import MiniCalendar from '@/views/admin/default/components/MiniCalendar';
    import CheckTable from '@/views/admin/default/components/CheckTable';
    import tableDataCheck from "@/views/admin/default/variables/tableDataCheck"
    import AppWrappers from '@/components/dashboard/AppWrappers';



export default function DashboardMain() {
    return (
        <>
        <div className="ml-[-9px] rounded-l-xl flex flex-col items-start w-full h-screen bg-slate-100">
            <div className="flex justify-between w-full px-5 py-4 border-b border-zinc-300">
                <h1 className="text-blue-650 font-medium text-3xl ml-3 mt-1">DASHBOARD</h1>
                <Input
                    type="search"
                    placeholder="Search..."
                    className="md:w-[100px] lg:w-[300px] bg-slate-300 border-slate-400 rounded-2xl"
                />
            </div>


            <div className="max-h-screen overflow-y-auto mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" style={{ marginTop: '15px' }}>
            <AppWrappers>
                <Flex>
            <Box pt={{ }}>


        
      


      <SimpleGrid
        columns={6}
        gap="20px"
        mb="20px">

        <Box gridColumn="span 4">
          <PieCard />
        </Box>
        <Box gridColumn="span 2">
        <CheckTable tableData={tableDataCheck}/>
        </Box>
        </SimpleGrid>

  
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2}} gap="20px" mb="20px">
        <ComplexTable tableData={tableDataComplex} />
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