"use client";

import "./taskbar.scss";


interface TaskbarProps {
  homepage: (page: number) => void;
  sales: () => void;
}
export const Taskbar: React.FC<TaskbarProps> = ({ homepage, sales }) => {

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
        <h3 onClick={sales} id="sales-tab">Sales</h3>
      </div>
    </div>
  );
};
