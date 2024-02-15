import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useDeviceType from "@/hooks/useDeviceType";
import { cleanPathname } from "@/utils/cleanPathname";

import SubNav from "../../Navigation/SubNav/SubNav";

import ArrowDownSvg from "@/components/svg/ArrowDownSvg";

import "./NavBar.scss";

const navLink = [
  {
    title: "Люкс",
    path: "/",
    child: [
      { title: "Шампунь", path: "#", child: [] },
      { title: "Бальзам для волосся", path: "#", child: [] },
    ],
  },
  {
    title: "Бренди",
    path: "#",
    child: [
      { title: "Бальзам для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Парфумерія",
    path: "#",
    child: [
      { title: "Спрей для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Макіяж",
    path: "#",
    child: [
      { title: "Бальзам для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Догляд за обличчям",
    path: "#",
    child: [
      { title: "Спрей для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Догляд за тілом",
    path: "#",
    child: [
      { title: "Бальзам для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Догляд за волоссям",
    path: "#",
    child: [
      { title: "Шампунь", path: "#", child: [] },
      { title: "Бальзам для волосся", path: "#", child: [] },
    ],
  },
  {
    title: "Товари для дому",
    path: "#",
    child: [
      { title: "Шампунь", path: "#", child: [] },
      { title: "Бальзам для волосся", path: "#", child: [] },
    ],
  },
];

const AnimationVariants = {
  open: {
    y: "99%",
    opacity: 1,
    ease: "power1.out",
    duration: 1,
  },
  closed: {
    opacity: 0,
    ease: "power1.out",
    duration: 1,
  },
};

const NavBar = () => {
  const pathname = usePathname();
  const { isDesktop } = useDeviceType();

  const [isOpenSubMenu, setIsOpenSubMenu] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const element = document.getElementsByClassName("sub-nav__list");

    if (!element?.length || !isDesktop) return;

    if (isOpenSubMenu) {
      gsap.fromTo(
        ".sub-nav__list",
        AnimationVariants.closed,
        AnimationVariants.open
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenSubMenu]);

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
      className="nav-bar__list"
      onMouseLeave={() => isDesktop && setIsOpenSubMenu({})}
    >
      {navLink.map((menu, index) => {
        const newPathname = `/${cleanPathname(pathname)}`;

        return (
          <li key={menu.title} className={`nav-bar__item mobile-menu__item`}>
            <div
              className={`nav-bar__item--main 
              ${newPathname === menu.path ? "active" : ""} 
              ${isDesktop && isOpenSubMenu[index] ? "focused" : ""}`}
              onMouseEnter={() => isDesktop && subMenuToggle(index, true)}
            >
              {newPathname === menu.path && isDesktop && (
                <p className="item__decor-slash">/</p>
              )}
              <Link
                href={menu.path}
                onClick={() => isDesktop && subMenuToggle(index)}
              >
                {menu.title}
              </Link>
              {newPathname === menu.path && isDesktop && (
                <p className="item__decor-slash">/</p>
              )}
              {!isDesktop && menu?.child.length > 0 && (
                <button
                  type="button"
                  className={`sub-menu__btn ${
                    isOpenSubMenu[index] ? "sub-menu__btn--open" : ""
                  }`}
                  onClick={() => subMenuToggle(index)}
                >
                  <ArrowDownSvg />
                </button>
              )}
            </div>
            {isOpenSubMenu[index] && menu?.child.length > 0 && (
              <SubNav
                navLink={menu.child}
                menuToggle={isDesktop ? subMenuToggle : () => {}}
                navIndex={index}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavBar;
