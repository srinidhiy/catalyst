"use server"

import firebaseConfig from '../../firebase'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createOrganization (
    name: string,
    user: string
) {
   return; 
}

export async function joinOrganization(name: string, user: string) {
    return;
}