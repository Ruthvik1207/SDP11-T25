import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container" role="status">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;