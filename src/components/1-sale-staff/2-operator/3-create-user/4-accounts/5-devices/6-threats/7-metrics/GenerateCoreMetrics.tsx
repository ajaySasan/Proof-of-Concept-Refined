"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import "../../../../../../../../app/App.scss";
import { LoadingSpinner } from "../../../../../../../spinner/Spinner";
import toast from "react-hot-toast";

interface GenerateCoreMetricsProps {
  nextBtn: () => void;
  skipBtn?: () => void;
  backBtn: () => void;
  operatorId: string;
  apiURL: string;
  token: string;
  header: {
    "auth-token": string;
  };
}

interface DeviceInfo {
  deviceId: number;
  mac: string;
}

interface Metric {
  deviceId: number;
  mac: string;
  signal: string;
  txBitrate: number;
  rxBitrate: number;
  txBytes: number;
  rxBytes: number;
  createdAt: any;
  updatedAt: any;
  rxBitrateAverage: string;
  txBitrateAverage: string;
  signalNum: number;
}

// Database API
const endpointMetrics = "/svc/mock/create-many-device-metrics";

export const GenerateCoreMetrics: React.FC<GenerateCoreMetricsProps> = ({
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
  const [shuffledDeviceIds, setShuffledDeviceIds] = useState<DeviceInfo[]>([]);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo[]>([]);

  const deviceIdOperator: any = `/op/operatordevices/${operatorId}?size=100000`;
  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const response = await axios.get(apiURL + deviceIdOperator, {
          headers: header,
        });
        const data = response.data;
        const deviceInfo: DeviceInfo[] = data.data.map(
          (item: { ID: number; mac_address: string }) => ({
            deviceId: item.ID,
            mac: item.mac_address,
          })
        );
        setShuffledDeviceIds(shuffle(deviceInfo)); // Shuffle device IDs and store them
        setDeviceInfo(deviceInfo); // Store device info without shuffling
      } catch (error) {
        console.log("error");
      }
    };
    fetchDeviceId();
  }, [apiURL, deviceIdOperator, header]);

  // Shuffle function
  const shuffle = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Metric Data
  const randomSignal = () => {
    const signalStrength = ["weak", "medium", "strong"];
    const randomIndex = Math.floor(Math.random() * signalStrength.length);
    return signalStrength[randomIndex];
  };

  const txBitrate = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const rxBitrate = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const txByte = () => {
    return Math.floor(Math.random() * (1000000000 - 100000 + 1)) + 100000;
  };

  const rxByte = () => {
    return Math.floor(Math.random() * (1000000000 - 100000 + 1)) + 100000;
  };

  const randomRxBitRateAverage = () => {
    const rxBitRateAverage = ["low", "medium", "high"];
    const randomRxIndex = Math.floor(Math.random() * rxBitRateAverage.length);
    return rxBitRateAverage[randomRxIndex];
  };

  const randomTxBitRateAverage = () => {
    const txBitRateAverage = ["low", "medium", "high"];
    const randomTxIndex = Math.floor(Math.random() * txBitRateAverage.length);
    return txBitRateAverage[randomTxIndex];
  };

  const signalNum = () => {
    return Math.floor(Math.random() * (-25 - -90 + 1)) + -90;
  };

  // Handle submit// Handle submit
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const baseTime = randomTime();
  const metricData: Metric[] = [];

  for (let index = 0; index < dateAndTime.length; index++) {
    const idIndex = index % shuffledDeviceIds.length;
    const deviceDetails = shuffledDeviceIds[idIndex];

    if (!deviceDetails) {
      console.log("Failed to generate metric data");
      toast.error("Failed to generate metric data");
      setIsButtonDisabled(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return;
    }

    let { deviceId, mac } = deviceDetails;

    // Check if mac is missing
    if (!mac) {
      deviceId = 0;
    }

    const newTime = addRandomTime(baseTime);
    const updatedAt = `${dateAndTime[index].split(" ")[0]} ${newTime}`;

    const newMetricData: Metric = {
      deviceId: deviceId,
      mac: mac,
      signal: randomSignal(),
      txBitrate: txBitrate(),
      rxBitrate: rxBitrate(),
      txBytes: txByte(),
      rxBytes: rxByte(),
      createdAt: dateAndTime[index],
      updatedAt: updatedAt,
      rxBitrateAverage: randomRxBitRateAverage(),
      txBitrateAverage: randomTxBitRateAverage(),
      signalNum: signalNum(),
    };
    metricData.push(newMetricData);
  }

    const chunkSize = 100;

    try {
      for (let i = 0; i < metricData.length; i += chunkSize) {
        const chunk = metricData.slice(i, i + chunkSize);

        const response = await axios.post(apiURL + endpointMetrics, {
          metrics: chunk,
        });
        console.log("Successfully generated metric data: ");
        console.log(chunk);
      }
      toast.success("Successfully generated metric data");
      setIsButtonDisabled(false);
    } catch (error) {
      console.log(`Failed to generate metric data: ${error}`);
      toast.error("Failed to generate metric data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [apiURL, token, deviceIdOperator, header]);

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Generate Metric History</h1>
      </div>

      <form className="common-container-body" onSubmit={handleSubmit}>
        <label>Generate metric data for the past 60 days</label>
        <LoadingSpinner loading={loading} />
        <button type="submit">GENERATE METRICS</button>
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
