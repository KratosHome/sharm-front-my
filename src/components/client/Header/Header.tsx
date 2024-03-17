"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TopBarHeader from "@/components/client/Header/TopBarHeader/TopBarHeader";
import MainHeader from "@/components/client/Header/MainHeader/MainHeader";
import NavBar from "@/components/client/Header/NavBar/NavBar";
const AnimationVariants = {
  open: {
    height: "fit-content",
    ease: "power4.out",
    duration: 1,
  },
  closed: {
    height: 0,
    overflow: "hidden",
    ease: "power4.out",
    duration: 1,
  },
};
import "./Header.scss";

const Header = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const header = useRef<HTMLDivElement | null>(null);
  const headerSticky = useRef<HTMLDivElement | null>(null);

  const [isSticky, setIsSticky] = useState(false);

  useGSAP(
    () => {
      const headerHeight = header?.current?.getBoundingClientRect().height;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".main-container",
            pin: true,
            start: "top",
            end: "top+=" + headerHeight,
            scrub: true,
            markers: true,
          },
        })
        .add("header")
        .to(
          header.current,
          {
            height: 0,
            overflow: "hidden",
          },
          "header"
        )
        .set(header.current, { display: "none" })
        .set(headerSticky.current, {
          display: "block",
          onComplete: () => {
            setIsSticky(true);
          },
        });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      if (isSticky) {
        gsap.timeline().to(headerSticky.current, AnimationVariants.open);
      } else {
        gsap
          .timeline()
          .to(headerSticky.current, AnimationVariants.closed)
          .set(headerSticky.current, { display: "none" });
      }
    },
    { dependencies: [isSticky] }
  );

  return (
    <header ref={container} className="container-header-client">
      <div ref={header}>
        <TopBarHeader />
        <MainHeader />
        <NavBar />
      </div>
      <div ref={headerSticky} className="sticky-header">
        <MainHeader />
      </div>
    </header>
  );
};

export default Header;
