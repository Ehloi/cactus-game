import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { getSession } from "next-auth/react";
import { User } from "@/models/user";
import { UserType } from "@/types/userType";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("User session", session.user);
  const { db } = await connectToDatabase();
  const user = await db.collection<UserType>("user").findOne({ email: session.user.email ?? "" });

  if (!user) {
    console.log("User not found, creating a new one...");
    // User not found, create a new one
    const newUser: UserType = {
      email: session.user.email ?? "",
      name: session.user.name ?? "",
      image: session.user.image ?? "",
    };
    await db.collection("user").insertOne(newUser);
    return res.status(201).json(newUser);
  }

  // User found, return the user
  res.status(200).json(user);
}
