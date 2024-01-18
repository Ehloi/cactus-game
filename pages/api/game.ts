import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Game, GameSettings } from "@/types/game";
import { User } from "@/types/user";
import { Player } from "@/types/player";
import { Types } from "mongoose";

function isGameValid(game: GameSettings, user: User): { bool: boolean; errorMsg?: string } {
  if (game.nbSeats < 2 || game.nbSeats > 8) return { bool: false, errorMsg: "Number of seats must be between 2 and 8" };
  if (!game.name) return { bool: false, errorMsg: "You must provide a name for the game" };
  if (game.entryFee < 100) return { bool: false, errorMsg: "Entry fee must be at least 100 coins" };
  if (game.entryFee > 10000) return { bool: false, errorMsg: "Entry fee must be at most 10000 coins" };
  if (game.isPrivate && !game.password) return { bool: false, errorMsg: "You must provide a password for a private game" };
  if (user.coins < game.entryFee) return { bool: false, errorMsg: "You don't have enough coins to create this game" };
  return { bool: true };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized to game API" });
  }
  const { method } = req;
  const { isPrivate } = req.query;
  const { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      switch (isPrivate) {
        case "true":
          try {
            const privateGames = await db.collection<Game>("Game").find({ "settings.isPrivate": true }).toArray();
            res.status(200).json(privateGames);
          } catch (error) {
            res.status(500).json({ error: "Failed to fetch private games" });
          }
          break;
        case "false":
          try {
            const publicGames = await db.collection<Game>("Game").find({ "settings.isPrivate": false }).toArray();
            res.status(200).json(publicGames);
          } catch (error) {
            res.status(500).json({ error: "Failed to fetch public games" });
          }
          break;
      }
      break;
    case "POST":
      try {
        const gameSettings: GameSettings = req.body; // Get game data from request body
        const user = await db.collection<User>("User").findOne({ email: session.user.email ?? "" });
        if (!user) return res.status(401).json({ error: "Couldn't find user, unauthorized to create game" });
        const isGameValidResult = isGameValid(gameSettings, user);
        if (!isGameValidResult.bool) return res.status(409).json({ error: isGameValidResult.errorMsg });
        const player1: Player = {
          user,
          cards: [],
          isReady: false,
          isHost: false,
          isTurn: false,
          isWinner: false,
          isDisconnected: false,
        };
        const game: Game = {
          _id: new Types.ObjectId(),
          settings: gameSettings,
          players: [player1],
        };
        const result = await db.collection<Game>("Game").insertOne(game);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to create game" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
