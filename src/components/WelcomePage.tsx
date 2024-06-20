"use client";

import "./welcome-page.scss";
import Image from "next/image";

interface WelcomePageProps {
  nextBtn: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ nextBtn }) => {
  return (
    <div className="welcome-page">
      <Image
        src="/BlackDiceCube.png"
        alt="Black Dice Logo"
        className="b-d-cube"
        width={100}
        height={120}
      />
      <div className="welcome-section">
        <i className="bi bi-door-open" id="door" />
        <h1 className="welcome">WELCOME</h1>
        <i className="bi bi-door-open" id="door" />
      </div>
      <h2 className="welcomeBio" id="to-the">
        TO THE
      </h2>
      <div className="demo-suite">
        <div className="demo-section">
          <i className="bi bi-lightning-charge" id="lightning" />
          <h1 className="welcomeBio">DEMO SUITE</h1>
          <i className="bi bi-lightning-charge" id="lightning" />
        </div>
      </div>
      <button onClick={nextBtn} id="beginBtn">
        <i className="bi bi-pen" />
        BEGIN
        <i className="bi bi-pen" />
      </button>
      <h2 className="welcomeBio Bio" id="description">
        Welcome to BlackDice Cyber&apos;s Demo Suite—a versatile environment for
        developing proof of concept for our software.
      </h2>
    </div>
  );
};
