import Link from "next/link";

import useDeviceType from "@/hooks/useDeviceType";

import SearchSvg from "@/components/svg/SearchSvg";
import UserSvg from "@/components/svg/UserSvg";
import CartSvg from "@/components/svg/CartSvg";
import HeartSvg from "@/components/svg/HeartSvg";
import PhoneSvg from "@/components/svg/PhoneSvg";

import "./UserNav.scss";

const userNavOpen = [
  {
    title: "Моя корзина",
    icon: <CartSvg />,
    path: "#",
  },
  {
    title: "Мій акаунт",
    icon: <UserSvg />,
    path: "#",
  },
  {
    title: "Мій список бажань",
    icon: <HeartSvg />,
    path: "#",
  },
  {
    title: "[0800 50 51 13]",
    icon: <PhoneSvg />,
    path: "tel:0800505113",
  },
];

const userNav = [
  {
    title: "Пошук",
    icon: <SearchSvg />,
    path: "#",
  },
  {
    title: "Моя корзина",
    icon: <CartSvg />,
    path: "#",
  },
  {
    title: "Мій акаунт",
    icon: <UserSvg />,
    path: "#",
  },
];

interface UserNavProps {
  isMobileMenuOpen?: boolean;
}

const UserNav = ({ isMobileMenuOpen }: UserNavProps) => {
  const { isDesktop } = useDeviceType();

  return (
    <ul
      className={isMobileMenuOpen ? "user-nav__list--open" : "user-nav__list"}
    >
      {isMobileMenuOpen
        ? userNavOpen.map((menu) => (
            <li
              key={menu.title}
              className="user-nav__item--open mobile-menu__item"
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
            if (isDesktop && menu.title === "Пошук") return;
            return (
              <li key={menu.title} className="user-nav__item">
                <Link href={menu.path}>{menu.icon}</Link>
              </li>
            );
          })}
    </ul>
  );
};

export default UserNav;
