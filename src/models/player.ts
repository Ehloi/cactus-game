import mongoose from "mongoose";
import { CardSchema } from "./card";
import { UserSchema } from "./user";
import { Player } from "@/types/player";

export const playerSchema = new mongoose.Schema({
  user: UserSchema.schema,
  cards: [
    {
      type: CardSchema.schema,
      required: true,
    },
  ],
  isReady: Boolean,
  isHost: Boolean,
  isTurn: Boolean,
  isWinner: Boolean,
  isDisconnected: Boolean,
});

export const PlayerSchema = mongoose.models.Player || mongoose.model<Player>("Player", playerSchema);
