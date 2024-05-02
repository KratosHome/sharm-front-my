import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {connectToDb} from "@/server/connectToDb";
import {User} from "@/server/users/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {AdapterUser} from "@auth/core/adapters";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/server/auth/db";
import Google from "next-auth/providers/google"

const login = async (credentials: any) => {
    try {
        await connectToDb();
        const user = await User.findOne({email: credentials.email});
        if (!user) throw new Error("Wrong credentials!");
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to login!");
    }
};


export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google,
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    return await login(credentials);
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            return true;
        },
        async session({session, token, user}) {
            session.user = token.user as AdapterUser;
            return session;
        },
        async jwt({token, user, account}) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
});