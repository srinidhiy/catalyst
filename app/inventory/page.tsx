"use client"

import firebaseConfig from "../../firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import LeftNavbar from "@/components/shared/LeftNavbar";
import MainCard from "@/components/shared/MainCard";
import { getItems } from "@/lib/actions/items.actions";
import { Item } from "@/constants/inventory_columns";
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const { getToken } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
 
  // useEffect(() => {
  //   const signInWithClerk = async () => {
  //     const auth = getAuth();
  //     const token = await getToken({ template: "integration_firebase" }) as string;
  //     const userCredentials = await signInWithCustomToken(auth, token);
 
  //     /**
  //      * The userCredentials.user object will call the methods of
  //      * the Firebase platform as an authenticated user.
  //      */
  //     console.log("user ::", userCredentials.user);
  //   };

  //   // const getInventory = async() => {
  //   //     const items: Item[] = [];
  //   //     console.log("Getting items");
  //   //     const querySnapshot = await getDocs(collection(db, "items"));
  //   //     querySnapshot.forEach((doc) => {
  //   //         console.log(doc.id, " => ", doc.data());

  //   //         items.push(doc.data() as Item);
  //   //     });
  //   //     setItems(items);
  //   // }
  //   // getInventory();
 
  //   signInWithClerk();

  // }, []);
 
  return (
    <div className="flex">
    <LeftNavbar />
    <MainCard />
    </div>
  );
}