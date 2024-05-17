import "./login.scss";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import {loginAction} from "@/server/auth/login.server";

function LoginPage() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    let error: null | string = null;
    let loader: boolean = false;

    async function createInvoice(formData: FormData) {
        "use server";

        const emailEntry = formData.get("email");
        const passwordEntry = formData.get("password");

        const email = typeof emailEntry === "string" ? emailEntry.toLowerCase() : "";
        const password = typeof passwordEntry === "string" ? passwordEntry : "";

        const rawFormData = {email, password};

        await loginAction(rawFormData);
    }

    return (
        <>
            <div className="container-login-admin">
                {loader ? <div>loading...</div> : null}
                {error ? <div>{error}</div> : null}
                <div>
                    <div>admin account</div>
                    <div>name: leedolegtkach@gmail.com</div>
                    <div>Pass: leedolegtkach@gmail.com</div>
                </div>
                <form action={createInvoice}>
                    <input type="email" name="email"/>
                    <input type="password" name="password"/>
                    <MyBtn text={"Submit"} color={"primary"}/>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
