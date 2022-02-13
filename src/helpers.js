import { useCallback, useEffect, useState } from 'react';

export function formatNumber(number, decPlaces = 1) {
  let result = number;
  let isAbbreviated = false;
  decPlaces = Math.pow(10, decPlaces);
  const abbrev = ["k", "m", "b", "t"];
  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);
    if (size <= result) {
      result = Math.round(result * decPlaces / size) / decPlaces;
      if ((result === 1000) && (i < abbrev.length - 1)) {
        result = 1;
        i++;
      }
      result += abbrev[i];
      isAbbreviated = true;
      break;
    }
  }

  return isAbbreviated ? result : Math.round(result, decPlaces);
}

export const useDetectRefDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  const setCurrentDimensions = useCallback(() => {
    const { current } = ref;
    const boundingRect = current.getBoundingClientRect();
    const { width, height } = boundingRect;
    setDimensions({ width: Math.round(width), height: Math.round(height) });
  }, [ref]);

  useEffect(() => {
    if (ref.current) setCurrentDimensions();
    window.addEventListener('resize', setCurrentDimensions);
    return () => window.removeEventListener('resize', setCurrentDimensions);
  }, [ref, setCurrentDimensions]);

  return dimensions;
};
