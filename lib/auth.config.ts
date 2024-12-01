import type { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthConfig;