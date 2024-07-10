"use client";

import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "../../app/App.scss";

interface SalesStaffProps {
  backBtn: () => void;
  nextBtn: () => void;
  skipBtn?: () => void;
  staffName: (staffNameValue: string) => any;
}

export const SalesStaff: React.FC<SalesStaffProps> = ({
  backBtn,
  nextBtn,
  skipBtn,
  staffName,
}) => {
  const [staffNameInput, setStaffNameInput] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const names: { label: string; value: string }[] = [
    { label: "Campbell Ferrier", value: "Campbell Ferrier" },
    { label: "Ajay Sasan", value: "Ajay Sasan" },
  ];

  const handleStaffName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const staffNameValue = event.target.value;
    staffName(staffNameValue);
    setStaffNameInput(staffNameValue);
    setInputValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const staffNameValue = event.target.value;
    setInputValue(staffNameValue);
    setStaffNameInput("");
  };

  const handleSelectValue = (value: string) => {
    setStaffNameInput(value);
    setInputValue("");
    staffName(value);
  };

  const filteredNames = names.filter((name) =>
    name.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const isButtonDisabled = !staffNameInput && inputValue.trim() === "";

  const handleBackButton = () => {
    window.location.reload();
  };

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Sales Staff Member</h1>
      </div>

      <form className="common-container-body">
        <label>What is your name?</label>
        <p>
          Please select your name as a member of the BlackDice Cyber sales team.
        </p>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type here..."
        />
        {inputValue && (
          <div className="list-all">
            {filteredNames.map((name, index) => (
              <p
                className="list"
                key={index}
                onClick={() => handleSelectValue(name.value)}
              >
                {name.label}
              </p>
            ))}
          </div>
        )}

        <select
          id="selectOption"
          className="customSelect"
          value={staffNameInput}
          onChange={handleStaffName}
        >
          <option value="" disabled hidden>
            NAME SELECTION ▼
          </option>
          {names.map((name) => (
            <option key={name.value} value={name.value}>
              {name.label}
            </option>
          ))}
        </select>

        {staffNameInput && <p>Your name is: {staffNameInput}</p>}
      </form>

      <div className="common-container-footer">
        <button onClick={handleBackButton}>BACK</button>
        <button onClick={nextBtn} type="submit" disabled={isButtonDisabled}>
          NEXT
        </button>
        <button onClick={skipBtn}>SKIP</button>
      </div>
    </div>
  );
};
