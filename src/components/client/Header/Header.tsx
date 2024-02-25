import TopBarHeader from "@/components/client/Header/TopBarHeader/TopBarHeader";
import MainHeader from "@/components/client/Header/MainHeader/MainHeader";
import NavBar from "@/components/client/Header/NavBar/NavBar";

import "./Header.scss";

const Header = () => {
  return (
    <header className="container-header-client">
      <TopBarHeader />
      <MainHeader />
      <NavBar />
    </header>
  );
};

export default Header;
