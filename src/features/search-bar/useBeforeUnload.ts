import { useEffect, useRef, useState } from 'react';
import { setSearchValueToStorage } from 'shared/helpers/storage';

export const useBeforeUnload = () => {
  const [updatedValue, setUpdatedValue] = useState<string | null>(null);
  const refValue = useRef<string | null>(null);

  useEffect(() => {
    const updateLocalStorage = () => {
      if (typeof refValue.current === 'string') {
        setSearchValueToStorage(refValue.current);
      }
    };

    window.addEventListener('beforeunload', updateLocalStorage);

    return () => {
      updateLocalStorage();
      window.removeEventListener('beforeunload', updateLocalStorage);
    };
  }, []);

  useEffect(() => {
    refValue.current = updatedValue;
  }, [updatedValue]);

  return setUpdatedValue;
};
