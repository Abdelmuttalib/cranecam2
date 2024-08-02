import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
// CredentialsProvider is not a default export
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import { db } from "@/server/db";
import { comparePassword } from "@/lib/bcrypt";
import { Account, Post } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      emailVerified: string;
      image: string;
      accounts: Account[];
      sessions: Session[];
      posts: Post[];
      password: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ token, user }) => {
      console.log("jwt", token, user);
      if (user) {
        token.id = user.id;
      }

      // return token;
      return {
        ...token,
        ...(user && user.id ? { id: user.id } : {}),
        ...(user && user.name ? { name: user.name } : {}),
        ...(user && user.email ? { email: user.email } : {}),
      };
    },
    session: ({ session, token }) => {
      console.log("session", session, token);

      return {
        ...session,
        user: {
          ...session.user,
          // id: user.id,
          ...(token && token.id ? { id: token.id } : {}),
          ...(token && token.name ? { name: token.name } : {}),
          ...(token && token.email ? { email: token.email } : {}),
        },
      };
    },
  },
  // adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // const hashedPassword = credentials.password;
        // const isMatch = await bcrypt.compare(credentials.password, hashedPassword);

        const isPasswordMatch = await comparePassword(
          credentials.password,
          user.password,
        );

        console.log("isPasswordMatch", isPasswordMatch);

        // if

        // manage compare password

        console.log("user", user);

        return Promise.resolve(user);

        // Add your own logic here to authorize the user.
        // This example uses the Prisma client to verify the user's credentials.
        // return null;
        // const user = await db.user.findFirst({
        //   where: {
        //     email: credentials.email,
        //     password: credentials.password,
        //   },
        // });

        // if (user) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
