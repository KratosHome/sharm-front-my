import Link from "next/link";

import { userNav, userNavOpen } from "@/mokData/navLinksData";

import "./UserNav.scss";

interface UserNavProps {
  isMobileMenuOpen?: boolean;
}

const UserNav = ({ isMobileMenuOpen }: UserNavProps) => {
  return (
    <ul
      className={isMobileMenuOpen ? "user-nav__list--open" : "user-nav__list"}
    >
      {isMobileMenuOpen
        ? userNavOpen.map((menu) => (
            <li
              key={menu.title}
              className="user-nav__item--open  mobile-menu__item"
            >
              <Link href={menu.path}>
                {menu.icon}
                {menu.title}
              </Link>
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
                }`}
              >
                <Link href={menu.path}>{menu.icon}</Link>
              </li>
            );
          })}
    </ul>
  );
};

export default UserNav;
