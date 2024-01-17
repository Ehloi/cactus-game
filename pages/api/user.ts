import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { User } from "@/types/user";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { db } = await connectToDatabase();
  const user = await db.collection<User>("user").findOne({ email: session.user.email ?? "" });
  if (!user) {
    console.log("User not found, creating a new one...");
    // User not found, create a new one
    const newUser: User = {
      email: session.user.email ?? "",
      userName: session.user.name ?? "",
      image: session.user.image ?? "",
      coins: 1000,
      cash: 0,
    };
    await db.collection("user").insertOne(newUser);
    return res.status(201).json(newUser);
  }
  if (req.method === "PUT" && req.query.action === "avatar") {
    // Handle avatar update
    const avatarUrl = req.body.image;
    try {
      console.log("Updating avatar with image: " + avatarUrl);
      await db.collection<User>("user").updateOne({ email: session.user.email ?? "" }, { $set: { image: avatarUrl } });
      return res.status(200).json({ message: "Avatar updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error on avatar update" });
    }
  }

  // User found, return the user
  res.status(200).json(user);
}
