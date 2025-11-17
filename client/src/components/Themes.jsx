import React from "react";
import { useState, useEffect } from "react";
import Theme from "./Theme";
import "../css/theme.css";

const Themes = ({ setWelcomeMessage }) => {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        // const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
        // const response = await fetch(`${baseUrl}/api/themes`);
        // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/themes`);
        const response = await fetch("http://localhost:3001/api/themes");
        const data = await response.json();
        if (!data) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
        data.forEach((d) => {
          console.log(d.emoji, d.themename);
        });
        setThemes(data);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };

    fetchThemes();
  }, []);

  return (
    <div>
      <div className="container">
        <ul className="themes-container">
          {themes.map((theme, index) => (
            <Theme
              key={index}
              id={theme.id}
              themename={theme.themename}
              description={theme.description}
              emoji={theme.emoji}
              setWelcomeMessage={setWelcomeMessage}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Themes;
