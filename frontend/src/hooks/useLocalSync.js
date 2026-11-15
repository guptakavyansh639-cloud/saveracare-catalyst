import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

export function useLocalSync(key, apiPath, defaultValue = null) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await api(apiPath);
      setData(result);
      localStorage.setItem(key, JSON.stringify(result));
      setError(null);
    } catch (err) {
      setError(err.message);
      // fallback to localStorage data already in state
    } finally {
      setLoading(false);
    }
  }, [key, apiPath]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const update = useCallback((newData) => {
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  }, [key]);

  return { data, setData: update, loading, error, refetch: fetchData };
}
