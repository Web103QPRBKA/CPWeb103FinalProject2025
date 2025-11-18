import React from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router";
import Themes from "../components/Themes";
import "../css/Game.css";

const Game = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title, description, images } = location.state || {};

  const [welcomeMessage, setWelcomeMessage] = useState("Enjoy to the Game.");

  return (
    <div className="container">
      <div className="image-container">
        <img className="activator" src={images[id - 1]} alt={title} />
      </div>
      <div className="row">
        <h1>{`Welcome to ${title}!`}</h1>
        <h1>{welcomeMessage}</h1>
        <div className="amber">
          <Themes setWelcomeMessage={setWelcomeMessage} />
        </div>
      </div>
    </div>
  );
};

export default Game;
