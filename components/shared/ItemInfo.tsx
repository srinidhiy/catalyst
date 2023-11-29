
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';
import { Item } from '@/constants/inventory_columns';
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
import { Button } from '@chakra-ui/react';
import { X } from 'lucide-react';
import firebaseConfig from '@/firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { ScrollArea } from '../ui/scroll-area';
import { PenSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { RequestItemForm } from './RequestItemForm';

interface SidebarItem {
  title: string;
  description: string;
}

interface FramerTextProps {
  delay: number;
}

const framerText = ({ delay }: FramerTextProps) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: 0.3 },
};

interface SidebarProps {
    cell: Cell<any, unknown>;
    cellInfo: Item;
}

interface Order{
  date: string;
  received: string;
  quantity: number;
}


export default function ItemInfo ({cell, cellInfo}: SidebarProps) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log(cellInfo.name);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]); // [date, date, date
  const ref = useRef(null);
  // useClickAway(ref, () => setOpen(false));
  const toggleSidebar = () => setOpen((prev) => !prev);

  useEffect(() => {
    const getOrders = async() => {
      let order_array: Order[] = [];
      const querySnapshot = await getDocs(collection(db, "items", cellInfo.name, "orders"));
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
          order_array.push(doc.data() as Order);
        });
      }
      setOrders(order_array);
    }
    getOrders();
  }, [])

  async function onIncrease() {
    const itemRef = doc(db, "items", cellInfo.name);
    const itemDoc = await getDoc(itemRef);
    if (itemDoc.exists()) {
        await updateDoc(itemRef, {
            currStock: increment(1),
        })
    }
  }

  async function onDecrease() {
    const itemRef = doc(db, "items", cellInfo.name);
    const itemDoc = await getDoc(itemRef);
    if (itemDoc.exists()) {
        await updateDoc(itemRef, {
            currStock: increment(-1),
        })
    }
  }


  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-label="toggle sidebar"
      >
        {/*HERE IS WHERE IT TRIGGERS OPENING*/}
        <u>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </u>
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <div>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 right-0 z-50 w-full h-screen max-w-lg border-r-2 border-[#cbd1d6] bg-[#f1f5f9]"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-[#cbd1d6]" style={{ color: '#505559' }}>
                <div className="flex flex-col">
                <span className=' font-bold text-2xl'>{cellInfo.name}</span>
                <span className=' font-medium text-lg'>{cellInfo.vendor}</span>
                </div>
              <Button className='p-5' onClick={toggleSidebar}>
                  <X size={24} />  
                </Button>
              </div>
        
              <div className='flex flex-col p-5 gap-4 border-b-2 border-[#cbd1d6]'>
                <div className='flex flex-row justify-between'>
                  <p>Number of requests: </p>
                  <p>{cellInfo.requests}</p>
                </div>
                <div className='flex flex-row justify-between'>
                  <p>Last order: </p>
                  <p>{cellInfo.lastOrder}</p>
                </div>
                <div className='flex flex-row justify-between'>
                  <p>Recommended time to order: </p>
                  <p>{cellInfo.tag}</p>
                </div>
              </div>
              
              <ScrollArea className='flex flex-col p-5 gap-4 border-b-2 max-h-1/4 border-[#cbd1d6]'>
                <h3 className='font-semibold'><u>Order History:</u></h3>
                {orders.length > 0 ? (
                <div className=' mt-1 flex flex-row justify-between font-semibold'>
                  <p>Order Date</p>
                  <p>Delivery Date</p>
                  <p>Order Placed</p>
                </div>
                )
                : (
                  <p className='mt-1'>No orders found.</p>
                )
                }
          
                {orders.map((order) => (
                  <div className='mt-1 flex flex-row justify-between'>
                    <p>{order.date}</p>
                    <p>{order.received}</p>
                    <p>{order.quantity} Units</p>
                  </div>
                ))}
              </ScrollArea>

              <div className='flex flex-col p-5 gap-4 '>
                <div className='flex flex-col items-center'>
                  <p className=' font-semibold text-lg'>Current stock: </p>
                  <p className='text-lg mt-1'>{cellInfo.currStock} Units</p>
                </div>
                <div className='flex flex-row justify-center gap-3'>
                  <Button onClick={onDecrease} className='p-3 bg-blue-650 rounded-xl hover:bg-blue-300 text-white font-semibold'>Decrease</Button>
                  <Button onClick={onIncrease} className='p-3 bg-blue-650 rounded-xl hover:bg-blue-300 text-white font-semibold'>Increase</Button>
                </div>
              </div>

              <div>
                <div className='flex justify-center absolute inset-x-0 bottom-0 border-t-2 border-[#cbd1d6] py-5'>
                  <Dialog>
                    <DialogTrigger asChild className="bg-black">
                        <Button className='  p-3 bg-blue-650 rounded-xl hover:bg-blue-300 text-white font-semibold'>
                            <PenSquare className="mr-2 h-4 w-4"/>Request Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-xl sm:max-w-[425px] bg-white ">
                        <h1 className="text-lg font-bold">Request an item.</h1>
                        <RequestItemForm name={cellInfo.name} vendor={cellInfo.vendor} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

            </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
};

  