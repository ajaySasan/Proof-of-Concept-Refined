"use client";

import { useEffect, useState } from "react";
import "../../../../../app/App.scss";
import axios from "axios";

interface GenerateRandomAccountsProps {
  nextBtn: () => void;
  backBtn: () => void;
  operatorId: string;
  operatorDomain: string;
  apiURL: string;
  token: string;
}

interface Register {
  email: string;
  pass: string;
  serialNumber: string;
  referer: string;
}

const accountEndpoint = "/pa/auth/register";

export const GenerateRandomAccounts: React.FC<GenerateRandomAccountsProps> = ({
  nextBtn,
  backBtn,
  operatorId,
  operatorDomain,
  apiURL,
  token,
}) => {
  const header = {
    "auth-token": token,
  };

  useEffect(() => {}, [apiURL, token, operatorDomain, header]);

  const [numOfAccounts, setNumOfAccounts] = useState<number>(0);

  const handleNumOfAccounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const accountValue = parseInt(e.target.value);
    setNumOfAccounts(accountValue);
  };

  const firstNames: string[] = [
    "Oliver",
    "Amelia",
    "Harry",
    "Isla",
    "Jack",
    "Ava",
    "George",
    "Mia",
    "Noah",
    "Sophia",
    "Leo",
    "Emily",
    "Jacob",
    "Grace",
    "Charlie",
    "Poppy",
    "Freddie",
    "Isabella",
    "Alfie",
    "Aria",
    "Henry",
    "Ella",
    "William",
    "Lily",
    "Thomas",
    "Harper",
    "James",
    "Evie",
    "Joshua",
    "Millie",
  ];

  // Surnames

  const lastNames: string[] = [
    "Smith",
    "Jones",
    "Williams",
    "Brown",
    "Taylor",
    "Davies",
    "Evans",
    "Wilson",
    "Thomas",
    "Johnson",
    "Roberts",
    "Walker",
    "Robinson",
    "Clark",
    "Wright",
    "Mitchell",
    "Lewis",
    "Jackson",
    "Harris",
    "King",
    "Green",
    "Baker",
    "Turner",
    "White",
    "Edwards",
    "Collins",
    "Hill",
    "Clarke",
    "Morris",
    "Thompson",
  ];

  // Creates a random email address

  const emailAddress = () => {
    const randomFirstName: number = Math.floor(
      Math.random() * firstNames.length
    );
    const randomLastName: number = Math.floor(Math.random() * lastNames.length);

    const firstNameResult: string = firstNames[randomFirstName];
    const lastNameResult: string = lastNames[randomLastName];

    const emailSyntax: string = Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      () => {
        const chars = "0123456789!-_";
        return chars[Math.floor(Math.random() * chars.length)];
      }
    ).join("");

    const emailHook: string[] = [
      "@demo.net",
      "@demo.co.uk",
      "@demo.com",
      "@demo.uk",
      "@demo.ai",
    ];
    const randomEmailHook: number = Math.floor(
      Math.random() * emailHook.length
    );
    const emailResult = emailHook[randomEmailHook];

    const emailFinal: string = `${firstNameResult}${lastNameResult}${emailSyntax}${emailResult}`;

    return emailFinal;
  };

  // Password

  const generatePassword = (): string => {
    const passChars: string =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!£$%&*-_=+@#?";
    const passwordLength: number = Math.floor(Math.random() * (16 - 8 + 1)) + 8;
    return Array.from(
      { length: passwordLength },
      () => passChars[Math.floor(Math.random() * passChars.length)]
    ).join("");
  };

  // Serial Number

  const serialSet: Set<string> = new Set();

  const serialNumber = (): string => {
    const characters: string = "123456789ABCDEF";
    const segments: number = 6;
    const segmentLength: number = 2;

    const generateSegment = (): string => {
      let randomSegment: string = "";
      for (let i = 0; i < segmentLength; i++) {
        const segmentIndex: number = Math.floor(
          Math.random() * characters.length
        );
        randomSegment += characters[segmentIndex];
      }
      return randomSegment;
    };

    const generateUniqueSerial = (): string => {
      let uniqueSerial: string = "";
      for (let i = 0; i < segments; i++) {
        uniqueSerial += (i > 0 ? ":" : "") + generateSegment();
      }
      return uniqueSerial;
    };

    let serialUnique: string = generateUniqueSerial();
    while (serialSet.has(serialUnique)) {
      serialUnique = generateUniqueSerial();
    }
    serialSet.add(serialUnique);
    return serialUnique;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (let i = 0; i < numOfAccounts; i++) {
      const randomUserData: Register = {
        email: emailAddress(),
        pass: generatePassword(),
        serialNumber: serialNumber(),
        referer: operatorDomain,
      };

      console.log(randomUserData);

      try {
        const response = await axios.post(
          apiURL + accountEndpoint,
          randomUserData
        );
        console.log("success");
      } catch (error) {
        console.log("error");
      }
    }
  };

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Generate Accounts</h1>
      </div>

      <form className="common-container-body" onSubmit={handleSubmit}>
        <label>How many dummy accounts for your operator?</label>
        <input
          type="text"
          placeholder="accounts"
          value={numOfAccounts}
          onChange={handleNumOfAccounts}
        />
        <button type="submit">GENERATE ACCOUNTS</button>
      </form>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
