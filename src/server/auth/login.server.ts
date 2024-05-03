"use server"
import {signIn} from "@/server/auth/auth";
import {connectToDb} from "@/server/connectToDb";

export const loginAction = async (data: { email: string; password: string; }) => {
    try {
        await connectToDb();
        await signIn("credentials", {
            email: data.email.toLowerCase(),
            password: data.password,
            redirect: false
        });
        return {
            success: true,
            error: false
        };
    } catch (e) {
        console.log("error loginAction", e);
        return {error: true};
    }
}