import NextAuth, { AuthOptions, SessionStrategy, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/mongodb"; // Adjust the path as needed

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;

        const { db } = await connectToDatabase();
        const user = await db.collection("User").findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Return user object if credentials are valid
          return { id: user.id, email: user.email, name: user.name };
        } else {
          // Return null if credentials are invalid
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy | undefined,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },

  // Add additional NextAuth configuration here if needed
};

export default NextAuth(authOptions);
