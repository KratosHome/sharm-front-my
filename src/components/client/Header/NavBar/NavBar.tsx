"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { cleanPathname } from "@/utils/cleanPathname";

import SubNav from "../../Navigation/SubNav/SubNav";

import ArrowDownSvg from "@/components/svg/ArrowDownSvg";

import { navLink } from "@/mokData/navLinksData";

import "./NavBar.scss";
import { ActiveLink } from "@/components/UI/ActiveLink/ActivLink";

const NavBar = ({ isMobileMenuOpen = false }) => {
  const pathname = usePathname();

  const [isOpenSubMenu, setIsOpenSubMenu] = useState<{
    [key: number]: boolean;
  }>({});

  const subMenuToggle = (index: number, resetAll?: boolean) => {
    if (resetAll) {
      setIsOpenSubMenu({ [index]: true });
    } else {
      setIsOpenSubMenu((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  return (
    <ul
      className={`nav-bar__list ${isMobileMenuOpen ? "open" : "desktop-only"}`}
      onMouseLeave={() => !isMobileMenuOpen && setIsOpenSubMenu({})}
    >
      {navLink.map((menu, index) => {
        const newPathname = `/${cleanPathname(pathname)}`;

        return (
          <li key={menu.title} className={`nav-bar__item mobile-menu__item`}>
            <div
              className={`nav-bar__item--main 
              ${newPathname === menu.path ? "active" : ""} 
              ${!isMobileMenuOpen && isOpenSubMenu[index] ? "focused" : ""}
              `}
              onMouseEnter={() =>
                !isMobileMenuOpen && subMenuToggle(index, true)
              }
            >
              {newPathname === menu.path && (
                <p className="item__decor-slash desktop-only">/</p>
              )}
              <Link href={menu.path} onClick={() => subMenuToggle(index)}>
                {menu.title}
              </Link>
              {newPathname === menu.path && (
                <p className="item__decor-slash desktop-only">/</p>
              )}
              {menu?.child.length > 0 && (
                <button
                  type="button"
                  className={`sub-menu__btn
                  mobile-only
                   ${isOpenSubMenu[index] ? "sub-menu__btn--open" : ""}
                    `}
                  onClick={() => subMenuToggle(index)}
                >
                  <ArrowDownSvg />
                </button>
              )}
            </div>
            {isOpenSubMenu[index] && menu?.child.length > 0 && (
              <SubNav
                navLink={menu.child}
                menuToggle={!isMobileMenuOpen ? subMenuToggle : () => {}}
                navIndex={index}
                isMobile={isMobileMenuOpen}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavBar;
