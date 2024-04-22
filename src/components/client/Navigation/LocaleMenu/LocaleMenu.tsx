"use client";

import { usePathname, useRouter } from "next/navigation";

import { cleanPathname } from "@/utils/cleanPathname";

import SinkingShipSvg from "@/components/svg/SinkingShipSvg";

import { localizationList } from "@/mokData/navLinksData";

import "./LocaleMenu.scss";
import { useLocale } from "next-intl";

const LocaleMenu = () => {
  const pathname = usePathname();
  const {push} = useRouter();
  const locale = useLocale();
  const {name, title} = localizationList.filter(item => item.name === locale)[0];

  const switchLocale = () => {
    const localeLen = localizationList.length;
    const currentLocaleIndex = localizationList.findIndex((loc: { name: string; }) => loc.name === locale);
    
    const newLocale = currentLocaleIndex + 1 < localeLen ? localizationList[currentLocaleIndex+1].name : localizationList[0].name

    const currentPath = cleanPathname(pathname);
    const newPath = `/${newLocale}${currentPath}`;
    
    push(newPath);
  };

  return (
    <ul className="locale-menu mobile-menu__item">
      <li >
        <button
          type="button"
          className="locale-menu__btn"
          onClick={() => switchLocale()}
        >
          { name !== "ru" ? title : <SinkingShipSvg />}
        </button>
      </li>
    </ul>
  );
};

export default LocaleMenu;
