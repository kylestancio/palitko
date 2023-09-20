import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: int,
      role: string,
      status: string,
      firstName: string,
      lastName: string,
      email: string,
      username: string
    }
  }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    user?: {
      id: int,
      role: string,
      status: string,
      firstName: string,
      lastName: string,
      email: string,
      username: string
    }
  }
}