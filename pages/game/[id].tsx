import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Game } from "@/types/game";
const GamePage = () => {
  const router = useRouter();
  const { id } = router.query; // Game ID from URL
  const [game, setGame] = useState<Game>();
  const fetchGameDetails = async () => {
    if (id) {
      const response = await fetch(`/api/game?id=${id}`);
      if (response.ok) {
        const gameData = await response.json();
        setGame(gameData);
      } else {
        // Handle error
      }
    }
  };
  useEffect(() => {
    // Fetch the game details from the API

    fetchGameDetails();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <div>
      <h1>{game.settings.name}</h1>
      {/* Render other game details here */}
      <button onClick={fetchGameDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Refresh
      </button>
    </div>
  );
};

export default GamePage;
