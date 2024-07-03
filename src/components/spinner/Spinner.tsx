import React from "react";
import { PulseLoader } from "react-spinners";

interface LoadingSpinnerProps {
  loading?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  return (
    <div className="loading-spinner">
      <PulseLoader color="#82c8c4" loading={loading} margin={2} size={15} />
    </div>
  );
};

