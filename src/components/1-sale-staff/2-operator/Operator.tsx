"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../app/App.scss";

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

interface SalesRecord {
  staffName: string;
  operatorId: string;
  date: string;
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
  const [inputValue, setInputValue] = useState<string>("");
  const [operatorList, setOperatorList] = useState<OperatorGetData[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [operatorId, setLocalOperatorId] = useState<string>(operatorIdProps);

  const formatDate = new Date();
  const date = formatDate.toLocaleString();

  useEffect(() => {
    if (staffName && selectedOperator) {
      const existingRecords = JSON.parse(
        localStorage.getItem("salesRecord") || "[]"
      ) as SalesRecord[];
      const newRecord: SalesRecord = {
        staffName,
        operatorId: selectedOperator,
        date,
      };
      const updatedRecords = [...existingRecords, newRecord];
      localStorage.setItem("salesRecord", JSON.stringify(updatedRecords));
    }
  }, [staffName, selectedOperator, date]);

  const handleNewOperator = () => {
    setNewOperator(!newOperator);
  };

  const handleSelectedOperator = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const operatorId = event.target.value;
    const selectedOperator = operatorList.find(
      (operator) => operator.ID === Number(operatorId)
    );
    if (selectedOperator) {
      setSelectedOperator(selectedOperator.Name);
      setOperatorId(operatorId);
    }
  };

  // bug here is the select option changes default and the operatorid returns on value when page changed and returned to

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const operatorValue = event.target.value;
    setInputValue(operatorValue);
  };

  const handleSelectValue = (value: string) => {
    setSelectedOperator(value);
    setInputValue("");
    setOperatorId(value);
  };

  const filteredOperators = operatorList.filter((op) =>
    op.Name.toLowerCase().includes(inputValue.toLowerCase())
  );

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

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type here..."
        />

        {inputValue && (
          <div className="list-all">
            {filteredOperators.map((operator) => (
              <p
                className="list"
                key={operator.ID}
                onClick={() => handleSelectValue(operator.Name)}
              >
                {operator.Name}
              </p>
            ))}
          </div>
        )}

        {selectedOperator && <p>Your operator is: {selectedOperator}</p>}

        <select
          id="selectOption"
          value={selectedOperator}
          onChange={handleSelectedOperator}
        >
          <option value="" disabled hidden>
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
