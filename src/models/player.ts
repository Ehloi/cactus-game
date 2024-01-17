import mongoose from "mongoose";
import { CardSchema } from "./card";
import { UserSchema } from "./user";

export const playerSchema = new mongoose.Schema({
  user: UserSchema,
  cards: [CardSchema],
  isReady: Boolean,
  isHost: Boolean,
  isTurn: Boolean,
  isWinner: Boolean,
  isDisconnected: Boolean,
});

export const PlayerSchema = mongoose.model("Player", playerSchema);
