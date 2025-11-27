import { useState, useEffect, useCallback } from 'react';
import { checkBackendHealth } from '../utils/api';

export function useBackendHealth(interval = 30000) {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    try {
      const health = await checkBackendHealth();
      setIsHealthy(health.status === 'UP');
      setLastChecked(new Date());
      setError(null);
    } catch (err) {
      setIsHealthy(false);
      setError('Failed to connect to the backend');
      setLastChecked(new Date());
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkHealth();

    // Set up interval for periodic checks
    const healthCheckInterval = setInterval(checkHealth, interval);

    // Clean up interval on component unmount
    return () => clearInterval(healthCheckInterval);
  }, [checkHealth, interval]);

  return { isHealthy, lastChecked, error, checkHealth };
}

export default useBackendHealth;
