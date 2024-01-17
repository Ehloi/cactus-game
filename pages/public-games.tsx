import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar"; // Adjust path as needed
import { Game } from "@/types/game";

const PublicGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Fetch open games from the API
    const fetchOpenGames = async () => {
      const response = await fetch("/api/game?isPrivate=false");
      if (response.ok) {
        const data = await response.json();
        setGames(data);
        console.log(response.json());
      } else {
        // Handle errors or set error message
        console.error("Failed to fetch open games");
      }
    };
    fetchOpenGames();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Open Games</h1>
        <ul>
          {games.map((game) => (
            <li key={game._id} className="mb-2">
              <Link href={`/game/${game._id}`}>
                <a className="text-blue-600 hover:text-blue-800">
                  {game.players.length} / {game.settings.nbSeats} seats
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicGames;
