import { useRef, useEffect } from 'react';

export const useDebouncedCallback = (callback, delay) => {
  const timeoutRef = useRef();

  const debounced = (...args) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return debounced;
};
