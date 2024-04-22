import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./SubNav.scss";
import { ActiveLink } from "@/components/UI/ActiveLink/ActivLink";

type NavLink = {
  title: string;
  path: string;
  child: NavLink[] | [];
};

interface SubNavProps {
  isOpen: boolean;
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
    // duration: 1,
    stagger: 0.15,
  },
  closed: {
    y: 20,
    opacity: 0,
    ease: "power4.out",
    // duration: 0.2,
    stagger: 0.2,
  },
};

const SubNavAnimationVariants = {
  open: {
    y: "99%",
    opacity: 1,
    ease: "power3.out",
    duration: 0.7,
  },
  closed: {
    opacity: 0,
    ease: "power3.out",
    delay: 1,
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
    duration: 0.5,
  },
};

const SubNav = ({
  isOpen = false,
  navLink,
  navIndex,
  isMobile = false,
}: SubNavProps) => {
  const subNavRef = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      if (isOpen && navLink.length > 0) {
        gsap
          .timeline()
          .set(subNavRef.current, { display: "grid" })
          .fromTo(
            subNavRef.current,
            isMobile
              ? SubNavAnimationVariants.closedMobile
              : SubNavAnimationVariants.closed,
            isMobile
              ? SubNavAnimationVariants.openMobile
              : SubNavAnimationVariants.open
          );
      } else {
        gsap
          .timeline()
          .fromTo(
            subNavRef.current,
            isMobile
              ? SubNavAnimationVariants.openMobile
              : SubNavAnimationVariants.open,
            isMobile
              ? SubNavAnimationVariants.closedMobile
              : SubNavAnimationVariants.closed
          )
          .set(subNavRef.current, { display: "none" });
      }

      if (subNavRef?.current?.children) {
        const subNavChildrenAnim = gsap
          .timeline()
          .fromTo(
            subNavRef.current.children,
            AnimationVariants.closed,
            AnimationVariants.open
          )
          .reverse();

        if (isOpen) {
          subNavChildrenAnim.reversed(!subNavChildrenAnim);
        } else {
          subNavChildrenAnim.reversed();
        }
      }
    },
    { dependencies: [isOpen] }
  );
 if(!isOpen) return
  return (
    <ul ref={subNavRef} className={`sub-nav__list`}>
      {navLink.map((menu, index) => (
        <li
          key={`${menu.title}_${index}`}
          className={`sub-nav__item sub-nav__item--${navIndex}`}
        >
          <ActiveLink rout={menu.path}>{menu.title}</ActiveLink>
          {menu?.child.length > 0 && (
            <SubNav navLink={menu.child} isMobile={isMobile} isOpen={isOpen} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SubNav;
