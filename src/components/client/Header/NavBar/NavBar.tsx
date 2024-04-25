"use client";
import Link from "next/link";
import React, { useState } from "react";

import SubNav from "../../Navigation/SubNav/SubNav";

import ArrowDownSvg from "@/components/svg/ArrowDownSvg";

import { navLink } from "@/mokData/navLinksData";

import "./NavBar.scss";

const NavBar = ({ isMobileMenuOpen = false }) => {
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<{
    [key: number]: boolean;
  }>({});

  const subMenuToggle = (index?: number) => {
    const newSubMenuState: {
      [key: number]: boolean;
    } = {};

    for (let i = 0; i < navLink.length; i++) {
      newSubMenuState[i] = false;
    }

    if (typeof index !== "undefined") {
      newSubMenuState[index] = true;
    }

    setIsOpenSubMenu(newSubMenuState);
  };

  return (
    <ul
      className={`nav-bar__list ${isMobileMenuOpen ? "open" : "desktop-only"}`}
      onMouseLeave={() => !isMobileMenuOpen && subMenuToggle()}
    >
      {navLink.map((menu, index) => {
        return (
          <li key={menu.title} className={`nav-bar__item mobile-menu__item`}>
            <div
              className={`nav-bar__item--main ${menu.isLuxe ? "luxe" : ""} 
              ${isOpenSubMenu[index] ? "focused" : ""}`}
              onMouseEnter={() => !isMobileMenuOpen && subMenuToggle(index)}
            >
              <Link
                href={menu.path}
                onClick={() => (isMobileMenuOpen ? null : subMenuToggle(index))}
              >
                {menu.isLuxe && (
                  <p className="item__decor-slash desktop-only">/</p>
                )}
                {menu.title}
                {menu.isLuxe && (
                  <p className="item__decor-slash desktop-only">/</p>
                )}
              </Link>
              {menu?.child.length > 0 && (
                <button
                  type="button"
                  className={`sub-menu__btn
                  mobile-only
                   ${isOpenSubMenu[index] ? "sub-menu__btn--open" : ""}
                    `}
                  onClick={() =>
                    setIsOpenSubMenu((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                >
                  <ArrowDownSvg />
                </button>
              )}
            </div>
            {menu?.child.length > 0 && (
              <SubNav
                isOpen={isOpenSubMenu[index]}
                navLink={menu.child}
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
