import React from 'react';
import Image from "next/image";
import logOut from "./logOut.svg"
import {cookies} from "next/headers";
import {signOut} from "@/server/auth/auth";

const LogOut = () => {

    async function createInvoice() {
        'use server'
        await signOut()
    }

    return (
        <form action={createInvoice}>
            <button>
                <Image src={logOut} alt={"logo"}/>
            </button>
        </form>
    );
};

export default LogOut;