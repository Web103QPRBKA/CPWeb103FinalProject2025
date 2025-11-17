import React from "react";
import { useState, useEffect } from "react";
import Themes from "../components/Themes";

const Game = () => {
    const [welcomeMessage, setWelcomeMessage] = useState("Enjoy to the Game.");

  return (
    <div className="container ">
      <div className="row">
        <h1>Welcome Thinker!</h1>
        <h1>{welcomeMessage}</h1>
        <div className="amber">
          <Themes setWelcomeMessage={setWelcomeMessage} />
        </div>
      </div>
      <div className="row">
        <div className="col s9">
          <div className="puzzle">PUZZLE GOES HERE</div>
        </div>
      </div>
    </div>
  );
};

export default Game;
