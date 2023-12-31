import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcryptjs";

import User from '@/models/user'
import GoogleUser from '@/models/GoogleUser'
import dbConnect from '@/utils/dbConnect';

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username"
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password"
        }
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data 
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        // @ts-expect-error
        const { email, password } = credentials;

        try {
          await dbConnect();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    // This could be avatars, role, display name, etc...
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      // skip this if logging in with credentials
      if (account?.type === 'credentials') {
        return true
      }
      try {
        await dbConnect();
        // check if user already exists
        const userExists = await User.findOne({ email: profile?.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await GoogleUser.create({
            email: profile?.email,
            name: profile?.name,
            image: profile?.image,
          });
        }

        return true
      } catch (error: any) {

        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
}