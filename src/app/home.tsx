"use client";
import "../app/App.scss";

import { RealTimeData } from "@/components/1-sale-staff/2-operator/3-create-user/4-accounts/5-devices/6-threats/7-metrics/8-apps/9-dns/10-new-data/RealTimeData";
import { DnsHistory } from "@/components/1-sale-staff/2-operator/3-create-user/4-accounts/5-devices/6-threats/7-metrics/8-apps/9-dns/DnsHistory";
import { AddApps } from "@/components/1-sale-staff/2-operator/3-create-user/4-accounts/5-devices/6-threats/7-metrics/8-apps/AddApps";
import { GenerateCoreMetrics } from "@/components/1-sale-staff/2-operator/3-create-user/4-accounts/5-devices/6-threats/7-metrics/GenerateCoreMetrics";
import { GenerateCoreThreats } from "@/components/1-sale-staff/2-operator/3-create-user/4-accounts/5-devices/6-threats/GenerateCoreThreats";
import { GenerateRandomDevices } from "@/components/1-sale-staff/2-operator/3-create-user/4-accounts/5-devices/GenerateDevices";
import { GenerateRandomAccounts } from "@/components/1-sale-staff/2-operator/3-create-user/4-accounts/GenerateRandomAccounts";
import { UserAccount } from "@/components/1-sale-staff/2-operator/3-create-user/UserAccount";
import { Operator } from "@/components/1-sale-staff/2-operator/Operator";
import { SalesStaff } from "@/components/1-sale-staff/SalesStaff";
import { SalesRecords } from "@/components/sales-data/SalesRecords";
import { Taskbar } from "@/components/Taskbar";
import { WelcomePage } from "@/components/WelcomePage";
import { useState, useMemo } from "react";

// const apiURL: string = "https://api-dev.blackdice.ai";
// const token: string =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6OTExLCJhY2NvdW50SWQiOjEyMDIsIm9wZXJhdG9ySWQiOm51bGwsInNlc3Npb25Ub2tlbiI6eyJpZCI6ODcwOSwic2Vzc2lvbiI6IjY0OGU2MDZiMTA3NTE2NmVhNzdjMTdlOTM2OWIwMzcyIiwidSI6IjMzZDQzNGJlNDI1M2ZjMDBhYjVhODU5N2VlNzQ3NTZiNTNhOGI5ZWIiLCJ1cGRhdGVkQXQiOiIyMDI0LTA2LTA2VDEzOjI4OjA3LjIwMFoiLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTA2VDEzOjI4OjA3LjIwMFoifSwiaWF0IjoxNzE3NjgwNDg3fQ.lH9lmCGiXm8Z6P8_rfaIpbzVc1p4zYud8NaeDwJCVD8";
interface HomeProps {
  token: string;
  paToken: string;
}

export const Main: React.FC<HomeProps> = ({ token, paToken }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [staffNameInput, setStaffNameInput] = useState("");
  const [operatorId, setOperatorId] = useState<string>("");
  const [salesPage, setSalesPage] = useState<boolean>(false);
  const [selectedSubdomain, setSelectedSubdomain] = useState<string>("");

  console.log(`Operator Token = ${paToken}`);
  console.log(`Service Platform Token = ${token}`);

  const apiURL: string = "https://api-pov.blackdice.ai";

  const header = useMemo(() => {
    return { "auth-token": token };
  }, [token]);

  const paHeader = useMemo(() => {
    return { "auth-token": paToken };
  }, [paToken]);

  const handleSalesPage = () => {
    setSalesPage(!salesPage);
  };

  const handleImageClick = (page: any) => {
    setCurrentPage(page);
    setSalesPage(false);
  };

  const handleStaffName = (staffNameValue: string) => {
    setStaffNameInput(staffNameValue);
  };

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const exitDemo = () => setCurrentPage(0);

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <WelcomePage nextBtn={nextPage} />;
      case 1:
        return (
          <SalesStaff
            nextBtn={nextPage}
            backBtn={prevPage}
            staffName={handleStaffName}
          />
        );
      case 2:
        return (
          <Operator
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            setOperatorId={setOperatorId}
            selectedSubdomain={selectedSubdomain}
            setSelectedSubdomain={setSelectedSubdomain}
            apiURL={apiURL}
            token={token}
            header={header}
          />
        );
      case 3:
        return (
          <UserAccount
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            staffName={staffNameInput}
            operatorDomain={selectedSubdomain}
            apiURL={apiURL}
            token={token}
            header={header}
          />
        );
      case 4:
        return (
          <GenerateRandomAccounts
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            operatorDomain={selectedSubdomain}
            apiURL={apiURL}
            token={token}
            header={header}
          />
        );
      case 5:
        return (
          <GenerateRandomDevices
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            apiURL={apiURL}
            token={paToken}
            header={paHeader}
          />
        );
      case 6:
        return (
          <GenerateCoreThreats
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            apiURL={apiURL}
            token={token}
            header={header}
          />
        );
      case 7:
        return (
          <GenerateCoreMetrics
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            apiURL={apiURL}
            token={token}
            header={header}
          />
        );
      case 8:
        return (
          <AddApps
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            apiURL={apiURL}
            token={token}
            header={header}
          />
        );
      case 9:
        return (
          <DnsHistory
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            apiURL={apiURL}
            token={token}
            header={header}
          />
        );
      case 10:
        return (
          <RealTimeData
            exitBtn={exitDemo}
            backBtn={prevPage}
            operatorId={operatorId}
            apiURL={apiURL}
            token={token}
            header={header}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <Taskbar homepage={handleImageClick} sales={handleSalesPage} />
      {(salesPage && <SalesRecords />) || renderPage()}
    </main>
  );
};

export default Main;
