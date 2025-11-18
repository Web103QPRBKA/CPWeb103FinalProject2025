import React from "react";
import { Link } from "react-router-dom";
import icecream2 from "../assets/icecream2.jpeg";
import crown2 from "../assets/crown2.png";

const GameCard = ({ id, title, reference, description, difficulty }) => {
  const images = [icecream2, crown2];
  return (
    <div className="GameCard">
      <h2>{title}</h2>
      <div className="card">
        <div
          className="card-image waves-effect waves-block waves-light"
          style={{ width: 800, height: 300 }}
        >
          <img className="activator" src={images[id - 1]} alt={title} />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            Learn More
            <i className="material-icons right">more_vert</i>
          </span>
          <p>
            <Link to={`/games/${id}`} state={{ title: title, description: description, images:images }}>
              <button className="waves-effect waves-light z-depth-3 btn-large amber">
                <i className="material-icons right">arrow_forward</i>Play Me!
              </button>
            </Link>
          </p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {title}
            <i className="material-icons right">close</i>
          </span>
          <p>{description}</p>
          <p>Reference: {reference}</p>
          <p>Difficulty: {difficulty}.</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
