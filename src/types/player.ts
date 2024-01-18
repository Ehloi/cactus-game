import { Card } from "./card";
import { User } from "./user";

export interface Player {
  user: User;
  cards: Card[];
  isReady: boolean;
  isHost: boolean;
  isTurn: boolean;
  isWinner: boolean;
  isDisconnected: boolean;
}
