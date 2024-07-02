import {auth} from "@/server/auth/auth";
import {redirect} from "next/navigation";
import React from "react";
import '../login/login.scss'
import ForgotPassword from "@/components/client/auth/ForgotPassword/ForgotPassword";
import { Footer } from "@/components/client/Footer/Footer";

export default async function Page({params: {locale}}: any) {
    const session = await auth();

    if (session?.user) {
      //  redirect(`/${locale}/profile`);
    }
    return (
      <div className="loginWrapper ">
        <ForgotPassword/>
        <Footer/>
        </div>
    );
}