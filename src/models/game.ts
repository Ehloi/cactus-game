import mongoose from "mongoose";
import { PlayerSchema } from "./player";

const gameSettingsSchema = new mongoose.Schema({
  name: String,
  nbSeats: Number,
  isPrivate: Boolean,
  isRanked: Boolean,
  isQueenRule: Boolean,
  is8Rule: Boolean,
  entryFee: Number,
});

const gameSchema = new mongoose.Schema({
  settings: gameSettingsSchema,
  players: [PlayerSchema],
});

export const GameSchema = mongoose.model("Game", gameSchema);
