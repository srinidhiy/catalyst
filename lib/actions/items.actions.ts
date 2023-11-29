"use server"

import firebaseConfig from '../../firebase'
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Item } from '@/constants/inventory_columns';
import dayjs from 'dayjs';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export async function getItems(): Promise<Item[]> {
    const items: Item[] = [];
    console.log("Getting items");
    const querySnapshot = await getDocs(collection(db, "items"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        // items.push(doc.data() as Item);
    });
    return items;
}

export async function getTag(currStock: number, originalStock: number, requests: boolean, lastOrder: string) {
    const lastOrderDate = dayjs(lastOrder);
    const today = dayjs();
    const daysSinceLastOrder = today.diff(lastOrderDate, 'day');
    if (daysSinceLastOrder < 5) {
        return { tag: "Just Ordered", color: "green" }
    }
    const rateOfDecline = (originalStock - currStock) / daysSinceLastOrder;
    const daysToEmpty = Math.round(currStock / rateOfDecline);

    if (currStock < (0.1* originalStock)) {
        return { tag: "0 days", color: "red" }
    } else if (requests) {
        return { tag: "1 week", color: "orange" }
    } else if (daysToEmpty < 14) {
        return { tag: `${daysToEmpty} days`, color: "red" }
    } else if (daysToEmpty < 60) {
        return { tag: `${Math.round(daysToEmpty % 7)} weeks`, color: "yellow" }
    } else {
        return { tag: "3 months", color: "green" }
    }
}