import Grid from "../components/Grid";
import Games from "./Games";
import "../css/Welcome.css";

const Welcome = () => {
	return (
		<div>
			<div className="title-section">
				<div>
					<Grid />
				</div>
				<h1 id="logic-puzzle-title" className="title-container">
					Logic Puzzle
				</h1>
			</div>

			<div className="welcome-content">
				<div className="welcome-text">
					<h2>Welcome, Thinker!</h2>
					<p>
						Your mission: Unravel the clues, outsmart the puzzles, and rise to
						the top.
						<br/>
						Let's see what your brain can do today!
					</p>
				</div>
			</div>
			<div className="games-container">
				<Games />
			</div>
		</div>
	);
};

export default Welcome;