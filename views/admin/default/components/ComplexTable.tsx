// Import statements...
import React, { useState } from 'react';
import Card from '@/components/dashboard/card/Card';
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';

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
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mode } from "@chakra-ui/theme-tools";
import { useTheme} from "@chakra-ui/react";
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface Request {
  name: string;
  vendor: string;
  stock: number;
  link: string;
}

export function ComplexTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const theme = useTheme();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

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
  });

  // Chakra Color Mode

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue({bg: 'secondaryGray.900'}, {bg: 'secondaryGray.900'});
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });


  return (
	<Card justifyContent='center' flexDirection='column' w='100%' mb='0px'>
				<Flex px='25px' mb="8px" justifyContent='space-between'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' mt='6'>
					Incoming Requests
				</Text>
					
					<Link as={NextLink} href='/requests'>
					<Button bg={bgButton} _hover={bgHover} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px' mt='5'>
						Go to Requests
					</Button>
					</Link>
					

				</Flex>
      <div>
        <div className="flex items-center pb-4 justify-between">
          <div className='flex gap-2'>
            <div className="flex items-center gap-2">
              {/* ... (other components or elements) */}
            </div>
          </div>
        </div>

        <div className={`rounded-xl border ${mode("bg-secondaryGray.300", "bg-navy.900")(theme)}`}>
          <Table>
            <TableHeader  style={{ color: '#b5b5ba', fontFamily: "'DM Sans', sans-serif" }}> 
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
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
						<TableCell key={cell.id} className="text-brand-700" style={{ color: '#1B2559', fontSize: 'sm', fontWeight: '700', fontFamily: "'DM Sans', sans-serif" }}>
                        {
                          cell.getContext().column.id === "status"
                            ? (
                              <div className="flex items-center">

                                <div style={{ backgroundColor: 'orange' }} className="w-2 h-2 rounded-full mr-2"></div>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
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
        </div>
      </div>
    </Card>
  );
}

export default ComplexTable;
 