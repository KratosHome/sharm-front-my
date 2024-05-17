import {auth} from "@/server/auth/auth";
import {redirect} from "next/navigation";
import React from "react";

export default async function Page({params: {locale}}: any) {
    const session = await auth();

    if (session?.user) {
      //  redirect(`/${locale}/profile`);
    }
    return (
        <>
        </>
    );
}