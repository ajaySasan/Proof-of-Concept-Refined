"use client";

import "./taskbar.scss";
import { WelcomePage } from "./WelcomePage";

interface TaskbarProps {
  homepage: (page: number) => void;
}
export const Taskbar: React.FC<TaskbarProps> = ({ homepage }) => {
  return (
    <div className="taskBar">
      <div className="logo">
        <img
          src="/BlackDiceText.png"
          alt="Black Dice Logo"
          className="blackDiceLogo"
          id="blackDiceText"
          onClick={() => homepage(0)}
          style={{ cursor: "pointer" }}
        />
        <img
          src="/BlackDiceCube.png"
          alt="Black Dice Logo"
          className="blackDiceLogo"
          id="blackDiceCube"
          onClick={() => homepage(0)}
          style={{ cursor: "pointer" }}
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
