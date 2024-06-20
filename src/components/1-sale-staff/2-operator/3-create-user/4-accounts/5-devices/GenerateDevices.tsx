"use client";

import { useEffect, useState } from "react";
import "../../../../../../app/App.scss";
import axios from "axios";

interface GenerateRandomDevicesProps {
  nextBtn: () => void;
  backBtn: () => void;
  operatorId: string;
  apiURL: string;
  token: string;
  header: {
    "auth-token": string;
  };
}

interface Device {
  name: string;
  description: string;
  macAddress: string;
  phoneNumber: string;
  deviceCategoryId: number;
  webFilter: string;
  rules: string[];
  haandle: number;
}

// Databse API
let numOfHaandles = 50000;
const endpointThreat75 = "/pa/devices";
const endpointThreat25 = "/pa/devices/unconfirmed";

export const GenerateRandomDevices: React.FC<GenerateRandomDevicesProps> = ({
  nextBtn,
  backBtn,
  operatorId,
  apiURL,
  token,
  header,
}) => {
  const [numOfDevices, setNumOfDevices] = useState<number>(0);
  const handleNumOfDevices = (e: React.ChangeEvent<HTMLInputElement>) => {
    const deviceValue = parseInt(e.target.value);
    setNumOfDevices(deviceValue);
  };
  const deviceDescriptions: { vendor: string; type: string; cat: number }[] = [
    // Phones
    { vendor: "Apple Inc.", type: "iPhone 5S", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone 6S Plus", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone 7 Plus", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone 8 Plus", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone X", cat: 1 },
    { vendor: "Apple Inc.", type: "iPhone 11 Pro Max", cat: 1 },
    { vendor: "Samsung", type: "Galaxy S10", cat: 1 },
    { vendor: "Samsung", type: "Galaxy S20", cat: 1 },
    { vendor: "Google", type: "Pixel 4", cat: 1 },
    { vendor: "Google", type: "Pixel 5", cat: 1 },
    { vendor: "OnePlus", type: "OnePlus 9", cat: 1 },
    { vendor: "OnePlus", type: "OnePlus 9 Pro", cat: 1 },
    // Laptops
    { vendor: "Apple Inc.", type: "MacBook Pro 16", cat: 2 },
    { vendor: "Dell", type: "XPS 15", cat: 2 },
    { vendor: "Lenovo", type: "ThinkPad X1 Carbon", cat: 2 },
    { vendor: "HP", type: "Spectre x360", cat: 2 },
    { vendor: "Microsoft", type: "Surface Laptop 4", cat: 2 },
    { vendor: "Asus", type: "ZenBook Pro Duo", cat: 2 },
    // Desktops
    { vendor: "Apple Inc.", type: "iMac 27", cat: 3 },
    { vendor: "Dell", type: "Alienware Aurora R11", cat: 3 },
    { vendor: "HP", type: "OMEN Desktop PC", cat: 3 },
    { vendor: "Lenovo", type: "ThinkCentre M720q", cat: 3 },
    { vendor: "Acer", type: "Aspire TC", cat: 3 },
    { vendor: "Asus", type: "ROG Strix GL12", cat: 3 },
    // Game Consoles
    { vendor: "Sony", type: "PlayStation 5", cat: 4 },
    { vendor: "Microsoft", type: "Xbox Series X", cat: 4 },
    { vendor: "Nintendo", type: "Switch", cat: 4 },
    { vendor: "Sony", type: "PlayStation 4 Pro", cat: 4 },
    { vendor: "Microsoft", type: "Xbox One X", cat: 4 },
    { vendor: "Nintendo", type: "Switch Lite", cat: 4 },
    { vendor: "Sony", type: "PlayStation 4 Slim", cat: 4 },
    { vendor: "Microsoft", type: "Xbox One S", cat: 4 },
    { vendor: "Nintendo", type: "2DS XL", cat: 4 },
    { vendor: "Sony", type: "PlayStation VR", cat: 4 },
    { vendor: "Microsoft", type: "Xbox One", cat: 4 },
    { vendor: "Nintendo", type: "3DS XL", cat: 4 },
    // Smart TV
    { vendor: "Samsung", type: "Smart TV QLED 4K", cat: 5 },
    { vendor: "LG", type: "OLED Smart TV", cat: 5 },
    { vendor: "Sony", type: "BRAVIA Smart TV", cat: 5 },
    { vendor: "TCL", type: "6-Series QLED Roku Smart TV", cat: 5 },
    { vendor: "Hisense", type: "ULED Smart TV", cat: 5 },
    { vendor: "Vizio", type: "P-Series Quantum X Smart TV", cat: 5 },
    { vendor: "Panasonic", type: "HDX Smart TV", cat: 5 },
    { vendor: "Sharp", type: "Aquos Smart TV", cat: 5 },
    // Smart Speakers
    { vendor: "Amazon", type: "Echo Dot (4th Gen)", cat: 6 },
    { vendor: "Google", type: "Google Home Mini", cat: 6 },
    { vendor: "Apple", type: "HomePod Mini", cat: 6 },
    { vendor: "Sonos", type: "One SL", cat: 6 },
    { vendor: "Bose", type: "Home Speaker 300", cat: 6 },
    { vendor: "Samsung", type: "Galaxy Home Mini", cat: 6 },
    { vendor: "Xiaomi", type: "Mi Smart Speaker", cat: 6 },
    { vendor: "Harman Kardon", type: "Invoke", cat: 6 },
    //Tablets
    { vendor: "Apple Inc.", type: "iPad Pro", cat: 7 },
    { vendor: "Samsung", type: "Galaxy Tab S7", cat: 7 },
    { vendor: "Microsoft", type: "Surface Pro 7", cat: 7 },
    { vendor: "Amazon", type: "Fire HD 10", cat: 7 },
    { vendor: "Lenovo", type: "Tab P11 Pro", cat: 7 },
    { vendor: "Huawei", type: "MatePad Pro", cat: 7 },
    { vendor: "Google", type: "Pixel Slate", cat: 7 },
    { vendor: "Asus", type: "ZenPad 3S 10", cat: 7 },
    // Watches
    { vendor: "Apple Inc.", type: "Apple Watch Series 6", cat: 8 },
    { vendor: "Samsung", type: "Galaxy Watch 3", cat: 8 },
    // Printers
    { vendor: "HP", type: "LaserJet Pro MFP M428fdn", cat: 9 },
    { vendor: "Epson", type: "EcoTank ET-4760", cat: 9 },
  ];

  const getRandomDeviceDescription = (): {
    vendor: string;
    type: string;
    cat: number;
  } => {
    const randomIndex = Math.floor(Math.random() * deviceDescriptions.length);
    return deviceDescriptions[randomIndex];
  };

  // Names

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

  const getRandomFirstName = (): string => {
    const randomIndex = Math.floor(Math.random() * firstNames.length);
    return firstNames[randomIndex];
  };
  const getRandomDeviceName = (): string => {
    const randomDevice = getRandomDeviceDescription();
    const randomFirstName = getRandomFirstName();
    return `${randomFirstName}'s`;
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

  // Age Groups
  const ageGroups = ["UNDER12", "EARLYTEEN", "YOUNGADULT", "NOSHIELD"];
  const getRandomAgeGroup = (): string => {
    const randomIndex = Math.floor(Math.random() * ageGroups.length);
    return ageGroups[randomIndex];
  };

  // Phone number
  const generatePhoneNumber = (): string => {
    const prefix = "07";
    const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
    return prefix + randomDigits.toString().substring(0, 9);
  };

  // Get Haandle ID
  const getHaandleId = `/op/${operatorId}/cpe_table?size=${numOfHaandles}&sort=id&order=desc`;
  const fetchRandomId = async () => {
    try {
      const response = await axios.get(`${apiURL}${getHaandleId}`, {
        headers: header,
      });
      const responseData = response.data.data;
      const randomIndex = Math.floor(Math.random() * responseData.length);
      const newRandomId = responseData[randomIndex].ID;
      return newRandomId;
    } catch (error) {
      console.error("Error fetching random ID:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchRandomId();
  }, [fetchRandomId]);

  // 75% confirmed, 25% unconfirmed
  const threat75Percentage = 0.75;
  const randomNumber = Math.random();
  const endpoint =
    randomNumber < threat75Percentage ? endpointThreat75 : endpointThreat25;

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const haandles: number[] = [];
    const numHaandles = Math.ceil(numOfDevices / 3);

    for (let i = 0; i < numHaandles; i++) {
      const newRandomId = await fetchRandomId();
      haandles.push(newRandomId);
    }
    const devicesPerHaandle = Math.floor(numOfDevices / haandles.length);
    let remainingDevices = numOfDevices % haandles.length;

    for (let i = 0; i < haandles.length; i++) {
      let devicesForThisHaandle = devicesPerHaandle;

      if (remainingDevices > 0) {
        const deviceAdd = Math.floor(Math.random() * 4);
        const deviceSubtract = Math.floor(Math.random() * 4);

        if (
          deviceAdd !== 0 &&
          devicesForThisHaandle + deviceAdd <= numOfDevices
        ) {
          devicesForThisHaandle += deviceAdd;
          remainingDevices -= deviceAdd;
        } else if (
          deviceSubtract !== 0 &&
          devicesForThisHaandle - deviceSubtract >= 2
        ) {
          devicesForThisHaandle -= deviceSubtract;
          remainingDevices += deviceSubtract;
        }
      }

      for (let j = 0; j < devicesForThisHaandle; j++) {
        const randomDeviceDescription = getRandomDeviceDescription();

        const deviceData: Device = {
          name: `${getRandomDeviceName()} ${randomDeviceDescription.type}`,
          description: randomDeviceDescription.type,
          macAddress: serialNumber(),
          phoneNumber: generatePhoneNumber(),
          deviceCategoryId: randomDeviceDescription.cat,
          webFilter: getRandomAgeGroup(),
          rules: [],
          haandle: haandles[i],
        };

        console.log(deviceData);

        try {
          const response = await axios.post(apiURL + endpoint, deviceData, {
            headers: header,
          });
          console.log("success");
        } catch (error) {
          console.log("error");
        }
      }
    }
  };

  console.log(`${apiURL}${getHaandleId}`);

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Generate Devices</h1>
      </div>

      <form onSubmit={handleSubmit} className="common-container-body">
        <label>How many devices (on average) per account?</label>
        <input
          value={numOfDevices}
          onChange={handleNumOfDevices}
          type="text"
          placeholder="devices"
        />
        <button type="submit">GENERATE DEVICES</button>
      </form>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
