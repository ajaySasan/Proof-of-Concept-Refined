"use client";

import axios from "axios";
import "../../../../../../../app/App.scss";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../../../../../../spinner/Spinner";

interface GenerateCoreThreatsProps {
  nextBtn: () => void;
  backBtn: () => void;
  skipBtn?: () => void;
  operatorId: string;
  apiURL: string;
  token: string;
  header: {
    "auth-token": string;
  };
}

interface Threats {
  deviceId: number;
  threatType: string;
  key: string;
  description: string;
  action: string;
  createdAt: any;
  updatedAt: any;
}

// // Database API
const endpointThreat = "/svc/mock/create-many-threats";

export const GenerateCoreThreats: React.FC<GenerateCoreThreatsProps> = ({
  nextBtn,
  skipBtn,
  backBtn,
  operatorId,
  apiURL,
  token,
  header,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  // Time
  const randomTime = () => {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);

    const formatHour = hour < 10 ? "0" + hour : hour;
    const formatMinute = minute < 10 ? "0" + minute : minute;
    const formatSecond = second < 10 ? "0" + second : second;

    const formatTime = `${formatHour}:${formatMinute}:${formatSecond}`;

    return formatTime;
  };

  // Later
  const addRandomTime = (baseTime: any) => {
    const addHours = Math.floor(Math.random() * 24);
    const addMinutes = Math.floor(Math.random() * 60);
    const addSeconds = Math.floor(Math.random() * 60);

    const [hour, minute, second] = baseTime.split(":").map(Number);
    const baseTotalSeconds = hour * 3600 + minute * 60 + second;

    const totalSeconds =
      baseTotalSeconds + addHours * 3600 + addMinutes * 60 + addSeconds;

    const newHour = Math.floor(totalSeconds / 3600) % 24;
    const newMinute = Math.floor((totalSeconds % 3600) / 60);
    const newSecond = totalSeconds % 60;

    const formatHour = newHour < 10 ? "0" + newHour : newHour;
    const formatMinute = newMinute < 10 ? "0" + newMinute : newMinute;
    const formatSecond = newSecond < 10 ? "0" + newSecond : newSecond;

    const newTime = `${formatHour}:${formatMinute}:${formatSecond}`;
    return newTime;
  };

  // Date
  const todaysDate = new Date();
  const pastDates: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const date = new Date(todaysDate);
    date.setDate(todaysDate.getDate() - i);
    pastDates.push(
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
    );
  }

  // Get 1000 - 2000
  const generateNumberOfDates = (): number[] => {
    const numOfDates: number[] = [];
    for (let i = 0; i < 60; i++) {
      numOfDates.push(Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
    }
    return numOfDates;
  };

  const repeatDates = (
    pastDates: string[],
    generateNumberOfDates: () => number[]
  ): string[] => {
    const randomNumbers = generateNumberOfDates();

    const repeatedArray = pastDates.flatMap((date, index) => {
      const repeatCount = randomNumbers[index];
      return Array(repeatCount).fill(date);
    });

    return repeatedArray;
  };
  const repeatedDates = repeatDates(pastDates, generateNumberOfDates);
  const dateAndTime = repeatedDates.map((date) => {
    const baseTime = randomTime(); // Generate a random base time
    const newTime = addRandomTime(baseTime); // Generate a new time based on the base time
    return `${date} ${newTime}`;
  });

  // deviceId
  const [deviceId, setDeviceId] = useState<number[]>([]);
  const deviceIdOperator: any = `/op/operatordevices/${operatorId}?size=100000`;
  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const response = await axios.get(apiURL + deviceIdOperator, {
          headers: header,
        });
        const data = response.data;
        const ids = data.data.map((item: { ID: number }) => item.ID);
        setDeviceId(ids);
      } catch (error) {
        console.log("error");
      }
    };
    fetchDeviceId();
  }, [apiURL, deviceIdOperator, header]);

  const shuffledIds = [...deviceId];
  for (let i = shuffledIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
  }

  // Threat data
  const threat: any[] = [
    {
      key: "app_fw",
      threatType: "Apps firewalled",
    },
    {
      key: "dev_fw",
      threatType: "Device firewalled",
    },
    {
      key: "mw_site",
      threatType: "Malware site blocked",
    },
    {
      key: "dev_ab",
      threatType: "Device abnormality identified",
    },
    {
      key: "unauth",
      threatType: "Unauthorised access request refused",
    },
    {
      key: "app_blk",
      threatType: "App install blocked",
    },
    {
      key: "data_leak",
      threatType: "Suspicious data leak",
    },
    {
      key: "dev_vuln",
      threatType: "Device vulnerability found",
    },
    {
      key: "c2_site",
      threatType: "Command and Control server blocked",
    },
    {
      key: "ras_site",
      threatType: "Remote access server blocked",
    },
    {
      key: "ph_site",
      threatType: "Phishing site blocked",
    },
    {
      key: "bot_site",
      threatType: "Botnet site blocked",
    },
    {
      key: "sp_site",
      threatType: "Spam generator site blocked",
    },
    {
      key: "ad_site",
      threatType: "Adware site blocked",
    },
    {
      key: "fas_site",
      threatType: "File hosting site blocked",
    },
  ];
  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const baseTime = randomTime();
    const threatData: Threats[] = [];
    const totalItems = dateAndTime.length;
    const totalPercentage = 100;
    const threatPercentageSplit: { [key: string]: number } = {
      app_fw: 5,
      dev_fw: 2,
      mw_site: 10,
      dev_ab: 8,
      unauth: 2,
      app_blk: 3,
      data_leak: 6,
      dev_vuln: 24,
      c2_site: 1,
      ras_site: 12,
      ph_site: 2,
      bot_site: 13,
      sp_site: 1,
      ad_site: 2,
      fas_site: 9,
    };

    const threatCounts: { [key: string]: number } = {};
    let remainingItems = totalItems;
    Object.entries(threatPercentageSplit).forEach(([key, percentage]) => {
      const count = Math.round((percentage / totalPercentage) * totalItems);
      threatCounts[key] = count;
      remainingItems -= count;
    });

    const threatKeys = Object.keys(threatCounts);
    for (let i = 0; i < remainingItems; i++) {
      const key = threatKeys[i % threatKeys.length];
      threatCounts[key]++;
    }

    dateAndTime.forEach((dateTime, index) => {
      const idIndex = index % shuffledIds.length;
      const deviceId = shuffledIds[idIndex];
      const threatKey = threatKeys[index % threatKeys.length];
      const threatType =
        threat.find((item) => item.key === threatKey)?.threatType || "";
      const newTime = addRandomTime(baseTime);
      const updatedAt = `${dateTime.split(" ")[0]} ${newTime}`;

      const newThreatData: Threats = {
        deviceId: deviceId,
        threatType: threatType,
        key: threatKey,
        description: `demo.${threatKey}.com blocked by BlackDice Shield `,
        action: "WARN:BLOCK_SITE",
        createdAt: dateTime,
        updatedAt: updatedAt,
      };
      threatData.push(newThreatData);
    });

    const chunkSize = 100;
    
    try {
      for (let i = 0; i < threatData.length; i += chunkSize) {
        const chunk = threatData.slice(i, i + chunkSize);

        const response = await axios.post(apiURL + endpointThreat, {
          threats: chunk,
        });
        console.log("Successfully generated threat data: ");
        console.log(chunk);
      }
      toast.success("Successfully generated threat data");
      setIsButtonDisabled(false);
    } catch (error) {
      console.log(`Failed to generate threat data: ${error}`);
      toast.error("Failed to generate threat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [apiURL, token, deviceIdOperator, header]);

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Generate Threat History</h1>
      </div>

      <form className="common-container-body" onSubmit={handleSubmit}>
        <label>Generate threat data for the past 60 days</label>
        <LoadingSpinner loading={loading} />
        <button type="submit">GENERATE THREATS</button>
      </form>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn} type="submit" disabled={isButtonDisabled}>
          NEXT
        </button>
        <button onClick={skipBtn}>SKIP</button>
      </div>
    </div>
  );
};
