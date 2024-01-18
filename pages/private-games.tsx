import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar"; // Adjust path as needed
import { Game } from "@/types/game";
import { FaCoins } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
const PrivateGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const fetchPrivateGames = async () => {
    try {
      const response = await fetch("/api/game?isPrivate=true", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setGames(data);
        console.log(data);
      } else {
        // Handle errors or set error message
        console.error("Failed to fetch private games");
      }
    } catch (error: any) {
      console.error("Failed to fetch private games:", error);
    }
  };
  useEffect(() => {
    fetchPrivateGames();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Private Games</h1>
        <ul>
          {games.map((game) => (
            <li key={game._id.toString()} className=" mb-2">
              <Link href={`/game/${game._id}`} className="block p-4 mb-4 border border-gray-200 rounded shadow hover:shadow-md bg-white hover:bg-gray-100 text-blue-800">
                <div className="flex items-center space-x-4">
                  <div>
                    {" "}
                    {game.settings.name} · {game.players.length} / {game.settings.nbSeats} seats{" "}
                  </div>
                  <CiLock className="text-gray-800" />
                </div>
                <div className="flex text-gray-600">
                  {game.settings.entryFee}
                  <FaCoins className="text-yellow-600" />
                </div>
                {game.settings.isRanked ? "Ranked" : "Unranked"}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={fetchPrivateGames} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {/*Create a button to call fetchOpenGames*/}
          Refresh
        </button>
      </div>
    </div>
  );
};

export default PrivateGames;
