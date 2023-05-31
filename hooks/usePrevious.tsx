import {useEffect, useRef} from 'react';

// Hook
export default function usePrevious(value: any) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]); 
  
  return ref.current;
}
