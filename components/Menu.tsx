import ArrowIcon from '@/components/ArrowIcon';
import BgAnimation from '@/components/BgAnimation';
import Brand from '@/components/Brand';
import ContentText from '@/components/ContentText';
import NodeScreen from '@/components/NodeScreen';
import Pdf from '@/components/Pdf';
import WorldCloud from '@/components/WordCloud';
import usePrevious from '@/hooks/usePrevious';
import {useEffect, useState} from 'react';
import uuid from 'react-uuid';

export default function Menu({
  setContent,
  showMenu,
  onMenuItemWithContentClick,
}: {
  setContent: (arg0: string | null) => void;
  showMenu: boolean;
  onMenuItemWithContentClick: () => void;
}) {
  const [titleId, setTitleId] = useState<number | null>(null);
  const [subtitleId, setSubtitleId] = useState<number | null>(null);
  const [subsubtitleId, setSubsubtitleId] = useState<number | null>(null);
  const [titleOpacity, setTitleOpacity] = useState<0 | 1>(1);
  const [subtitleOpacity, setSubtitleOpacity] = useState<0 | 1>(0);
  const [subsubtitleOpacity, setSubsubtitleOpacity] = useState<0 | 1>(0);

  const [currentMenu, setCurrentMenu] = useState<
    'title' | 'subtitle' | 'subsubtitle'
  >('title');
  const prevMenu = usePrevious(currentMenu);
  const [lastSelectedContent, setLastSelectedContent] = useState({});
  const animationLength = 0; //todo
  const animLengthSec = 2;

  type dataType = typeof data;
  type titleData = dataType[number];
  type subtitleType = dataType[number]['subtitles'];
  const onTitleSelect = (index: number) => {
    const titleItem = data[index];
    setTitleId(index);
    if (titleItem.content) {
      setLastSelectedContent({
        level: 'title',
        levelKey: titleItem.title,
        index,
      });
      setContent(titleItem.content);
      onMenuItemWithContentClick();
    } else if (titleItem.subtitles) {
      setCurrentMenu('subtitle'); // 1 ekler
    }
  };

  const onSubtitleSelect = (index: number) => {
    const subtitleItem = data[titleId]['subtitles'][index];
    setSubtitleId(index);
    if (subtitleItem.content) {
      setLastSelectedContent({
        level: 'subtitle',
        levelKey: subtitleItem.subtitle,
        index,
      });
      setContent(subtitleItem.content);
      onMenuItemWithContentClick();
    } else if (subtitleItem.subsubtitles) {
      setCurrentMenu('subsubtitle');
    }
  };

  const onSubsubtitleSelect = (index: number) => {
    const subsubtitleItem =
      data[titleId]['subtitles'][subtitleId]['subsubtitles'][index];
    setSubsubtitleId(index);
    setLastSelectedContent({
      level: 'subsubtitle',
      levelKey: subsubtitleItem.subsubtitle,
      index,
    });
    setContent(subsubtitleItem.content);
    onMenuItemWithContentClick();
  };

  const onGoBack = () => {
    if (currentMenu == 'subsubtitle') {
      setCurrentMenu('subtitle');
    } else if (currentMenu == 'subtitle') {
      setCurrentMenu('title');
    }
  };

  useEffect(() => {
    if (isDescendedToTitle()) {
      console.log('descended to title, title panel comes');
      setTitleOpacity(1);
      setSubtitleOpacity(0);
    } else if (isAscendedToSubtitle()) {
      console.log('ascended to subtitle, subtitle panel comes');
      setTitleOpacity(0);
      setSubtitleOpacity(1);
    } else if (isDescendedToSubtitle()) {
      console.log('descended to subtitle, subtitle panel comes');
      setSubtitleOpacity(1);
      setSubsubtitleOpacity(0);
    } else if (isAscendedToSubsubtitle()) {
      console.log('ascended to subsubtitle, subsubtitle panel comes');
      setTitleOpacity(0);
      setSubtitleOpacity(0);
      setSubsubtitleOpacity(1);
    } else if (isSubsubtitleDeselected()) {
      console.log('????');
      setSubtitleOpacity(1);
    } else {
      console.log('elsed');
    }
  }, [currentMenu]);

  useEffect(() => {}, [currentMenu]);

  useEffect(() => {}, [currentMenu]);

  const isDescendedToTitle = () =>
    currentMenu == 'title' && prevMenu == 'subtitle' && prevMenu != undefined;
  const isAscendedToSubtitle = () =>
    currentMenu == 'subtitle' && prevMenu == 'title';
  const isDescendedToSubtitle = () =>
    currentMenu == 'subtitle' && prevMenu == 'subsubtitle';
  const isAscendedToSubsubtitle = () =>
    currentMenu == 'subsubtitle' && prevMenu == 'subtitle';
  const isSubsubtitleSelected = () =>
    currentMenu == 'subsubtitle' && prevMenu != 'subsubtitle';
  const isSubsubtitleDeselected = () =>
    currentMenu != 'subsubtitle' && prevMenu == 'subsubtitle';

  const data = [
    {
      title: 'Connected Tools',
      subtitles: [
        {
          subtitle: 'Loans',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Supply chain',
          content: <ContentContainer />,
        },
        {
          subtitle: 'M&A Day 1 check list',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Financial/Legal Due Diligence',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Cap Table',
          content: <ContentContainer />,
        },
      ],
    },
    {
      title: 'Why we founded the Lab',
      subtitles: [
        {
          subtitle: 'Our Mission',
          subsubtitles: [
            {
              subsubtitle:
                'The Programme (in association with Ataol Internship Programme',
              content: <ContentContainer />,
            },
            {
              subsubtitle:
                'Partnerships (Tech companies + Accountants + Law firms)',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Pocket guide',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Apply',
              content: <ContentContainer />,
            },
          ],
        },
        {
          subtitle: 'Our Culture',
          subsubtitles: [
            {
              subsubtitle: "The Committee/L'Assemblee",
              content: <ContentContainer />,
            },
            {
              subsubtitle: "The Pioneers/Peers/L'Equipe",
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'The Model (Alara Liz)',
              content: <ContentContainer />,
            },
          ],
        },
      ],
    },
    {
      title: 'To Whom',
      subtitles: [
        {
          subtitle: 'To the founders',
          subsubtitles: [
            {
              subsubtitle: 'Launch',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Design',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Benchmarking',
              content: <ContentContainer />,
            },
          ],
        },
        {
          subtitle: 'To the investors',
          subsubtitles: [
            {
              subsubtitle: 'Break-even',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Controlling',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Organization',
              content: <ContentContainer />,
            },
          ],
        },
      ],
    },
    {
      title: 'Our expertise',
      subtitles: [
        {
          subtitle: 'Startup CFO',
          subsubtitles: [
            {
              subsubtitle: 'Business Planning',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Reporting',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Forecasting',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Admin',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Projects',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Analysis',
              content: <ContentContainer />,
            },
          ],
        },
        {
          subtitle: 'Capital Climate',
          content: <ContentContainer />,
        },
        {
          subtitle: '(Dilara)',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Deal action plan/approach/path',
          subsubtitles: [
            {
              subsubtitle: 'M&A - Due diligence',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Legal Affairs - Structuring & Drafting',
              content: <ContentContainer />,
            },
            {
              subsubtitle: 'Founding rounds',
              content: <ContentContainer />,
            },
          ],
        },
      ],
    },
    {
      title: 'Knowledge Hub',
      subtitles: [
        {
          subtitle: 'Entrepreneurship labs',
          content: <ContentContainer />,
        },
        {
          subtitle: 'White papers',
          content: <ContentContainer />,
        },
      ],
    },
    {
      title: 'Keep up with us',
      subtitles: [
        {
          subtitle: 'Campuses',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Prix',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Job Openings - Apply via Linkedin',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Alumni',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Communications (target audience pdf)',
          content: <ContentContainer />,
        },
        {
          subtitle: 'Social Media',
          content: <ContentContainer />,
        },
      ],
    },
    {
      title: 'Contact us',
      content: <ContentText key={37} content={'(ask[at]theb2blab.com)'} />,
    },
    {
      title: 'FAQ',
      content: <ContentContainer />,
    },
    {title: 'Legal Information', content: <Pdf />},
  ];

  /*

          <div
          key={index}
          id={index == selectedIndex ? 'selected' : 'not-selected'}
          className="absolute top-1/4 left-1/4 mt-10 w-1/2">
          <span
            className="inline-block text-center text-[26px] leading-[1.4]"
            style={{
              opacity: showContents ? (index == selectedIndex ? 1 : 0) : 0,
              transition: 'opacity 2s ease-in-out',
            }}>
            {content}
          </span>
        </div>

  */

  return (
    <div
      className="fixed left-0  z-10 h-full w-60 bg-myGray md:block"
      style={{
        opacity: `${showMenu ? '1' : '0'}`,
        transform: `${showMenu ? 'translateX(0)' : 'translateX(-200px)'}`,
        transition: `transform ${animLengthSec}s ease-in-out, opacity ${animLengthSec}s ease-in-out`,
      }}>
      <Brand
        style={'mt-4 ml-4 w-28 md:mx-0 md:w-28 md:mt-0'}
        showMenu={false}
      />

      <div className="mt-5">
        <div
          className={`${
            currentMenu != 'title' ? 'opacity-70' : 'opacity-0'
          } top-25 absolute z-40 ml-2 h-10 w-6 cursor-pointer text-black transition-opacity duration-[2000ms]`}
          onClick={() => onGoBack()}>
          <ArrowIcon />
        </div>

        <Items
          titleOpacity={titleOpacity}
          subtitleOpacity={subtitleOpacity}
          titleId={titleId}
          onSubtitleSelect={onSubtitleSelect}
          subsubtitleOpacity={subsubtitleOpacity}
          subtitleId={subtitleId}
          onSubsubtitleSelect={onSubsubtitleSelect}
          data={data}
          onTitleSelect={onTitleSelect}
          animLengthSec={animLengthSec}
          currentMenu={currentMenu}
          lastSelectedContent={lastSelectedContent}
          subsubtitleId={subsubtitleId}
        />
      </div>
    </div>
  );
}

const Items = ({
  titleOpacity,
  subtitleOpacity,
  titleId,
  onSubtitleSelect,
  subsubtitleOpacity,
  subtitleId,
  onSubsubtitleSelect,
  data,
  onTitleSelect,
  animLengthSec,
  currentMenu,
  lastSelectedContent,
  subsubtitleId,
}: {
  titleOpacity: number;
  subtitleOpacity: number;
  titleId: number | null;
  subsubtitleOpacity: number;
  onSubtitleSelect: (arg0: number) => void;
  subtitleId: number | null;
  onSubsubtitleSelect: (arg0: number) => void;
  data: any;
  onTitleSelect: (arg0: number) => void;
  animLengthSec: number;
  currentMenu: 'title' | 'subtitle' | 'subsubtitle';
  lastSelectedContent: any;
  subsubtitleId: number | null;
}) => {
  return (
    <div className="absolute h-full w-full">
      <div
        className={`absolute top-5 left-0 h-full `}
        style={{
          opacity: `${titleOpacity ? '1' : '0'}`,
          transform: `${titleOpacity ? 'translateX(0)' : 'translateX(-200px)'}`,
          transition: `transform ${animLengthSec}s ease-in-out, opacity ${animLengthSec}s ease-in-out`,
        }}>
        {data.map((item, index) => {
          return (
            <a
              key={index}
              className={`${
                lastSelectedContent.level == 'title' &&
                lastSelectedContent.levelKey == item.title &&
                lastSelectedContent.index == index
                  ? 'menu-item-selected '
                  : ''
              }${
                item.subtitles ? 'text-gray-500 ' : 'text-black '
              } menu-item flex cursor-pointer p-2 font-myFont text-base`}
              onClick={() => {
                onTitleSelect(index);
              }}>
              <span className="ml-4">{item.title}</span>
            </a>
          );
        })}
      </div>
      <div
        className={`absolute top-5 left-0`}
        style={{
          opacity: `${subtitleOpacity ? '1' : '0'}`,
          transform: `${
            subtitleOpacity ? 'translateX(0)' : 'translateX(-200px)'
          }`,
          transition: `transform ${animLengthSec}s ease-in-out, opacity ${animLengthSec}s ease-in-out`,
        }}>
        {titleId != null &&
          data[titleId]['subtitles'] &&
          data[titleId]['subtitles'].map((item, index) => (
            <a
              key={index}
              className={` ${
                lastSelectedContent.level == 'subtitle' &&
                lastSelectedContent.levelKey == item.subtitle &&
                lastSelectedContent.index == index
                  ? 'menu-item-selected '
                  : ''
              }${
                item.subsubtitles ? 'text-gray-500 ' : 'text-black '
              } menu-item flex cursor-pointer items-center p-2 font-myFont text-base`}
              onClick={() => onSubtitleSelect(index)}>
              <span className="ml-4"> {item.subtitle}</span>
            </a>
          ))}
      </div>
      <div
        className={`absolute top-5 left-0`}
        style={{
          opacity: `${subsubtitleOpacity ? '1' : '0'}`,
          transform: `${
            subsubtitleOpacity ? 'translateX(0)' : 'translateX(-200px)'
          }`,
          transition: `transform ${animLengthSec}s ease-in-out, opacity ${animLengthSec}s ease-in-out`,
        }}>
        {titleId != null &&
          data[titleId]['subtitles'] &&
          subtitleId != null &&
          data[titleId]['subtitles'][subtitleId]['subsubtitles'] &&
          data[titleId]['subtitles'][subtitleId]['subsubtitles'].map(
            (item, index) => (
              <a
                key={index}
                className={`${
                  lastSelectedContent.level == 'subsubtitle' &&
                  lastSelectedContent.index == index
                    ? 'menu-item-selected '
                    : ''
                }  menu-item flex cursor-pointer items-center p-2 font-myFont text-base text-black`}
                onClick={() => onSubsubtitleSelect(index)}>
                <span className="ml-4"> {item.subsubtitle}</span>
              </a>
            ),
          )}
      </div>
      <SocialMediaButtons></SocialMediaButtons>
    </div>
  );
};

function ContentContainer() {
  return <NodeScreen key={uuid()} />;
}

function SocialMediaButtons() {
  return (
    <div className="relative top-[400px] ml-6 flex space-x-10">
      <a
        href="https://www.linkedin.com/company/capital-knowledge-resources-at-ataol/"
        target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 28 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      </a>
      <a
        href="https://twitter.com/weareataol"
        target="_blank"
        className="mt-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 28 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </a>
    </div>
  );
}
