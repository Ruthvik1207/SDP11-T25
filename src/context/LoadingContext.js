import React, { createContext, useState, useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const value = { loading, setLoading };

  return (
    <LoadingContext.Provider value={value}>
      {loading && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }

  return context;
}