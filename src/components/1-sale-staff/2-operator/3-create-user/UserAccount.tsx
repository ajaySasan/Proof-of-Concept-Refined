import { useEffect, useState } from "react";
import "../../../../app/App.scss";
import axios from "axios";

// Email Resend
import { EmailTemplate } from "../../../password-email/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import toast from "react-hot-toast";
// import Campbell from "@/components/sales-data/SalesRecords";

interface UserAccountProps {
  backBtn: () => void;
  nextBtn: () => void;
  operatorId: string;
  staffName: string;
  operatorDomain: string;
  apiURL: string;
  token: string;
}

interface OperatorGetData {
  id: string;
  ID: number;
  Name: string;
  domain: string;
}

interface Register {
  email: string;
  pass: string;
  serialNumber: string;
  referer?: string;
  operatorId?: string;
}

interface SalesRecord {
  staffName: string;
  operatorId: string;
  date: string;
}

const blackDiceEndpoint = "/pa/auth/register";
const retinaEndpoint = "/op/auth/register/demo";

export const UserAccount: React.FC<UserAccountProps> = ({
  backBtn,
  nextBtn,
  operatorId,
  staffName,
  operatorDomain,
  apiURL,
  token,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const formatDate = new Date();
  const date = formatDate.toLocaleString();
  useEffect(() => {
    if (staffName && operatorId) {
      const existingRecords = JSON.parse(
        localStorage.getItem("salesRecord") || "[]"
      ) as SalesRecord[];
      const newRecord: SalesRecord = {
        staffName,
        operatorId,
        date,
      };
      const updatedRecords = [...existingRecords, newRecord];
      localStorage.setItem("salesRecord", JSON.stringify(updatedRecords));
    }
  }, [staffName, operatorId]);

  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [isBlackDiceChecked, setIsBlackDiceChecked] = useState<boolean>(false);
  const [isRetinaChecked, setIsRetinaChecked] = useState<boolean>(false);

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

  // User Input of Email Address

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "confirmEmail") {
      setConfirmEmail(value);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "blackDice") {
      setIsBlackDiceChecked(checked);
    } else if (name === "retina") {
      setIsRetinaChecked(checked);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "" || confirmEmail.trim() === "") {
      window.alert("Please enter and confirm your Email Address");
      return;
    }
    if (email !== confirmEmail) {
      window.alert("Email Addresses do not match, please try again");
      return;
    }
    if (!isValidEmail(email)) {
      window.alert("Please enter a valid Email Address");
      return;
    }

    const userData: Register = {
      email: email,
      pass: generatePassword(),
      serialNumber: serialNumber(),
      referer: operatorDomain,
    };

    if (isRetinaChecked) {
      userData.serialNumber = serialNumber();
      userData.operatorId = operatorId;
    }

    // try {
    //   await axios.post("api/send", {
    //     email: userData.email,
    //     pass: userData.pass,
    //   });
    //   console.log("Email sent successfully");
    //   toast.success("Successfully sent email!");
    // } catch (error) {
    //   console.error("Error sending email:", error);
    // }

    const postToEndpoint = async (endpoint: string, data: Register) => {
      try {
        const response = await axios.post(apiURL + endpoint, data);
        console.log(`Account created successfully at ${endpoint}`);
        return response.data;
      } catch (error) {
        console.log(`Failed creating account at ${endpoint}`);
        throw error;
      }
    };

    const promises = [];

    if (isBlackDiceChecked) {
      const { operatorId, ...userDataBlackDice } = userData;
      userDataBlackDice.serialNumber = serialNumber();
      userDataBlackDice.pass = generatePassword();
      promises.push(postToEndpoint(blackDiceEndpoint, userDataBlackDice));
    }

    if (isRetinaChecked) {
      promises.push(postToEndpoint(retinaEndpoint, userData));
    }

    try {
      const results = await Promise.all(promises);
      if (isBlackDiceChecked && isRetinaChecked) {
        console.log("Accounts generated successfully");
        toast.success("Successfully generated accounts");
        setIsButtonDisabled(false);
      } else if (isBlackDiceChecked) {
        console.log("BlackDice account generated successfully");
        toast.success("BlackDice Account generated successfully");
        setIsButtonDisabled(false);
      } else if (isRetinaChecked) {
        console.log("Retina account generated successfully");
        toast.success("Retina Account generated successfully");
        setIsButtonDisabled(false);
      }
    } catch (error) {
      if (isBlackDiceChecked && isRetinaChecked) {
        console.error("Failed generating accounts:", error);
        toast.error("Failed generating accounts");
      } else if (isBlackDiceChecked) {
        console.log("Failed generating BlackDice account:", error);
        toast.error("Failed generating BlackDice account");
      } else if (isRetinaChecked) {
        console.log("Failed generating Retina account:", error);
        toast.error("Failed generating Retina account");
      }
    }

    console.log(userData);

    setEmail("");
    setConfirmEmail("");
    setIsBlackDiceChecked(false);
    setIsRetinaChecked(false);
  };

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Create an Account</h1>
      </div>

      <form className="common-container-body" onSubmit={handleSubmit}>
        <label>What is your email address?</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="email address"
          required
        />
        <input
          type="email"
          name="confirmEmail"
          value={confirmEmail}
          onChange={handleEmailChange}
          placeholder="confirm email address"
          required
        />
        <div>
          <input
            type="checkbox"
            id="checkbox"
            name="blackDice"
            checked={isBlackDiceChecked}
            onChange={handleCheckboxChange}
          />
          <label>BlackDice UI</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkbox"
            name="retina"
            checked={isRetinaChecked}
            onChange={handleCheckboxChange}
          />
          <label>Retina</label>
        </div>
        <button type="submit">CREATE ACCOUNT</button>
      </form>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn} type="submit" disabled={isButtonDisabled}>
          NEXT
        </button>
      </div>
    </div>
  );
};
