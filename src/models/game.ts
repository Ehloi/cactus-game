import mongoose from "mongoose";
import { PlayerSchema } from "./player";
import { Game } from "@/types/game";

const gameSettingsSchema = new mongoose.Schema({
  name: String,
  nbSeats: Number,
  isPrivate: Boolean,
  password: { type: String, required: false },
  isRanked: Boolean,
  isQueenRule: Boolean,
  is8Rule: Boolean,
  entryFee: Number,
});

const gameSchema = new mongoose.Schema({
  settings: gameSettingsSchema,
  players: [PlayerSchema.schema],
});

export const GameSchema = mongoose.models.Game || mongoose.model<Game>("Game", gameSchema);
