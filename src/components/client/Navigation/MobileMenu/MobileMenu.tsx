import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import NavBar from "../../Header/NavBar/NavBar";
import UserNavLink from "../UserNavLink/UserNav";
import SearchNav from "../SearchNav/SearchNav";
import LocaleMenu from "../LocaleMenu/LocaleMenu";

import "./MobileMenu.scss";

const extraMenuLink = [
  { title: "Акційні пропозиції", path: "#", isPromotional: true },
  { title: "Нові надходження", path: "#" },
];

const AnimationVariants = {
  open: {
    y: 0,
    opacity: 1,
    ease: "power4.out",
    duration: 1,
    stagger: 0.1,
  },
  closed: {
    y: 50,
    opacity: 0,
    ease: "power4.out",
    duration: 1,
    stagger: 0.2,
  },
};

const MobileMenu = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".mobile-menu__item",
      AnimationVariants.closed,
      AnimationVariants.open
    );
  });

  return (
    <div className={`mobile-menu__container mob-menu`}>
      <div>
        <SearchNav />
        <ul className="extra-menu__list">
          {extraMenuLink.map((menu, index) => (
            <li
              key={`${menu.path}_${index}`}
              className={`extra-menu__item ${
                menu?.isPromotional ? "promotional" : ""
              } mobile-menu__item`}
            >
              <Link href={menu.path}>{menu.title}</Link>
            </li>
          ))}
        </ul>
        <NavBar />
      </div>
      <UserNavLink isMobileMenuOpen={true} />
      <LocaleMenu />
    </div>
  );
};

export default MobileMenu;
