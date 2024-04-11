"use client";

import "./taskbar.scss";

export const Taskbar = () => {
  return (
    <div className="taskBar">
      <div className="logo">
        <img
          src="/BlackDiceText.png"
          alt="Black Dice Logo"
          className="blackDiceLogo"
          id="blackDiceText"
        />
        <img
          src="/BlackDiceCube.png"
          alt="Black Dice Logo"
          className="blackDiceLogo"
          id="blackDiceCube"
        />
      </div>
      <div className="links">
        <a href="https://retina-dev.blackdice.io/login" target="_blank">
          <h3>Retina</h3>
        </a>
        <a href="https://dev.blackdice.io/login" target="_blank">
          <h3>BlackDice</h3>
        </a>
      </div>
    </div>
  );
};
