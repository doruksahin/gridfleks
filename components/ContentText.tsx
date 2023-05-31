import {useEffect, useState} from 'react';

export default function ContentText({content}: {content: string}) {
  const [opacity, setOpacity] = useState<0 | 1>(0);
  useEffect(() => {
    setOpacity(1);
  }, []);
  return (
    <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-[50px]">
      <span
        className="inline-block text-center text-[26px] leading-[1.4] opacity-0"
        style={{
          opacity,
          transition: 'opacity 2s ease-in-out',
        }}>
        {content}
      </span>
    </div>
  );
}
