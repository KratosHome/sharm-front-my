import * as React from "react";
import { SVGProps } from "react";
const CloseSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    stroke="#363636"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 2 2 14M2 2l12 12"
    />
  </svg>
);
export default CloseSvg;
