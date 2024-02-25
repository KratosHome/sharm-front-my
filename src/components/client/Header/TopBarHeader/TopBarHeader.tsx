import Link from "next/link";

import LocaleMenu from "../../Navigation/LocaleMenu/LocaleMenu";

import PhoneSvg from "@/components/svg/PhoneSvg";

import { topBarLinks } from "@/mokData/navLinksData";

import "./TopBarHeader.scss";

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
            <Link href={menu.path}>{menu.title}</Link>
          </li>
        ))}
      </ul>
      <LocaleMenu />
    </div>
  );
};

export default TopBarHeader;
