import {auth} from "@/server/auth/auth";
import {redirect} from "next/navigation";

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