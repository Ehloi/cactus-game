import { Card } from "./card";
import { User } from "./user";

export interface PlayerType {
  user: User;
  cards: Card[];
  isReady: boolean;
  isHost: boolean;
  isTurn: boolean;
  isWinner: boolean;
  isDisconnected: boolean;
}
