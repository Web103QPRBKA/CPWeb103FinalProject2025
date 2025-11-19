import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("api/games");
        const data = await response.json();
        if (!data) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
        data.forEach((d) => {
          console.log(d.title);
        });
        setGames(data);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };

		fetchGames();
	}, []);

  return (
      <div className="games-container">
        {games.map((game, index) => (
          <GameCard
            key={index}
            id={game.id}
            title={game.title}
            reference={game.reference}
            author={game.author}
            description={game.description}
            difficulty={game.difficulty}
          />
        ))}
      </div>

  );
};

export default Games;
