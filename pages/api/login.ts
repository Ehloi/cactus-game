import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const { db } = await connectToDatabase();
      const user = await db.collection("user").findOne({ email });

      if (user && bcrypt.compareSync(password, user.password)) {
        // Handle successful login (set up session, return user info, etc.)
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
