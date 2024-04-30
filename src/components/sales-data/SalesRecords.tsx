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

  // Filter out duplicates based on staffName and operatorId
  const uniqueRecords = Array.from(new Set(salesRecords.map(record => JSON.stringify(record)))).map(record => JSON.parse(record));

  return (
    <div className="sale-data-container">
      <div className="sale-data-container-header">
        <h1>Sales Record</h1>
      </div>
      <button onClick={() => localStorage.clear()}>Clear Storage</button>

      {uniqueRecords.map((record, index) => (
        <div key={index} className="sale-data-body">
          <b>
            <b>
              <h2>Record {index + 1}</h2>
            </b>
          </b>
          <p>
            <b>
              <b>Staff Name:</b>
            </b>{" "}
            {record.staffName}
          </p>
          <p>
            <b>
              <b>Operator ID:</b>
            </b>{" "}
            {record.operatorId}
          </p>
          <p>
            <b>
              <b>Date:</b>
            </b>{" "}
            {record.date}
          </p>
        </div>
      ))}
    </div>
  );
};