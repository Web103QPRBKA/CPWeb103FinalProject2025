import { useState, useEffect } from "react";
import { useRoutes, Link } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Games from "./pages/Games";
import "./css/App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/games",
      element: <Games  />,
    },
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>
          <span>
            <i className="large material-icons">grid_on</i>
          </span>
          Logic Puzzle
        </h1>
        <nav >
          <Link to="/">
            <button className="headerBtn">Home</button>
          </Link>
        </nav>
      </div>
      <main className="main_content">{element}</main>
    </div>
  );
};

export default App;
