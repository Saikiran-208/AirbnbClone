import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma.js"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { hash, hashCompare } from "_keyhasher";
import { getServerSession } from "next-auth/next";
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error("User not found")
                }
                const isCorrectPassword = hashCompare(
                    user.hashedPassword,
                    hash(credentials.password)
                )
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials")
                }
                return user
            }
        })
    ],
    pages: {
        signIn: "/"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }
            return token;
        }
    }


}
export const getAuthSession = () => getServerSession(authOptions);