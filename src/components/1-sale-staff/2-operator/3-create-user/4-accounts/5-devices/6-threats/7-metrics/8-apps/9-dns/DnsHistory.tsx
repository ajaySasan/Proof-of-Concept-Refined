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
}

export const DnsHistory: React.FC<DnsHistoryProps> = ({
  nextBtn,
  backBtn,
  operatorId,
  apiURL,
  token,
}) => {
  const header = {
    "auth-token": token,
  };
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

  // const platformOne = 1000;
  // const platformTwo = 2;
  // const randomPlatform =
  //   Math.floor(Math.random() * 2) === 0 ? platformOne : platformTwo;

  // const categories = ["10005", "10005-10415", "10094", "10096-10115"];

  // const randomCategoryIndex = Math.floor(Math.random() * categories.length);
  // const randomCategory = categories[randomCategoryIndex];

  // const allowTrue = true;
  // const allowFalse = false;
  // const randomAllow =
  //   Math.floor(Math.random() * 2) === 0 ? allowTrue : allowFalse;

  // // const handleSubmit = async () => {
  //   const newDnsRecord = {
  //     requester: deviceId,
  //     fqdn: mobileApps,
  //     allow: randomAllow,
  //     reason: randomPlatform,
  //     categories: randomCategory,
  //     tld: mobileApps,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${apiURL}/v2/op/dns-records/create`,
  //       newDnsRecord,
  //       {
  //         headers: header,
  //       }
  //     );
  //     console.log(`Device with Apps Created Successfully:`, response.data);
  //   } catch (err) {
  //     console.log(`Error adding apps to devices: ${err}`);
  //   }
  // };

  const handleSubmit = async () => {
    const newDnsRecords: any[] = [];
    const numberOfRecordsPerDevice = 23;

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

        const allow = Math.floor(Math.random() * 2) === 0;

        const newDnsRecord = {
          requester: id,
          fqdn: randomMobileApp.fqdn,
          allow: allow,
          reason: randomPlatform,
          categories: randomCategory,
          tld: randomMobileApp.tld,
        };

        newDnsRecords.push(newDnsRecord);
      }
    }

    try {
      const response = await axios.post(
        `${apiURL}/v2/op/dns-records/create`,
        newDnsRecords,
        {
          headers: header,
        }
      );
      console.log(`DNS Records Created Successfully:`, response.data);
    } catch (err) {
      console.log(`Error adding DNS records: ${err}`);
    }
  };

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
