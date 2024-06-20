"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import "../../../../../../../../../../../app/App.scss";

interface RealTimeDataProps {
  exitBtn: () => void;
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

interface Threats {
  deviceId: number;
  threatType: string;
  key: string;
  description: string;
  action: string;
  createdAt: any;
  updatedAt: any;
}

// Database API
const endpointMetrics = "/svc/mock/create-many-device-metrics";
const endpointThreat = "/svc/mock/create-many-threats";

export const RealTimeData: React.FC<RealTimeDataProps> = ({
  exitBtn,
  backBtn,
  operatorId,
  apiURL,
  token,
  header,
}) => {
  const handleExitMessage = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit the demo?"
    );
    if (confirmExit) {
      exitBtn();
    }
  };

  // deviceId
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
        setDeviceInfo(deviceInfo);
      } catch (error) {
        console.log("error");
      }
    };
    fetchDeviceId();
  }, [apiURL, deviceIdOperator, header]);

  const [currentDateTime, setCurrentDateTime] = useState("");

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setCurrentDateTime(formattedDateTime);
    const randomNumber = Math.floor(Math.random() * 16) + 4;

    // Threats
    const threatData: Threats[] = [];
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

    for (let i = 0; i < randomNumber; i++) {
      const randomDeviceIndex = Math.floor(Math.random() * deviceInfo.length);
      const deviceId = deviceInfo[randomDeviceIndex];
      const randomIndex = Math.floor(Math.random() * threat.length);
      const randomThreat = threat[randomIndex];

      const newThreatData: Threats = {
        deviceId: deviceId.deviceId,
        threatType: randomThreat.threatType,
        key: randomThreat.key,
        description: `demo.${randomThreat.key}.com blocked by BlackDice Shield `,
        action: "WARN:BLOCK_SITE",
        createdAt: formattedDateTime,
        updatedAt: formattedDateTime,
      };
      threatData.push(newThreatData);
    }

    try {
      const response = await axios.post(apiURL + endpointThreat, {
        threats: threatData,
      });
      console.log("Threat data posted:", response.data);
    } catch (error) {
      console.error("Error posting threat data:", error);
    }
    console.log(threatData);

    // Metric Data
    const metricData: Metric[] = [];
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

    for (let i = 0; i < randomNumber; i++) {
      const randomDeviceIndex = Math.floor(Math.random() * deviceInfo.length);
      const deviceId = deviceInfo[randomDeviceIndex];

      const newMetricData: Metric = {
        deviceId: deviceId.deviceId,
        mac: deviceId.mac,
        signal: randomSignal(),
        txBitrate: txBitrate(),
        rxBitrate: rxBitrate(),
        txBytes: txByte(),
        rxBytes: rxByte(),
        createdAt: formattedDateTime,
        updatedAt: formattedDateTime,
        rxBitrateAverage: randomRxBitRateAverage(),
        txBitrateAverage: randomTxBitRateAverage(),
        signalNum: signalNum(),
      };
      metricData.push(newMetricData);
    }

    try {
      const response = await axios.post(apiURL + endpointMetrics, {
        metrics: metricData,
      });
      console.log("Metric data posted:", response.data);
    } catch (error) {
      console.error("Error posting metric data:", error);
    }
    console.log(metricData);
  };

  // Demo loop
  const [demoRunning, setDemoRunning] = useState<boolean>(false);
  const [demoInterval, setDemoInterval] = useState<any>(null);
  let interval: NodeJS.Timeout;

  const startDemo: any = {
    preventDefault: () => {},
    target: {
      value: "",
    },
  };

  const startDemoLoop = () => {
    setDemoRunning(true);
    handleSubmit(startDemo);
    console.log("Entering Demo mode");
    const newInterval = setInterval(handleSubmit, 5000);
    setDemoInterval(newInterval);

    setTimeout(() => {
      clearInterval(interval);
      setDemoRunning(false);
      console.log("Demo stopped after 60 minutes.");
    }, 60 * 60 * 1000);
  };

  const stopDemoLoop = () => {
    if (demoInterval) {
      clearInterval(demoInterval);
      setDemoRunning(false);
      console.log("Demo stopped manually.");
    }
  };

  useEffect(() => {}, [apiURL, token, deviceIdOperator, header]);

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Add New Threats and Metrics</h1>
      </div>

      <form className="common-container-body">
        <label>Create new threats and metrics in real time</label>
        <p>
          Once &quot;Start Demo&quot; is selected, new threat and metric data
          will be added dynamically to showcase how our software and UI detect
          incoming threats live and in real time.
        </p>
        <button type="button" onClick={startDemoLoop}>
          START DEMO
        </button>
        <p>
          Upon selecting &quot;Stop Demo&quot;, incoming data will cease,
          terminating the demonstration.
        </p>
        <button type="button" onClick={stopDemoLoop}>
          STOP DEMO
        </button>
      </form>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={handleExitMessage}>EXIT</button>
      </div>
    </div>
  );
};
