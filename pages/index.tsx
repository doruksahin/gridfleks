import Brand from '@/components/Brand';
import Hamburger from '@/components/Hamurger';
import Menu from '@/components/Menu';
import NodeScreen from '@/components/NodeScreen';

import {useEffect, useState} from 'react';

// h-screen, why it does not affect children?
// px vs rem
// overflow hidden olmayınca mt-4 üstteki classı etkiliyor ne alaka???
// nbsp olayını not al - https://stackoverflow.com/questions/1762539/margin-on-child-element-moves-parent-element

export default function Home() {
  const [content, setContent] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<boolean>(true);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowMenu(true);
    } else {
      setIsMobileScreen(true);
    }
  }, []);

  const onMenuItemWithContentClick = () => {
    if (isMobileScreen) {
      setShowMenu(!showMenu);
      setBgColor(!bgColor);
    }
  };

  return (
    <div
      className="max-h-full"
      style={{
        backgroundColor: `${bgColor ? '#eae8e5' : '#bdb7ad'}`,
        transition: 'background-color 2s ease',
      }}>
      <Menu
        setContent={setContent}
        showMenu={showMenu}
        onMenuItemWithContentClick={onMenuItemWithContentClick}></Menu>
      <div className="h-screen">
        <div className="h-1/6">
          <div className="flex justify-between">
            <Brand showMenu={showMenu} style="md:hidden block" />
            <div className=" mr-4 mt-4 md:hidden">
              <Hamburger
                onClick={() => {
                  setShowMenu(!showMenu);
                  setBgColor(!bgColor);
                }}
              />
            </div>
          </div>
        </div>
        {content ? <>{content}</> : <NodeScreen />}
      </div>
    </div>
  );
}
