import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import NavBar from "../../Header/NavBar/NavBar";
import UserNavLink from "../UserNavLink/UserNav";
import SearchNav from "../SearchNav/SearchNav";
import LocaleMenu from "../LocaleMenu/LocaleMenu";

import { extraMenuLink } from "@/mokData/navLinksData";

import "./MobileMenu.scss";

const MenuAnimationVariants = {
  open: {
    clipPath: `circle(150% at 0 0)`,
    duration: 0.8,
    ease: "power2.inOut",
  },
  closed: {
    clipPath: "circle(0px at 0 0)",
    duration: 0.5,
    ease: "power2.inOut",
  },
};

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
  const menuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      menuRef.current,
      MenuAnimationVariants.closed,
      MenuAnimationVariants.open
    );

    const elements =
      menuRef?.current?.querySelectorAll(".mobile-menu__item") || null;
    gsap.fromTo(elements, AnimationVariants.closed, AnimationVariants.open);
  });

  return (
    <div ref={menuRef} className={`mobile-menu__container mob-menu`}>
      <div>
        <SearchNav isMobile={true} />
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
        <NavBar isMobileMenuOpen={true} />
      </div>
      <UserNavLink isMobileMenuOpen={true} />
      <LocaleMenu />
    </div>
  );
};

export default MobileMenu;
