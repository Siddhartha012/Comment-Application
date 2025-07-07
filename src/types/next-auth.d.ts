// src/types/next-auth.d.ts

//import NextAuth from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { DefaultSession, User } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from "next-auth/jwt";


//import NextAuth, { DefaultSession } from 'next-auth';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
