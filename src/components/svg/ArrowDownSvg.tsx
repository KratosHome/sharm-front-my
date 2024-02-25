import * as React from "react";
import { SVGProps } from "react";
const ArrowDownSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={18}
    fill="#B8B8B8"
    {...props}
  >
    <path d="M10.293 12.707a1 1 0 0 0 1.414 0l6.364-6.364a1 1 0 0 0-1.414-1.414L11 10.586 5.343 4.929A1 1 0 0 0 3.93 6.343l6.364 6.364ZM10 11v1h2v-1h-2Z" />
  </svg>
);
export default ArrowDownSvg;
