import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

const Games = () => {


	const [games, setGames] = useState([]);

	useEffect(() => {
		const fetchGames = async () => {
			const response = await fetch("api/games");
			const data = await response.json();
			setGames(data);
		};

		fetchGames();
	}, []);

	return (
		<div >
			{games.map((game, index) => (
					<GameCard
						key={index}
						id={game.id}
						title={game.title}
						reference={game.referenceauthor}
						description={game.description}
						difficulty={game.difficulty}
					/>
			))}
		</div>
	);
};

export default Games;
