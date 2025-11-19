import React from "react";
import { Link } from "react-router-dom";
import icecream from "../assets/icecreams2.jpg";
import crown from "../assets/crowns2.png";
import building from "../assets/buildings2.jpg";
import "../css/GameCard.css";

const GameCard = ({ id, title, reference, description, difficulty }) => {
  const images = [icecream, crown, building];
  return (
    <div className="card">
      <img
        className="card-image"
        src={images[id - 1]}
        alt={`${images[id - 1]}`}
      ></img>
      <h6 className="card-title">{title}</h6>
      <p className="card-text">{description}</p>
      <p>{reference}</p>
      <p>{difficulty}</p>
    </div>
    // <div className="GameCard">
    //
    //   <div className="card">
    //     <div
    //       className="card-image waves-effect waves-block waves-light"
    //       style={{ width: 800, height: 300 }}
    //     >
    //       <img className="activator" src={images[id - 1]} alt={title} />
    //     </div>
    //     <div className="card-content">
    //       <span className="card-title activator grey-text text-darken-4">
    //         Learn More
    //         <i className="material-icons right">more_vert</i>
    //       </span>
    //       <p>
    //       </p>
    //     </div>
    //     <div className="card-reveal">
    //       <span className="card-title grey-text text-darken-4">
    //         {title}
    //         <i className="material-icons right">close</i>
    //       </span>
    //       <p>{description}</p>
    //       <p>Reference: {reference}</p>
    //       <p>Difficulty: {difficulty}.</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default GameCard;
