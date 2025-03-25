import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email :",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password :",
          type: "password",
          placeholder: "enter your password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          return null;
        }

        const validatePassword = bcrypt.compareSync(
          credentials.password,
          user.password as string
        );

        if (!validatePassword) return null;

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
};

export default authOptions;
