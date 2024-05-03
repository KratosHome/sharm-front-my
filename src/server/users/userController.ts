"use server"
import {connectToDb} from "@/server/connectToDb";
import {User} from "@/server/users/userSchema";
import {revalidatePath, unstable_noStore as noStore} from "next/cache";
import bcrypt from "bcryptjs";


export const getUsers = async (page: number = 1, limit: number = 10) => {
    noStore(); // прибирання кешування
    try {
        await connectToDb();
        const total = await User.countDocuments();
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const users = await User.find().limit(limit).skip(startIndex);

        return {
            users: users,
            total,
            currentPage: page,
            totalPages
        };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
};

export const getUser = async (id: any) => {
    // noStore();
    try {
        await connectToDb();
        return await User.findById(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user!");
    }
};


export const addUser = async (prevState: any, formData: any) => {
    const {username, email, password, img} = Object.fromEntries(formData);

    try {
        await connectToDb();
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password,
            img,
        });

        await newUser.save();
        console.log("saved to db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};


export const deleteUser = async (formData: any) => {
    const {id} = Object.fromEntries(formData);

    try {
        await connectToDb();
        await User.findByIdAndDelete(id);

        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

export const register = async (formData: any) => {
    "use server"
    const {username, email, password, img, passwordRepeat} = Object.fromEntries(formData);
    if (password !== passwordRepeat) return {error: "Passwords do not match"};

    try {
        await connectToDb();
        const user = await User.findOne({email: email.toLowerCase()});
        if (user) return {error: "Username already exists"};

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            img,
        });

        await newUser.save();
        return {success: true};
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};



