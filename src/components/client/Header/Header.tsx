"use client";
import useDeviceType from "@/hooks/useDeviceType";

import TopBarHeader from "@/components/client/Header/TopBarHeader/TopBarHeader";
import MainHeader from "@/components/client/Header/MainHeader/MainHeader";
import NavBar from "@/components/client/Header/NavBar/NavBar";

import "./Header.scss";

const Header = () => {
  const { isDesktop } = useDeviceType();

  return (
    <header className="container-header-client">
      {isDesktop && <TopBarHeader />}
      <MainHeader />
      {isDesktop && <NavBar />}
    </header>
  );
};

export default Header;
