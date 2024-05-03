import {auth, signIn, signOut} from "@/server/auth/auth";
import {redirect} from "next/navigation";
import MyInput from "@/components/general/MyInput/MyInput";
import SingUp from "@/components/client/auth/SingUp/SingUp";

export default async function LoginPage({params: {locale}}: any) {
    const session = await auth();

     console.log("session", session)

    if (session?.user) {
        //  redirect(`/${locale}/profile`);
    }
    return (
        <>
            <SingUp/>
        </>
    );
}
