import prisma from "@/lib/db";
import * as bcrypt from 'bcrypt'
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user:any = await prisma.user.findFirst({
          where: {
            username: credentials?.username
          },
          select: {
            id: true,
            status: true,
            role: true,
            firstName: true,
            lastName: true,
            email: true,
            username: true,
            password: true
          }
        }).catch((err)=> {
          console.error(err)
          throw new Error("Something went wrong")
        })


        if (user && bcrypt.compareSync(credentials?.password || '', user.password) ) {
          const { password, ...data } = user;
          return data
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user, }:{token:any, user:any}){
      if (user){
        token.user = user
      }

      return token;
    },
    async session({session, token}:{session:any, token:any}){
      session.user = token.user
      session.user.username = token.username

      return session;
    }
  }
}

const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST}