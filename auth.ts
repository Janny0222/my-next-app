import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from 'zod';
import { sql } from "@vercel/postgres";
import type { User } from "./app/lib/definitions";
import bcrypt from 'bcrypt';
import { getSession } from "next-auth/react";
import { Session } from "next-auth";



async function getUser(email: string): Promise<User | undefined>{
    try{
        // getting user with the same email input
        const user = await sql<User>`SELECT * FROM users WHERE email =${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch User:', error);
        throw new Error('Failed to fetch user');
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return !!session?.user;
  }

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials){const parsedCredentials= z.object({email: z.string(), password: z.string().min(6)}).safeParse(credentials);

            if(parsedCredentials.success){
                const { email, password} = parsedCredentials.data;

                // to check if user is available
                const user = await getUser(email);
                if(!user) return null;

                // to check if enter password is match on the database
                const passwordMatch = await bcrypt.compare(password, user.password);

                if(passwordMatch) 
                return {...user, name: user.name,}
            }
            console.log('Invalid Credentials');
            return null;
        },
    }),],
});