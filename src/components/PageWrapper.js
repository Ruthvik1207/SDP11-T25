import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

const PageWrapper = ({ children }) => {
  const { setLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname, setLoading]);

  return <>{children}</>;
};

export default PageWrapper;