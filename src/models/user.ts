import mongoose from "mongoose";
import { User } from "../types/user";

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  coins: { type: Number, required: true },
  cash: { type: Number, required: true },
  password: String,
  image: String,
});

export const UserSchema = mongoose.models.User || mongoose.model<User>("user", userSchema);
