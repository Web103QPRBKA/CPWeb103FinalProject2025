import React from "react";

const Theme = ({
  themename,
  emoji,
  description,
  setWelcomeMessage,
  setBackgroundColor
}) => {

  const handleWelcomeClick = () => {
    setWelcomeMessage(`${emoji}  ${description}`);
  };
  return (
    <div className="Theme">
      <button
        className="theme-button"
        onClick={handleWelcomeClick}
      >
        <span className="theme-emoji">{emoji}</span>
        {themename}
      </button>
    </div>
  );
};

export default Theme;
