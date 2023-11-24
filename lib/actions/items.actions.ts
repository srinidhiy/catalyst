"use server"

import firebaseConfig from '../../firebase'
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Item } from '@/constants/inventory_columns';

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