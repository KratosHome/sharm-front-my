"use client";
import React, { useState } from "react";
import Link from "next/link";

import MobileMenu from "../../Navigation/MobileMenu/MobileMenu";
import UserNavLink from "../../Navigation/UserNavLink/UserNav";
import SearchNav from "../../Navigation/SearchNav/SearchNav";

import BurgerMenuSvg from "@/components/svg/BurgerMenuSvg";
import CloseSvg from "@/components/svg/CloseSvg";
import LogoSvg from "@/components/svg/LogoSvg";

import "./MainHeader.scss";

const MainHeader = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const menuToggle = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <div className="main-header-client">
      <SearchNav />
      <div className="mobile-only">
        <button type="button" className="burger-menu-btn" onClick={menuToggle}>
          {isOpenMenu ? <CloseSvg /> : <BurgerMenuSvg />}
        </button>
        {isOpenMenu && <MobileMenu />}
      </div>

      <Link href="/" className="logo--header">
        <LogoSvg />
      </Link>
      {!isOpenMenu && <UserNavLink />}
    </div>
  );
};

export default MainHeader;
