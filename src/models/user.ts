import mongoose from "mongoose";
import { UserType } from "../types/userType";

const userSchema = new mongoose.Schema<UserType>({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String },
  image: String,
});

export const User = mongoose.models.User || mongoose.model<UserType>("User", userSchema);
