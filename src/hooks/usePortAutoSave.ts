import { useCallback, useRef } from 'react';
import { useApi } from '@/contexts/ApiContext';

export const usePortAutoSave = () => {
  const { baseUrl, fetchWithHeaders } = useApi();
  const timeoutRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const savePortAutomatically = useCallback(async (robotType: 'leader' | 'follower', port: string) => {
    if (!port.trim()) return;
    
    try {
      await fetchWithHeaders(`${baseUrl}/save-robot-port`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          robot_type: robotType,
          port: port.trim(),
        }),
      });
      console.log(`Auto-saved ${robotType} port: ${port}`);
    } catch (error) {
      console.error(`Error saving ${robotType} port:`, error);
    }
  }, [baseUrl, fetchWithHeaders]);

  const debouncedSavePort = useCallback((robotType: 'leader' | 'follower', port: string, delay: number = 1500) => {
    // Clear existing timeout for this robotType
    if (timeoutRefs.current[robotType]) {
      clearTimeout(timeoutRefs.current[robotType]);
    }

    // Set new timeout
    timeoutRefs.current[robotType] = setTimeout(() => {
      savePortAutomatically(robotType, port);
      delete timeoutRefs.current[robotType];
    }, delay);
  }, [savePortAutomatically]);

  return { debouncedSavePort };
};