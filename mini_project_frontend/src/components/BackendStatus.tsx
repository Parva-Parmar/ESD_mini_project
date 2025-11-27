import React, { useEffect } from 'react';
import useBackendHealth from '../hooks/useBackendHealth';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

const BackendStatus: React.FC = () => {
  const { isHealthy, lastChecked, error } = useBackendHealth();
  const navigate = useNavigate();

  useEffect(() => {
    // If backend is down, redirect to the error page
    if (isHealthy === false) {
      navigate('/error', { 
        state: { 
          title: 'Service Unavailable',
          message: 'Oops! Our servers are currently down. We\'re working to fix this as soon as possible.',
          details: error || 'Please try again later.'
        },
        replace: true 
      });
    }
  }, [isHealthy, error, navigate]);

  if (isHealthy === null) {
    return null; // Don't show anything on initial load
  }

  const statusText = isHealthy ? 'Backend is operational' : 'Trying to reconnect...';
  const statusClass = isHealthy ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  const lastCheckedText = lastChecked ? `Last checked: ${lastChecked.toLocaleTimeString()}` : '';

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${statusClass} max-w-xs z-50`}>
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${isHealthy ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
        <div>
          <p className="font-medium">{statusText}</p>
          {error && <p className="text-sm">{error}</p>}
          {lastChecked && <p className="text-xs opacity-75">{lastCheckedText}</p>}
        </div>
      </div>
    </div>
  );
};

export default BackendStatus;
