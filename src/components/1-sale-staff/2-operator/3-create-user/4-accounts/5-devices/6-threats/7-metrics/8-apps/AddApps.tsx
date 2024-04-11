'use client'

import "../../../../../../../../../app/App.scss"

interface AddAppsProps {
  nextBtn: () => void;
  backBtn: () => void;
  operatorId: string;
}

export const AddApps: React.FC<AddAppsProps> = ({
  nextBtn,
  backBtn,
  operatorId,
}) => {

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Add Apps to Devices</h1>
      </div>

      <div className="common-container-body">
        <label>Add apps to devices</label>
        <button>ADD APPS</button>
      </div>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={nextBtn}>NEXT</button>
      </div>
    </div>
  );
};
