import {useEffect, useState} from 'react';

export default function Brand({
  style,
  showMenu,
}: {
  style: string;
  showMenu: boolean;
}) {
  const [show, setShow] = useState(0);
  useEffect(() => {
    setShow(1);
  }, []);

  return (
    <div
      className={`bg-fosfor pt-4 pb-4 ${style}`}
      style={{
        opacity: `${!showMenu && show ? '1' : '0'}`,
        transition: 'opacity 1s ease-in-out',
      }}>
      <p className="ml-4 w-[88px] break-words pt-[-15px] font-myFont text-sm font-light leading-tight tracking-wider text-black">
        Capital Knowledge Resources
      </p>
      <p className="ml-4 w-[88px] break-words pt-[-15px] font-myFont text-sm font-light leading-tight tracking-wider text-black">
        at Ataol
      </p>
    </div>
  );
}
