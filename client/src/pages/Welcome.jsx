import Grid from "../components/Grid";
import Games from "./Games";
import "../css/Welcome.css";


const Welcome = () => {
  return (
    <div>
      <div className="row title-grid-container amber">
        <div >
          <Grid />
        </div>
        {/* <div className="game-title-container"> */}
        <div>
          <h1 id="logic-puzzle-title" className="title-container">
            Logic Puzzle
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <h2>Welcome, Thinker!</h2>
          <p>
            Your mission: Unravel the clues, outsmart the puzzles, and rise to
            the top.
          </p>
          <p>Let’s see what your brain can do today!</p>
        </div>
      </div>
      <div className="games-container">
        <Games />
      </div>
    </div>
  );
};

export default Welcome;