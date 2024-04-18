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
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [staffNameInput, setStaffNameInput] = useState("");
  const [operatorId, setOperatorId] = useState<string>("");
  const [salesPage, setSalesPage] = useState<boolean>(false);
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
            staffName={staffNameInput}
            operatorId={operatorId}
            setOperatorId={setOperatorId}
          />
        );
      case 3:
        return (
          <UserAccount
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
          />
        );
      case 4:
        return (
          <GenerateRandomAccounts
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
          />
        );
      case 5:
        return (
          <GenerateRandomDevices
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
          />
        );
      case 6:
        return (
          <GenerateCoreThreats
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
          />
        );
      case 7:
        return (
          <GenerateCoreMetrics
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
          />
        );
      case 8:
        return (
          <AddApps
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
          />
        );
      case 9:
        return (
          <DnsHistory
            nextBtn={nextPage}
            backBtn={prevPage}
            operatorId={operatorId}
          />
        );
      case 10:
        return (
          <RealTimeData
            exitBtn={exitDemo}
            backBtn={prevPage}
            operatorId={operatorId}
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
}
