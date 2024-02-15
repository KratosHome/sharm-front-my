import React, { useEffect, useState } from "react";
import Link from "next/link";

import gsap from "gsap";

import useDeviceType from "@/hooks/useDeviceType";

import MobileMenu from "../../Navigation/MobileMenu/MobileMenu";
import UserNavLink from "../../Navigation/UserNavLink/UserNav";
import SearchNav from "../../Navigation/SearchNav/SearchNav";

import BurgerMenuSvg from "@/components/svg/BurgerMenuSvg";
import CloseSvg from "@/components/svg/CloseSvg";
import LogoSvg from "@/components/svg/LogoSvg";

import "./MainHeader.scss";

const AnimationVariants = {
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

const MainHeader = () => {
  const { isDesktop } = useDeviceType();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    const element = document.getElementsByClassName("mob-menu");

    if (!element?.length) return;

    if (isOpenMenu) {
      gsap.fromTo(
        ".mob-menu",
        AnimationVariants.closed,
        AnimationVariants.open
      );
    }
  }, [isOpenMenu]);

  const menuToggle = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <div className="main-header">
      {isDesktop ? (
        <SearchNav />
      ) : (
        <>
          <button
            type="button"
            className="burger-menu-btn"
            onClick={menuToggle}
          >
            {isOpenMenu ? <CloseSvg /> : <BurgerMenuSvg />}
          </button>
          {isOpenMenu && <MobileMenu />}
        </>
      )}
      <Link href="/" className="logo--header">
        <LogoSvg />
      </Link>
      {!isOpenMenu && <UserNavLink />}
    </div>
  );
};

export default MainHeader;
