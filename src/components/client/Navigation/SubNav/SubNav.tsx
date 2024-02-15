import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./SubNav.scss";

type NavLink = {
  title: string;
  path: string;
  child: NavLink[] | [];
};

interface SubNavProps {
  navLink: NavLink[];
  menuToggle?: (index: number, resetAll?: boolean) => void;
  navIndex?: number;
}

const AnimationVariants = {
  open: {
    y: 0,
    opacity: 1,
    ease: "power4.out",
    duration: 1,
    stagger: 0.2,
  },
  closed: {
    y: 20,
    opacity: 0,
    ease: "power4.out",
    duration: 1,
    stagger: 0.2,
  },
};

const SubNav = ({ navLink, menuToggle = () => {}, navIndex }: SubNavProps) => {
  useGSAP(() => {
    gsap.fromTo(
      `.sub-nav__item--${navIndex}`,
      AnimationVariants.closed,
      AnimationVariants.open
    );
  });

  return (
    <ul
      className="sub-nav__list"
      onMouseEnter={() => {
        if (navIndex) menuToggle(navIndex, true);
      }}
      onMouseLeave={() => {
        if (navIndex) menuToggle(navIndex);
      }}
    >
      {navLink.map((menu, index) => (
        <li
          key={`${menu.title}_${index}`}
          className={`sub-nav__item sub-nav__item--${navIndex}`}
        >
          <Link href={menu.path}>{menu.title}</Link>
          {menu?.child.length > 0 && <SubNav navLink={menu.child} />}
        </li>
      ))}
    </ul>
  );
};

export default SubNav;
