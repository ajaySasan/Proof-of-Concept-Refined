import React from "react";
import { PulseLoader } from "react-spinners";
import "../../app/App.scss";

interface LoadingSpinnerProps {
  loading?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  return (
    <div className="loading-spinner">
      <PulseLoader color="#35b888" loading={loading} margin={2} size={15} />
    </div>
  );
};

