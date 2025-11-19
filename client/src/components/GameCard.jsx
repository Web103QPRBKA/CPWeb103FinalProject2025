import React from "react";
import { Link } from "react-router-dom";
import icecream from "../assets/icecreams2.jpg";
import crown from "../assets/crowns2.png";
import building from "../assets/buildings2.jpg";
import "../css/GameCard.css";

const GameCard = ({ id, title, reference, description, author, difficulty }) => {
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
      <p>{author}</p>
      <p>{difficulty}</p>
    </div>
  );
};

export default GameCard;
