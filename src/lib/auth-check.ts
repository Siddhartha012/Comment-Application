// src/lib/auth-check.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

//import { Session } from "next-auth";

export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
