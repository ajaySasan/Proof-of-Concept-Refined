"use client";

import axios from "axios";
import "../../../../../../../../../../app/App.scss";
import { useEffect, useState } from "react";

interface DnsHistoryProps {
  nextBtn: () => void;
  backBtn: () => void;
  operatorId: string;
  apiURL: string;
  token: string;
  header: {
    "auth-token": string;
  };
}

export const DnsHistory: React.FC<DnsHistoryProps> = ({
  nextBtn,
  backBtn,
  operatorId,
  apiURL,
  token,
  header,
}) => {
  const [deviceId, setDeviceId] = useState<number[]>([]);
  const [mobileApps, setMobileApps] = useState<any[]>([]);

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
  }, [apiURL, deviceIdOperator, header]);

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
  }, [apiURL, header]);

  const chunkArray = (array: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleSubmit = async () => {
    const newDnsRecords: any[] = [];
    const numberOfRecordsPerDevice = 33;

    // Loop through each deviceId
    for (const id of deviceId) {
      for (let i = 0; i < numberOfRecordsPerDevice; i++) {
        const randomMobileAppIndex = Math.floor(
          Math.random() * mobileApps.length
        );
        const randomMobileApp = mobileApps[randomMobileAppIndex];

        const categories = ["10005", "10005-10415", "10094", "10096-10115"];
        const randomCategoryIndex = Math.floor(
          Math.random() * categories.length
        );
        const randomCategory = categories[randomCategoryIndex];

        const randomPlatform = Math.floor(Math.random() * 2) === 0 ? 1000 : 2;

        const profile = ["68hj1h1q7", "66ATCUL1C", "66atcul1c"];
        const randomProfileIndex = Math.floor(Math.random() * profile.length);
        const randomProfile = profile[randomProfileIndex];

        const allow = Math.floor(Math.random() * 2) === 0;
        const newDnsRecord = {
          requester: id,
          fqdn: randomMobileApp.packageName,
          profile: randomProfile,
          allow: allow,
          reason: randomPlatform,
          categories: randomCategory,
          tld: randomMobileApp.packageName,
        };

        newDnsRecords.push(newDnsRecord);
      }
    }

    const chunkSize = 100; // Adjust the chunk size if needed
    const chunks = chunkArray(newDnsRecords, chunkSize);

    try {
      for (const chunk of chunks) {
        const response = await axios.post(
          `${apiURL}/v2/op/dns-records/create`,
          chunk,
          {
            headers: header,
          }
        );
        console.log(`Chunk created successfully:`, response.data);
      }
      console.log("All DNS records created successfully.");
    } catch (err) {
      console.log(`Error adding DNS records: ${err}`);
    }
  };

  useEffect(() => {}, [apiURL, token, deviceIdOperator, header]);

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Add DNS History</h1>
      </div>

      <div className="common-container-body">
        <label>Add DNS history to devices</label>
        <button type="button" onClick={handleSubmit}>
          ADD DNS HISTORY
        </button>
      </div>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
