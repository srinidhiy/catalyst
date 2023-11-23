"use client"

import firebaseConfig from "../../firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { currentUser, useAuth } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { collection, getDocs } from "firebase/firestore";
import { set } from "firebase/database";
import { Input } from "@/components/ui/input";
import { createOrganization, joinOrganization } from "@/lib/actions/organizations.actions";
import { useRouter } from "next/router";
import LeftNavbar from "@/components/shared/LeftNavbar";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function onCreate() {
    const user = await currentUser();
    // await createOrganization(typedOrganization, user?.username as string);
}

async function onJoin() {
    const user = await currentUser();
    // await joinOrganization(selectedOrganization, user?.username as string);
}


export default function Home() {
    const [organizationList, setOrganizationList] = useState<string[]>([]);
    // const [userName, setUserName] = useState<string>("");
    const [selectedOrganization, setSelectedOrganization] = useState<string>("");
    const [typedOrganization, setTypedOrganization] = useState<string>("");
    
    const { getToken } = useAuth();
 
    useEffect(() => {
        const signInWithClerk = async () => {
        const auth = getAuth();
        const token = await getToken({ template: "integration_firebase" }) as string;
        const userCredentials = await signInWithCustomToken(auth, token);
        console.log(userCredentials);
        };
        signInWithClerk();

        const getOrganizations = async() => {
            const organizations: string[] = [];
            const querySnapshot = await getDocs(collection(db, "organizations"));
            console.log("QUERYING");
            querySnapshot.forEach((doc) => {
                organizations.push(doc.id);
            });
            setOrganizationList(organizations);
        }
        getOrganizations();

    }, []);
    
    return (
        <main>
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h1>Welcome to Catalyst!</h1>
                <p>Let's get started by joining an organization.</p>
                <div className="flex items-center justify-center w-full h-16">
                <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            organizationList.map((organization: string) => {
                                return <SelectItem key={organization} value={organization}>{organization}</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
                <button className="ml-3 px-4 py-2 text-white bg-blue-600 rounded-md" onSubmit={onJoin}>Join</button>
                </div>
                <p>OR</p>
                <p>Create a new organization.</p>
                <div className="flex items-center justify-center h-16 w-2/6">
                <Input type="text" placeholder="Organization name" />
                <button className="ml-3 px-4 py-2 text-white bg-blue-600 rounded-md" onSubmit={onCreate}>Submit</button>
                </div>
            </div>
        </main>
    );
}