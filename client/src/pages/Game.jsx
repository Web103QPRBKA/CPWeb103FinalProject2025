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
      <div className="row">
        <div className="col s9">
          <div className="puzzle">PUZZLE GOES HERE</div>
        </div>
        <div className="col s3">
          <div className="hints">
            <ul className="collection with-header">
              <li className="collection-header">
                <h4>Hints</h4>
              </li>
              <li className="collection-item">Alvin</li>
              <li className="collection-item">Alvin</li>
              <li className="collection-item">Alvin</li>
              <li className="collection-item">Alvin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
