import {auth, signIn, signOut} from "@/server/auth/auth";
import {redirect} from "next/navigation";
import {createUsers} from "@/server/users/userController";

export default async function LoginPage({params: {locale}}: any) {
    const session = await auth();

    console.log("session", session)

    if (session?.user) {
       // await createUsers(session)
      //  redirect(`/${locale}/profile`);
    }
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit">Signin with Google</button>
            </form>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit">signOut with Google</button>
            </form>
        </>
    );
}
