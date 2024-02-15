import { useState, useEffect } from "react";

import variables from "../app/variables.module.scss";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const { mobileWithoutPx, tabletWithoutPx, desktopWithoutPx } = variables;
      const width = window.innerWidth;

      if (width < Number(mobileWithoutPx)) {
        setDeviceType("mobile");
      } else if (
        width >= Number(tabletWithoutPx) &&
        width < Number(desktopWithoutPx)
      ) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";
  const isDesktop = deviceType === "desktop";

  return { isMobile, isTablet, isDesktop };
};

export default useDeviceType;
