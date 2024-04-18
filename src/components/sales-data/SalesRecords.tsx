import React, { useEffect, useState } from "react";
import "./sales-records.scss";

interface SalesRecord {
  staffName: string;
  operatorId: string;
  date: string;
}

export const SalesRecords = () => {
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>(() => {
    
    const existingRecords = JSON.parse(
      localStorage.getItem("salesRecord") || "[]"
    ) as SalesRecord[];
    return existingRecords;
  });

  return (
    <div className="sale-data-container">
      <div className="sale-data-container-header">
        <h1>Sales Record</h1>
      </div>
      <button onClick={() => localStorage.clear()}>Clear Storage</button>

      {salesRecords.map((record, index) => (
        <div key={index}>
          <p>Record {index + 1}</p>
          <p>Staff Name: {record.staffName}</p>
          <p>Operator ID: {record.operatorId}</p>
          <p>Date: {record.date}</p>
        </div>
      ))}
    </div>
  );
};
