import * as React from "react";
import { SVGProps } from "react";
const BurgerMenuSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="#363636"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.38 11.52h18.24M3.38 4.8h18.24M3.38 18.24h18.24"
    />
  </svg>
);
export default BurgerMenuSvg;
