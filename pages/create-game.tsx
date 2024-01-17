import React, { useState } from "react";
import NavBar from "../components/NavBar"; // Import your NavBar component
import { GameSettings } from "@/types/game";

const CreateGame = () => {
  const initialGameSettings: GameSettings = {
    name: "",
    nbSeats: 2,
    isPrivate: false,
    isRanked: false,
    isQueenRule: false,
    is8Rule: false,
    entryFee: 100,
  };
  const [gameSettings, setGameSettings] = useState(initialGameSettings);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit game settings
    console.log(gameSettings);
    // Redirect to game or display success message
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Game</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Game Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={gameSettings.name}
              onChange={handleInputChange}
              placeholder="Enter Game Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nbSeats" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Players: {gameSettings.nbSeats}
            </label>
            <input
              type="range"
              id="nbSeats"
              name="nbSeats"
              min="2"
              max="8"
              value={gameSettings.nbSeats}
              onChange={handleInputChange}
              className="cursor-pointer w-full h-2 bg-gray-200 rounded-lg appearance-none"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" name="isPrivate" checked={gameSettings.isPrivate} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-gray-600" />
              <span className="ml-2 text-gray-700">Private Game</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" name="isRanked" checked={gameSettings.isRanked} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-gray-600" />
              <span className="ml-2 text-gray-700">Ranked Game</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" name="isQueenRule" checked={gameSettings.isQueenRule} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-gray-600" />
              <span className="ml-2 text-gray-700">Queen Rule</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" name="is8Rule" checked={gameSettings.is8Rule} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-gray-600" />
              <span className="ml-2 text-gray-700">8 Rule</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entryFee">
              Entry Fee
            </label>
            <input
              type="number"
              name="entryFee"
              id="entryFee"
              value={gameSettings.entryFee}
              onChange={handleInputChange}
              placeholder="Enter Entry Fee"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Launch Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
