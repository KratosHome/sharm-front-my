import {auth} from "@/server/auth/auth";
import {createUsers} from "@/server/users/userController";
import {redirect} from "next/navigation";

export default async function LoginPage({params: {locale}}: any) {
    const session = await auth();

    if (session?.user) {
        await createUsers(session)
        redirect(`/${locale}/profile`);
    }
    return (
        <>
            логін
        </>
    );
}
