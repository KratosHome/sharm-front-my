import {auth, signIn, signOut} from "@/server/auth/auth";
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function LoginPage({params: {locale}}: any) {
    const session = await auth();

    // console.log("session", session)

    if (session?.user) {
        redirect(`/${locale}/profile`);
    }
    return (
        <>
            <h1>Увійти в аккаунт</h1>
            <form>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button type="submit">Увійти</button>
            </form>
            <Link href={`/${locale}/forgot-password`}>Забули пароль?</Link>
            <Link href={`/${locale}/sing-up`}>зареєеструватись</Link>
            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit">Signin with Google</button>
            </form>
        </>
    );
}
