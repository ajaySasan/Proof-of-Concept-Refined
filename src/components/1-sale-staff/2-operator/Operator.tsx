"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../app/App.scss";

interface OperatorProps {
  backBtn: () => void;
  nextBtn: () => void;
  operatorId: string;
  setOperatorId: (operatorId: string) => void; // Add setOperatorId prop
}

interface OperatorGetData {
  ID: number;
  Name: string;
  Domain: string;
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
  operatorId: operatorIdProps,
  setOperatorId,
}) => {
  const [newOperator, setNewOperator] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [operatorList, setOperatorList] = useState<OperatorGetData[]>([]);
  const [operatorId, setLocalOperatorId] = useState<string>(operatorIdProps);
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [selectedSubdomain, setSelectedSubdomain] = useState<string>(""); // Add subdomain state
  const [showNewOperator, setShowNewOperator] = useState<boolean>(false);

  const handleNewOperator = () => {
    setNewOperator(!newOperator);
    setShowNewOperator(!showNewOperator);
  };

  const handleSubmitNewOperator = () => {
    setShowNewOperator(!showNewOperator);
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
      setSelectedSubdomain(selectedOperator.Domain); // Update selectedSubdomain state
      setOperatorId(operatorId);
    }
  };

  console.log(selectedSubdomain);

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

  console.log("Selected Operator Subdomain:", selectedSubdomain); // Log selected operator Subdomain

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
        {showNewOperator && (
          <>
            <form className="form-submit" onSubmit={handleSubmitNewOperator}>
              <label>Please enter the name of your Organization.</label>
              <input type="text" placeholder="name" />
              <label>Please create a subdomain</label>
              <input
                type="text"
                placeholder="e.g 'beta' / 'local' / 'mercku' "
              />
              <button type="submit">CREATE OPERATOR</button>
            </form>
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
