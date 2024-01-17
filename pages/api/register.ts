import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/types/user";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // User is already logged in
    return res.status(403).json({ error: "You are already logged in" });
  }
  if (req.method === "POST") {
    try {
      const { email, name, password, passwordConfirm } = req.body;
      const { db } = await connectToDatabase();
      const existingEmail = await db.collection("user").findOne({ email });
      const existingName = await db.collection("user").findOne({ userName: name });

      if (existingEmail) return res.status(409).json({ error: "You already registered with this email" });

      if (existingName) return res.status(409).json({ error: "Username already taken" });

      if (name.length < 4) return res.status(409).json({ error: "Username must be at least 4 characters long" });

      if (password.length < 6) return res.status(409).json({ error: "Password must be at least 6 characters long" });

      if (password !== passwordConfirm) return res.status(409).json({ error: "Passwords do not match" });

      if (!password.match(/\d/g)) return res.status(409).json({ error: "Password must contain at least 1 digit" });

      if (!password.match(/[A-Z]/g)) return res.status(409).json({ error: "Password must contain at least 1 uppercase letter" });

      if (!password.match(/[a-z]/g)) return res.status(409).json({ error: "Password must contain at least 1 lowercase letter" });

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser: User = { email, userName: name, password: hashedPassword, cash: 0, coins: 1000, image: "" };
      await db.collection("user").insertOne(newUser);
      await signIn("credentials", {
        email,
        password,
        callbackUrl: `${req.headers.origin}/dashboard`,
        redirect: false,
      });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
