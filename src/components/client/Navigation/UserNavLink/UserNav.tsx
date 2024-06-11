import Link from "next/link";
import { auth } from "@/server/auth/auth";
import { userNav, userNavOpen } from "@/mokData/navLinksData";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import "./UserNav.scss";
import { ActiveLink } from "@/components/UI/ActiveLink/ActivLink";

interface UserNavProps {
  isMobileMenuOpen?: boolean;
  closeMenu?: () => void;
}

const UserNav = ({ isMobileMenuOpen, closeMenu }: UserNavProps) => {
  
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  
  return (
    <ul
      className={isMobileMenuOpen ? "user-nav__list--open" : "user-nav__list"}
    >
      {isMobileMenuOpen
        ? userNavOpen.map((menu) => (
            <li
              key={menu.title}
              className="user-nav__item--open  mobile-menu__item"
              onClick={closeMenu}
            >
              <ActiveLink rout={menu.path}>
                {menu.icon}
                {menu.title}
              </ActiveLink>
              {menu.path.startsWith("tel:") && (
                <button type="button" className="phone-btn">
                  Замовити дзвінок
                </button>
              )}
            </li>
          ))
        : userNav.map((menu) => {
            return (
              <li
                key={menu.title}
                className={`user-nav__item ${
                  menu.title === "Пошук" && "mobile-only"
                } ${menu.title === "Мій список бажань" && "desktop-only"}`}
              >
                <Link href={`/${locale}${menu.path}`}>{menu.icon}</Link>
              </li>
            );
          })}
    </ul>
  );
};

export default UserNav;
