"use client"

import firebaseConfig from "../../firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect } from "react";
import LeftNavbar from "@/components/shared/LeftNavbar";
import RequestsMain from "@/components/requests/requestsMain";
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Requests() {
  const { getToken } = useAuth();
 
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
 
  //   signInWithClerk();
  // }, []);
 
  return (
    <div className="flex">
      <LeftNavbar />
      <RequestsMain />
    </div>
  );
}