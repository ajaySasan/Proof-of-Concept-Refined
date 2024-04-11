'use client'

import "../../../../../../../../../../../app/App.scss"

interface RealTimeDataProps {
  exitBtn: () => void;
  backBtn: () => void;
  operatorId: string;
}

export const RealTimeData: React.FC<RealTimeDataProps> = ({
  exitBtn,
  backBtn,
  operatorId,
}) => {
  const handleExitMessage = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit the demo?"
    );
    if (confirmExit) {
      exitBtn();
    }
  };

  return (
    <div className="common-container">
      <div className="common-container-header">
        <h1>Add New Threats and Metrics</h1>
      </div>

      <div className="common-container-body">
        <label>Create new threats and metrics in real time</label>
        <p>
          Once "Start Demo" is selected, new threat and metric data will be
          added dynamically to showcase how our software and UI detect incoming
          threats live and in real time.
        </p>
        <button>START DEMO</button>
        <p>
          Upon selecting "Stop Demo," incoming data will cease, terminating the
          demonstration.
        </p>
        <button>STOP DEMO</button>
      </div>

      <div className="common-container-footer">
        <button onClick={backBtn}>BACK</button>
        <button onClick={handleExitMessage}>EXIT</button>
      </div>
    </div>
  );
};
