import {auth, signIn, signOut} from "@/server/auth/auth";
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function LoginPage({params: {locale}}: any) {
    const session = await auth();

    if (!session) {
        redirect(`/`);
    }
    return (
        <>
            профайл
        </>
    );
}
