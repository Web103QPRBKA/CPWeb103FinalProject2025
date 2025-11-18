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
      <a
        className="waves-effect waves-light btn-small"
        onClick={handleWelcomeClick}
      >
        <i className="material-icons right">{emoji}</i>
        {themename}
      </a>
    </div>
  );
};

export default Theme;
