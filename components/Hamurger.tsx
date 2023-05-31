import {useEffect, useState} from 'react';

export default function Hamburger({onClick}: {onClick?: () => void}) {
  const [show, setShow] = useState(0);
  useEffect(() => {
    setShow(1);
  }, []);
  return (
    <div
      className="cursor-pointer space-y-2"
      onClick={onClick}
      style={{
        opacity: `${show ? '1' : '0'}`,
        transition: 'opacity 1s ease-in-out',
      }}>
      <span className="block h-1 w-8 bg-gray-600"></span>
      <span className="block h-1 w-8 bg-gray-600"></span>
      <span className="block h-1 w-8 bg-gray-600"></span>
    </div>
  );
}
