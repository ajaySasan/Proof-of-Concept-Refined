"use client";

import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "../../app/App.scss";

interface SalesStaffProps {
  backBtn: () => void;
  nextBtn: () => void;
  staffName: (staffNameValue: string) => any;
}

export const SalesStaff: React.FC<SalesStaffProps> = ({
  backBtn,
  nextBtn,
  staffName,
}) => {
  const [staffNameInput, setStaffNameInput] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const names: { label: string; value: string }[] = [
    { label: "Jon Snow", value: "Jon Snow" },
    { label: "Dany Targaryen", value: "Dany Targaryen" },
    { label: "Katerina Petrova", value: "Katerina Petrova" },
    { label: "Niklaus Mikaelson", value: "Niklaus Mikaelson" },
    { label: "Elijah Mikaelson", value: "Elijah Mikaelson" },
  ];

  const handleStaffName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const staffNameValue = event.target.value;
    staffName(staffNameValue);
    setStaffNameInput(staffNameValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const staffNameValue = event.target.value;
    setInputValue(staffNameValue);
  };

  const handleSelectValue = (value: string) => {
    setStaffNameInput(value);
    setInputValue("");
    staffName(value);
  };

  const filteredNames = names.filter((name) =>
    name.label.toLowerCase().includes(inputValue.toLowerCase())
  );

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
          value={staffNameInput}
          onChange={handleStaffName}
        >
          <option value="" disabled hidden>
            NAME SELECTION
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
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
