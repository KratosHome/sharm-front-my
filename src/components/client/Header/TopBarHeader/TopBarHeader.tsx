import Link from "next/link";

import LocaleMenu from "../../Navigation/LocaleMenu/LocaleMenu";

import PhoneSvg from "@/components/svg/PhoneSvg";

import { topBarLinks } from "@/mokData/navLinksData";

import "./TopBarHeader.scss";
import { ActiveLink } from "@/components/UI/ActiveLink/ActivLink";
import ThemeSwitcher from "@/components/general/ThemeSwitcher/ThemeSwitcher";

const TopBarHeader = () => {
  return (
    <div className="top-bar-header desktop-only">
      <div className="top-bar__phone">
        <Link className="phone-link" href="tel:0800505113">
          <PhoneSvg />
          {"[0800505113]"}
        </Link>
        <button type="button" className="phone-btn">
          Замовити дзвінок
        </button>
      </div>
      <ul className="top-bar-link__list">
        {topBarLinks.map((menu, index) => (
          <li
            key={`tb_${menu.title}_${index}`}
            className={`top-bar-link__item ${
              menu?.isPromotional ? "promotional" : ""
            }`}
          >
            <ActiveLink rout={menu.path}>{menu.title}</ActiveLink>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ThemeSwitcher />
        <LocaleMenu />
      </div>
    </div>
  );
};

export default TopBarHeader;
