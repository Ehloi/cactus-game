import NextAuth, { AuthOptions, SessionStrategy, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/mongodb"; // Adjust the path as needed

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials) return null;

        const { db } = await connectToDatabase();
        const user = await db.collection("user").findOne({ email: credentials.email });

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
  // Add additional NextAuth configuration here if needed
};

export default NextAuth(authOptions);
