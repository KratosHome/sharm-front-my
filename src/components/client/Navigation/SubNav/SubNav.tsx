import Link from "next/link";
import { useRef } from "react";

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
  isMobile: boolean;
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

const SubNavAnimationVariants = {
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
  openMobile: {
    opacity: 1,
    ease: "power1.out",
    duration: 1,
  },
  closedMobile: {
    opacity: 0,
    ease: "power1.out",
    duration: 1,
  },
};

const SubNav = ({
  navLink,
  navIndex,
  menuToggle = () => {},
  isMobile = false,
}: SubNavProps) => {
  const subNavRef = useRef<HTMLUListElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      subNavRef.current,
      isMobile
        ? SubNavAnimationVariants.closedMobile
        : SubNavAnimationVariants.closed,
      isMobile
        ? SubNavAnimationVariants.openMobile
        : SubNavAnimationVariants.open
    );

    if (subNavRef?.current?.children) {
      gsap.fromTo(
        subNavRef.current.children,
        AnimationVariants.closed,
        AnimationVariants.open
      );
    }
  });

  return (
    <ul
      ref={subNavRef}
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
          {menu?.child.length > 0 && (
            <SubNav navLink={menu.child} isMobile={isMobile} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SubNav;
