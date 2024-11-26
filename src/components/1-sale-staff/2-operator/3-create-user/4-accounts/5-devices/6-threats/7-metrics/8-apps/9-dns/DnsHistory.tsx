"use client";

import axios from "axios";
import "../../../../../../../../../../app/App.scss";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../../../../../../../../spinner/Spinner";
import toast from "react-hot-toast";

interface DnsHistoryProps {
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

export const DnsHistory: React.FC<DnsHistoryProps> = ({
  nextBtn,
  backBtn,
  skipBtn,
  operatorId,
  apiURL,
  token,
  header,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
  
    if (deviceId.length === 0) {
      toast.error("Failed to generate DNS History");
      setIsButtonDisabled(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return;
    }
  
    const newDnsRecords: any[] = [];
    const numberOfRecordsPerDevice = 26;
  
    // Utility function to get a random date within the past 30 days
    const getRandomDate = () => {
      const now = new Date();
      const past = new Date();
      past.setDate(now.getDate() - 120);
  
      const randomTimestamp = past.getTime() + Math.random() * (now.getTime() - past.getTime());
      const randomDate = new Date(randomTimestamp);
  
      const year = randomDate.getFullYear();
      const month = String(randomDate.getMonth() + 1).padStart(2, "0");
      const day = String(randomDate.getDate()).padStart(2, "0");
      const hours = String(randomDate.getHours()).padStart(2, "0");
      const minutes = String(randomDate.getMinutes()).padStart(2, "0");
      const seconds = String(randomDate.getSeconds()).padStart(2, "0");
  
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`;
    };
  
    for (const id of deviceId) {
      for (let i = 0; i < numberOfRecordsPerDevice; i++) {
        const randomMobileAppIndex = Math.floor(Math.random() * mobileApps.length);
        const randomMobileApp = mobileApps[randomMobileAppIndex];
  
        const categories = ["10005", "10005-10415", "10094", "10096-10115"];
        const randomCategoryIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomCategoryIndex];
  
        const randomPlatform = Math.floor(Math.random() * 2) === 0 ? 1000 : 2;
  
        const profile = ["39zjt07pc", "683fmwutc", "66atcul1c", "68hj1h1q7", "68h8xtxhb", "66q3y86bj", "68dskdxof"];
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
          created_at: getRandomDate(), // Add the generated random date here
        };
  
        newDnsRecords.push(newDnsRecord);
      }
    }
  
    const chunkSize = 100;
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
        console.log("Successfully generated DNS Records: ");
        console.log(response.data);
      }
      toast.success("Successfully generated DNS Records");
      setIsButtonDisabled(false);
    } catch (err) {
      console.log(`Failed to generate DNS records: ${err}`);
      toast.error("Failed to generate DNS records");
    } finally {
      setLoading(false);
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
        <LoadingSpinner loading={loading} />
        <button type="button" onClick={handleSubmit}>
          ADD DNS HISTORY
        </button>
      </div>

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
