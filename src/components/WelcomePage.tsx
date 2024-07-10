"use client";

import { useState } from "react";
import "./welcome-page.scss";
import Image from "next/image";
import { Vortex } from "./ui/vortex";
import toast from "react-hot-toast";

interface WelcomePageProps {
  nextBtn: () => void;
  apiEnviroment: (apiEnviromentValue: string) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  nextBtn,
  apiEnviroment,
}) => {
  const [enviroment, setEnviroment] = useState<string>("");

  const handleEnviromentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newEnviroment = event.target.value;
    setEnviroment(newEnviroment);
    apiEnviroment(newEnviroment);
  };

  const handleImageClick = () => {
    window.location.reload();
  };

  // const isButtonDisabled = !enviroment;
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const handleSelectEnviroment = () => {
  if (!enviroment) {
    toast.error("Please select an enviroment")
    setIsButtonDisabled(false)
  } else {
    setIsButtonDisabled(true)
  }

  }

  return (
    <div className="welcome-page">
      <Image
        src="/proof-of-concept-suite/BlackDiceCube.png"
        alt="Black Dice Logo"
        className="b-d-cube"
        width={80}
        height={100}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
      <div className="welcome-section">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="#7b92a3"
          className="bi bi-door-open"
          id="door"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
          <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
        </svg>
        <h1 className="welcome">WELCOME</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="#7b92a3"
          className="bi bi-door-open svg-flip"
          id="door"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
          <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
        </svg>
      </div>
      <h2 className="welcomeBio" id="to-the">
        TO THE
      </h2>
      <div className="demo-suite">
        <div className="demo-section">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#7b92a3"
            className="bi bi-lightning-charge svg-flip"
            id="lightning"
            viewBox="0 0 16 16"
          >
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
          </svg>
          <h1 className="welcomeBio">DEMO SUITE</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#7b92a3"
            className="bi bi-lightning-charge "
            id="lightning"
            viewBox="0 0 16 16"
          >
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
          </svg>
        </div>
      </div>
      <div className="enviroment">
        <select
          value={enviroment}
          onChange={handleEnviromentChange}
          className="customSelect"
          id="custSelect"
        >
          <option value="" disabled hidden>Enviroment ▼</option>
          <option value="dev">Development</option>
          <option value="pov">POV</option>
        </select>
      </div>
      <button onClick={nextBtn} id="beginBtn" disabled={isButtonDisabled}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#7b92a3"
          className="bi bi-pen "
          id="pen"
          viewBox="0 0 16 16"
        >
          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
        </svg>
        BEGIN
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#7b92a3"
          id="pen"
          className="bi bi-pen svg-flip"
          viewBox="0 0 16 16"
        >
          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
        </svg>
      </button>
      <h2 className="welcomeBio Bio" id="description">
        Welcome to BlackDice Cyber&apos;s Demo Suite—a versatile environment for
        developing proof of concept for our software.
      </h2>
    </div>
  );
};
