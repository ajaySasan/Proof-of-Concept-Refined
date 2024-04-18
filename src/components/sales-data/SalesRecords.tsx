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
        <div key={index} className="sale-data-body">
          <b><b><h2>Record {index + 1}</h2></b></b>
          <p><b><b>Staff Name:</b></b> {record.staffName}</p>
          <p><b><b>Operator ID:</b></b> {record.operatorId}</p>
          <p><b><b>Date:</b></b> {record.date}</p>
        </div>




      ))}
    </div>
  );
};


{/* <table key={index} className="sale-data-body">
<tr>
  <th>Record</th>
  <th>Staff Name</th>
  <th>Operator ID</th>
  <th>Date</th>
</tr>
<tr>
  <td>{index + 1}</td>
  <td>{record.staffName}</td>
  <td>{record.operatorId}</td>
  <td>{record.date}</td>
</tr>
</table> */}