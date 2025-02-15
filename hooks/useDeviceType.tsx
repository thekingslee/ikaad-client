import { useState, useEffect } from 'react';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  );

  const determineDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setDeviceType('mobile');
    } else if (width >= 768 && width < 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  };

  useEffect(() => {
    determineDeviceType();
    window.addEventListener('resize', determineDeviceType);
    return () => {
      window.removeEventListener('resize', determineDeviceType);
    };
  }, []);

  return { deviceType };
};

export default useDeviceType;
