'use client'

import "../../../../../../../../../../app/App.scss"

interface DnsHistoryProps {
  nextBtn: () => void;
  backBtn: () => void;
  operatorId: string;
}

export const DnsHistory: React.FC<DnsHistoryProps> = ({
  nextBtn,
  backBtn,
  operatorId,
}) => {
  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Add DNS History</h1>
      </div>

      <div className="common-container-body">
        <label>Add DNS history to devices</label>
        <button>ADD DNS HISTORY</button>
      </div>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
