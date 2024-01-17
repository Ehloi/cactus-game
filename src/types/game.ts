import { Player } from "./player";
export interface GameType {
  _id: string;
  settings: GameSettings;
  players: Player[];
}

export interface GameSettings {
  name: string;
  nbSeats: number;
  isPrivate: boolean;
  isRanked: boolean;
  isQueenRule: boolean;
  is8Rule: boolean;
  entryFee: number;
}
