"use client";

import { usePathname } from "next/navigation";

import { cleanPathname } from "@/utils/cleanPathname";

import SinkingShipSvg from "@/components/svg/SinkingShipSvg";
import "./LocaleMenu.scss";

const localizationList = [
  {
    title: "UA",
    name: "uk",
  },
  {
    title: "EN",
    name: "en",
  },
  {
    title: "RU",
    name: "ru",
    icon: <SinkingShipSvg />,
  },
];

const LocaleMenu = () => {
  const pathname = usePathname();

  const switchLocale = (locale: string) => {
    const currentPath = cleanPathname(pathname);
    const newPath = `/${locale}${currentPath}`;
    window.history.replaceState(null, "", newPath);
  };

  return (
    <ul className="locale-menu mobile-menu__item">
      {localizationList.map((locale) => {
        return (
          !pathname.includes(locale.name) && (
            <li key={locale.name}>
              {locale.name !== "ru" ? (
                <button
                  type="button"
                  className="locale-menu__btn"
                  onClick={() => switchLocale(locale.name)}
                >
                  {locale.title}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => switchLocale(locale.name)}
                  className="locale-menu__btn"
                >
                  <SinkingShipSvg />
                </button>
              )}
            </li>
          )
        );
      })}
    </ul>
  );
};

export default LocaleMenu;
