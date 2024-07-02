import {auth, signIn, signOut} from "@/server/auth/auth";
import {redirect} from "next/navigation";
import '../login/login.scss'
import SingUp from "@/components/client/auth/SingUp/SingUp";
import { Footer } from "@/components/client/Footer/Footer";

export default async function LoginPage({ params: { locale } }: any) {
    const session = await auth();

     console.log("session", session)

    if (session?.user) {
        //  redirect(`/${locale}/profile`);
    }
    return (
        <div className="loginWrapper">
            <SingUp />
            <Footer/>
        </div>
    );
}
