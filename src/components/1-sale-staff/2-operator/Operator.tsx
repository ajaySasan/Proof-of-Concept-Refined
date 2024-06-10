"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../app/App.scss";

interface OperatorProps {
  backBtn: () => void;
  nextBtn: () => void;
  operatorId: string;
  setOperatorId: (operatorId: string) => void;
  selectedSubdomain: string;
  setSelectedSubdomain: (subdomain: string) => void;
  apiURL: string;
  token: string;
}

interface OperatorGetData {
  ID: number;
  Name: string;
  Domain: string;
}

const operatorEndpoint: string = "/op/table?page=1&size=1000";

export const Operator: React.FC<OperatorProps> = ({
  backBtn,
  nextBtn,
  operatorId: operatorIdProps,
  setOperatorId,
  selectedSubdomain: selectedSubdomainProps,
  setSelectedSubdomain,
  apiURL,
  token,
}) => {
  const header = {
    "auth-token": token,
  };

  useEffect(() => {}, [apiURL, token, header]);

  const [newOperator, setNewOperator] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [operatorList, setOperatorList] = useState<OperatorGetData[]>([]);
  const [operatorId, setLocalOperatorId] = useState<string>(operatorIdProps);
  const [selectedOperator, setSelectedOperator] = useState<string>(
    selectedSubdomainProps
  );
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
      setSelectedSubdomain(selectedOperator.Domain);
      setOperatorId(operatorId);
    }
  };

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axios.get(`${apiURL}${operatorEndpoint}`, {
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

  const handleCreateNewOperator = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOperatorName = formData.get("name") as string;
    const newOperatorSubdomain = formData.get("subdomain") as string;
    const operatorData = {
      name: newOperatorName,
      domain: `${newOperatorSubdomain}.blackdice.io`,
      subdomain: newOperatorSubdomain,
    };
    try {
      const response = await axios.post(
        `${apiURL}/v2/op/demo-suite/operators`,
        operatorData,
        {
          headers: header,
        }
      );
      console.log(response.data);
      setShowNewOperator(false);
      setNewOperator(false);
      setOperatorId(newOperatorName);
      setSelectedOperator(newOperatorName);
      setSelectedSubdomain(newOperatorSubdomain);
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Set up your Operator</h1>
      </div>

      <div className="common-container-body">
        {showNewOperator ? (
          <form
            className="form-submit"
            onSubmit={handleCreateNewOperator}
            id="new-operator"
          >
            <label>Please enter the name of your Organization.</label>
            <input type="text" name="name" placeholder="name" />
            <label>Please create a subdomain</label>
            <input
              type="text"
              name="subdomain"
              placeholder="e.g 'beta' / 'local' / 'ercku'"
            />
            <button type="submit">CREATE OPERATOR</button>
          </form>
        ) : (
          <>
            <label>The operator name</label>
            <p>
              Please select your operator's name. Once chosen, we will add data
              to illustrate the functionality and interactivity of our UI and
              software.
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
            <p id="newOperatorText">
              If you do not have an existing operator, please sign up below.
            </p>
            <button onClick={handleNewOperator} id="newOperatorBtn">
              NEW OPERATOR?
            </button>
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
