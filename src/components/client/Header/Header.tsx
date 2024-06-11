"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TopBarHeader from "@/components/client/Header/TopBarHeader/TopBarHeader";
import MainHeader from "@/components/client/Header/MainHeader/MainHeader";
import NavBar from "@/components/client/Header/NavBar/NavBar";

import "./header.scss";
import Link from "next/link";
import LogoSvg from "@/components/svg/LogoSvg";
import UserNav from "../Navigation/UserNavLink/UserNav";
import { usePathname } from "next/navigation";
import SearchNav from "../Navigation/SearchNav/SearchNav";

const Header = () => {
  const pathname = usePathname();
  const container = useRef<HTMLDivElement | null>(null);
  const header = useRef<HTMLDivElement | null>(null);
  const headerSticky = useRef<HTMLDivElement | null>(null);
  
  useGSAP(
    () => {
      const headerHeight = Number(header?.current?.getBoundingClientRect().height);
      const headerStickyHeight = Number(headerSticky?.current?.getBoundingClientRect().height);
      
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {

        gsap.timeline(
          {scrollTrigger: {
            // id:'header',
            trigger: container.current,
            start: () => `${-window.scrollY} top`,
            end: `+=${headerHeight}`,
            scrub: 3,
            // markers: true,
          }}
        )
        .to(container.current, {maxHeight: headerHeight})
        .to(header.current, 
          {
            height: 0,
            overflow: 'hidden'
          }
        )
        .set(header.current, {display: 'none'})
        .fromTo(
          headerSticky.current,
          {
            autoAlpha: 0,
            height: 0,
            y: -headerStickyHeight,
          },
          {
            autoAlpha: 1,
            height: headerStickyHeight,
            y: 0
          }
        )
      });
    },
  );

  return (
    <header ref={container} className="container-header-client">
      <div ref={header} className="main-container">
        <TopBarHeader />
        <MainHeader />
        <NavBar />
      </div>
      <div ref={headerSticky} className="sticky-header main-container">
        {/* <Link href={pathname.substring(1, 4)} className="logo--header">
          <LogoSvg />
        </Link> */}
        <NavBar />
        <SearchNav />
        <UserNav />
      </div>
    </header>
  );
};

export default Header;
