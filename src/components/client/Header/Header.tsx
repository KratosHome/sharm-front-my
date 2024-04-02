"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TopBarHeader from "@/components/client/Header/TopBarHeader/TopBarHeader";
import MainHeader from "@/components/client/Header/MainHeader/MainHeader";
import NavBar from "@/components/client/Header/NavBar/NavBar";

import "./Header.scss";
import Link from "next/link";
import LogoSvg from "@/components/svg/LogoSvg";
import UserNav from "../Navigation/UserNavLink/UserNav";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const container = useRef<HTMLDivElement | null>(null);
  const header = useRef<HTMLDivElement | null>(null);
  const headerSticky = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const headerHeight = header?.current?.getBoundingClientRect().height;
      const headerWidth = header?.current?.getBoundingClientRect().width;

      gsap
        .timeline(
          Number(headerWidth) >= 768
            ? {
                scrollTrigger: {
                  trigger: ".main-container",
                  pin: true,
                  start: "top",
                  end: "top+=" + headerHeight,
                  scrub: true,
                  // markers: true,
                },
              }
            : {}
        )
        .add("header")
        .to(
          header.current,
          {
            height: Number(headerWidth) >= 768 ? 0 : 62,
            overflow: Number(headerWidth) >= 768 ? "hidden" : "visible",
          },
          "header"
        )
        .set(header.current, {
          display: Number(headerWidth) >= 768 ? "none" : "initial",
        })
        .add("headerSticky")
        .set(headerSticky.current, {
          display: Number(headerWidth) >= 768 ? "flex" : "none",
        })
        .fromTo(
          headerSticky.current,
          {
            y: Number(headerWidth) >= 1500 ? -52 : -98,
            height: 0,
          },
          {
            y: 0,
            height: Number(headerWidth) >= 1500 ? 52 : 98,
          },
          Number(headerWidth) >= 768 ? "headerSticky" : ""
        );
    },
    { scope: container }
  );

  return (
    <header ref={container} className="container-header-client">
      <div ref={header}>
        <TopBarHeader />
        <MainHeader />
        <NavBar />
      </div>
      <div ref={headerSticky} className="sticky-header">
        <Link href={pathname.substring(1, 4)} className="logo--header">
          <LogoSvg />
        </Link>
        <NavBar />
        <UserNav />
      </div>
    </header>
  );
};

export default Header;
