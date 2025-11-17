import { Link } from "react-router-dom";


const Welcome = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h2>Welcome, thinker!</h2>
          <p>
            Your mission: unravel the clues, outsmart the puzzles, and rise to
            the top.
          </p>
          <p>Let’s see what your brain can do today.</p>
        </div>
        <Link to="/games">
          <button className="waves-effect waves-light z-depth-3 btn-large amber">
            <i className="material-icons right">explore</i>Explore Games
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;