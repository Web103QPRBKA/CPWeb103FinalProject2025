
import Grid from "../components/Grid";


const Welcome = () => {
  return (
    <div>
      <div className="row title-grid-container amber">
        <div className="col s2">
          <Grid />
        </div>
        {/* <div className="game-title-container"> */}
        <div className="col s7">
          <h1>Logic puzzle</h1>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <h2>Welcome, thinker!</h2>
          <p>
            Your mission: Unravel the clues, outsmart the puzzles, and rise to
            the top.
          </p>
          <p>Let’s see what your brain can do today!</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;