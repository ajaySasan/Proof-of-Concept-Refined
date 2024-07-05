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
import { Vortex } from "@/components/ui/vortex";
import { VortexDemoSecond } from "@/components/ui/VortexBg";
import { WelcomePage } from "@/components/WelcomePage";
import { useState, useMemo } from "react";

interface HomeProps {
  token: string;
  paToken: string;
  apiURL: string;
  setApiEnviroment: (env: string) => void;
}

export const Main: React.FC<HomeProps> = ({
  token,
  paToken,
  apiURL,
  setApiEnviroment,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [staffNameInput, setStaffNameInput] = useState("");
  const [operatorId, setOperatorId] = useState<string>("");
  const [salesPage, setSalesPage] = useState<boolean>(false);
  const [selectedSubdomain, setSelectedSubdomain] = useState<string>("");

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
    window.location.reload();
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
        return (
          <WelcomePage nextBtn={nextPage} apiEnviroment={setApiEnviroment} />
        );
      case 1:
        return (
          <SalesStaff
            nextBtn={nextPage}
            skipBtn={nextPage}
            backBtn={prevPage}
            staffName={handleStaffName}
          />
        );
      case 2:
        return (
          <Operator
            nextBtn={nextPage}
            skipBtn={nextPage}
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
            skipBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
            staffName={staffNameInput}
            operatorDomain={selectedSubdomain}
            apiURL={apiURL}
            token={token}
          />
        );
      case 4:
        return (
          <GenerateRandomAccounts
            nextBtn={nextPage}
            skipBtn={nextPage}
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
            skipBtn={nextPage}
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
            skipBtn={nextPage}
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
            skipBtn={nextPage}
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
            skipBtn={nextPage}
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
            skipBtn={nextPage}
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
    <div className="app-container">
      <div className="particle-bg">
        <VortexDemoSecond />
      </div>
      <Taskbar homepage={handleImageClick} sales={handleSalesPage} />
      {(salesPage && <SalesRecords />) || renderPage()}
    </div>
  );
};

export default Main;
