import { Types } from "mongoose";
import { Player } from "./player";
export interface Game {
  _id: Types.ObjectId;
  settings: GameSettings;
  players: Player[];
}

export interface GameSettings {
  name: string;
  nbSeats: number;
  isPrivate: boolean;
  password?: string;
  isRanked: boolean;
  isQueenRule: boolean;
  is8Rule: boolean;
  entryFee: number;
}
