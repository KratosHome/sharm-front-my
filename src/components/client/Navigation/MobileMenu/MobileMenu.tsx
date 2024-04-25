import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import NavBar from "../../Header/NavBar/NavBar";
import UserNavLink from "../UserNavLink/UserNav";
import SearchNav from "../SearchNav/SearchNav";
import LocaleMenu from "../LocaleMenu/LocaleMenu";

import { extraMenuLink } from "@/mokData/navLinksData";

import "./MobileMenu.scss";
import { ActiveLink } from "@/components/UI/ActiveLink/ActivLink";
import ThemeSwitcher from "@/components/general/ThemeSwitcher/ThemeSwitcher";

const MenuAnimationVariants = {
  open: {
    clipPath: `circle(150% at 0 0)`,
    duration: 0.5,
    ease: "power2.inOut",
  },
  closed: {
    clipPath: "circle(0% at 0 0)",
    duration: 0.5,
    ease: "power2.inOut",
  },
};

const AnimationVariants = {
  open: {
    y: 0,
    opacity: 1,
    ease: "power4.out",
    duration: 0.6,
    stagger: 0.1,
  },
  closed: {
    y: 50,
    opacity: 0,
    ease: "power4.out",
    duration: 0.6,
    stagger: 0.2,
  },
};

const MobileMenu = ({
  isOpen,
  closeMenu,
}: {
  isOpen: boolean;
  closeMenu: () => void;
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (isOpen) {
        gsap
          .timeline()
          .set(menuRef.current, { display: "initial" })
          .to(menuRef.current, MenuAnimationVariants.open);

        const elements =
          menuRef?.current?.querySelectorAll(".mobile-menu__item") || null;
        gsap.fromTo(elements, AnimationVariants.closed, AnimationVariants.open);
      } else {
        gsap
          .timeline()
          .to(menuRef.current, MenuAnimationVariants.closed)
          .set(menuRef.current, { display: "none" });
      }
    },
    { dependencies: [isOpen] }
  );

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
              onClick={closeMenu}
            >
              <ActiveLink rout={menu.path}>{menu.title}</ActiveLink>
            </li>
          ))}
        </ul>
        <NavBar isMobileMenuOpen={true} />
      </div>
      <UserNavLink isMobileMenuOpen={true} closeMenu={closeMenu} />
      <div
        style={{ display: "flex", alignItems: "center", paddingLeft: "16px" }}
      >
        <ThemeSwitcher />
        <LocaleMenu />
      </div>
    </div>
  );
};

export default MobileMenu;
