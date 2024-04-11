'use client'

import { useState } from "react";
import "../../app/App.scss"

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

  const handleStaffName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const staffNameValue = event.target.value;
    staffName(staffNameValue);
    setStaffNameInput(staffNameValue);
  };

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Sales Staff Member</h1>
      </div>

      <div className="common-container-body">
        <label>What is your name?</label>
        <p>
          Please select your name as a member of the BlackDice Cyber sales team.
        </p>
        <input type="text" placeholder="search names"/>
        <select
          value={staffNameInput}
          onChange={handleStaffName}
          className="select-container"
        >
          <option value="" disabled selected hidden>
            NAME SELECTION
          </option>
          <option value="First Name">First Name</option>
          <option value="Second Name">Second Name</option>
          <option value="Third Name">Third Name</option>
        </select>
        <div className="select-arrow">
        </div>
      </div>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
