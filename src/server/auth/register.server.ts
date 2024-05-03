"use server"

import {connectToDb} from "@/server/connectToDb";
import {User} from "@/server/users/userSchema";
import bcrypt from "bcryptjs";
import {signIn} from "next-auth/react";
import {loginAction} from "@/server/auth/login.server";

interface registerFormValues {
    name: string
    email: string;
    password: string;
    passwordRepeat: string
}

interface RegisterResult {
    user?: any;
    success?: boolean;
    errorMessage?: string;
}

export const registerAction = async (data: registerFormValues): Promise<RegisterResult> => {
    const {name, email, password, passwordRepeat} = data;

    if (password !== passwordRepeat) return {errorMessage: "Passwords do not match!"};

    try {
        await connectToDb();
        const userExists = await User.findOne({email: email.toLowerCase()});

        if (userExists) return {errorMessage: "Email already exists!"};

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();

        await loginAction({email, password});

        return {user: newUser, success: true};
    } catch (err) {
        console.error(err);
        return {errorMessage: "Something went wrong with register!"};
    }
}
