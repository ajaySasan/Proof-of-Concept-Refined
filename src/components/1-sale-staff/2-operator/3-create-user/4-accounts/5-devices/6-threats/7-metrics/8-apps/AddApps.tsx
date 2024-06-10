"use client";

import { useEffect, useState } from "react";
import "../../../../../../../../../app/App.scss";
import axios from "axios";

interface AddAppsProps {
  nextBtn: () => void;
  backBtn: () => void;
  operatorId: string;
  apiURL: string;
  token: string;
}

export const AddApps: React.FC<AddAppsProps> = ({
  nextBtn,
  backBtn,
  operatorId,
  apiURL,
  token,
}) => {
  const header = {
    "auth-token": token,
  };

  const [mobileApps, setMobileApps] = useState<any[]>([]);
  const [deviceId, setDeviceId] = useState<number[]>([]);
  const [deviceAppMapping, setDeviceAppMapping] = useState<
    { deviceId: number; appName: string }[]
  >([]);

  const randomNum = Math.floor(Math.random() * 30) + 15;

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
        console.log("Error fetching device IDs:", error);
      }
    };
    fetchDeviceId();
  }, []);

  useEffect(() => {
    const fetchMobileApps = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/v2/op/demo-suite/mobile-apps`,
          {
            headers: header,
          }
        );
        setMobileApps(response.data);
      } catch (err) {
        console.log(`Error fetching mobile apps: ${err}`);
      }
    };

    fetchMobileApps();
  }, []);

  useEffect(() => {
    if (deviceId.length > 0 && mobileApps.length > 0 && randomNum > 0) {
      const newDeviceAppMapping:
        | ((
            prevState: { deviceId: number; appName: string; appType: string }[]
          ) => { deviceId: number; appName: string; appType: string }[])
        | { deviceId: number; appName: any; appType: string }[] = [];
      deviceId.forEach((device) => {
        for (let i = 0; i < randomNum; i++) {
          const randomAppIndex = Math.floor(Math.random() * mobileApps.length);
          newDeviceAppMapping.push({
            deviceId: device,
            appName: mobileApps[randomAppIndex].packageName,
            appType: "user",
          });
        }
      });
      setDeviceAppMapping(newDeviceAppMapping);
    }
  }, [deviceId, mobileApps, randomNum]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/v2/op/demo-suite/device-apps`,
        deviceAppMapping,
        {
          headers: header,
        }
      );
      console.log(`Device with Apps Created Successfully:`, response.data);
    } catch (err) {
      console.log(`Error adding apps to devices: ${err}`);
    }
  };

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Add Apps to Devices</h1>
      </div>

      <div className="common-container-body">
        <label>Add apps to devices</label>
        <button type="submit" onClick={handleSubmit}>
          ADD APPS
        </button>
      </div>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
