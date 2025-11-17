import React from "react";

const Theme = ({themename, emoji, description, setWelcomeMessage }) => {
  const handleClick = () => {
    setWelcomeMessage(`${emoji}  ${description}`);
  }
  return (
    <div className="Theme">
      <a class="waves-effect waves-light btn-small" onClick={handleClick}>
        {/* <i class="material-icons right">{emoji}</i> */}
        {themename}
      </a>
    </div>
  );
};

export default Theme;
