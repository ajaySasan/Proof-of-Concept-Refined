'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../app/App.scss"

interface OperatorProps {
  backBtn: () => void;
  nextBtn: () => void;
  staffName: string;
  operatorId: string;
  setOperatorId: (operatorId: string) => void; // Add setOperatorId prop
}

interface OperatorGetData {
  ID: number;
  Name: string;
}

const apiUrl: string = "https://apibeta.blackdice.io";
const operatorEndpoint: string = "/op/table?page=1&size=1000";
const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9wZXJhdG9yQGNhc2Etc3lzdGVtcy5jb20iLCJvcGVyYXRvcktleSI6MjIsIm9wZXJhdG9ySWQiOjIyLCJkYXNoYm9hcmQiOjAsImlhdCI6MTcxMTExMzE3N30.QQCPXOAQX3CAd7A4lnCGAOW_FoJIPBAYkLppmidixR8";
const header = {
  "auth-token": token,
};

export const Operator: React.FC<OperatorProps> = ({
  backBtn,
  nextBtn,
  staffName,
  operatorId: operatorIdProps,
  setOperatorId,
}) => {
  const [newOperator, setNewOperator] = useState<boolean>(false);
  const [operatorList, setOperatorList] = useState<OperatorGetData[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [operatorId, setLocalOperatorId] = useState<string>(operatorIdProps);

  const handleNewOperator = () => {
    setNewOperator(!newOperator);
  };

  const handleSelectedOperator = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const operatorId = event.target.value;
    setSelectedOperator(operatorId);
    setOperatorId(operatorId);
  };

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axios.get(`${apiUrl}${operatorEndpoint}`, {
          headers: header,
        });
        const data: OperatorGetData[] = response.data.data;
        setOperatorList(data);
      } catch (error) {
        console.log("Error fetching operator");
      }
    };
    fetchOperators();
  }, []);

  useEffect(() => {
    operatorIdProps && setSelectedOperator(operatorId);
    setLocalOperatorId(operatorIdProps);
  }, [operatorId]);

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Set up your Operator</h1>
      </div>

      <div className="common-container-body">
        <label>The operator name</label>
        <p>
          Please select your operator's name. Once chosen, we will add data to
          illustrate the functionality and interactivity of our UI and software.
        </p>
        <input type="text" placeholder="search operators" />
        <select
          id="selectOption"
          value={selectedOperator}
          onChange={handleSelectedOperator}
        >
          <option value="" disabled selected hidden>
            OPERATOR SELECTION
          </option>
          {operatorList.map((operator) => (
            <option key={operator.ID} value={operator.ID}>
              {operator.Name}
            </option>
          ))}
        </select>
        <p>If you do not have an existing operator, please sign up below.</p>
        <button onClick={handleNewOperator}>NEW OPERATOR?</button>
        {newOperator && (
          <>
            <input type="text" placeholder="domain" />
            <p>Please enter your domain name.</p>
            <button>CREATE OPERATOR</button>
          </>
        )}
      </div>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
