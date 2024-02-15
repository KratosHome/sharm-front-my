import * as React from "react";
import { SVGProps } from "react";
const PhoneSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 23"
    width={22}
    height={23}
    fill="none"
    stroke="#828282"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.76}
      d="M20.24 15.903v2.655a1.77 1.77 0 0 1-1.93 1.77 17.513 17.513 0 0 1-7.636-2.717 17.257 17.257 0 0 1-5.31-5.31A17.513 17.513 0 0 1 2.647 4.63 1.77 1.77 0 0 1 4.408 2.7h2.655a1.77 1.77 0 0 1 1.77 1.522c.112.85.32 1.684.62 2.487a1.77 1.77 0 0 1-.399 1.867L7.93 9.7a14.16 14.16 0 0 0 5.31 5.31l1.124-1.124a1.77 1.77 0 0 1 1.867-.399c.803.3 1.637.508 2.486.62a1.77 1.77 0 0 1 1.523 1.796Z"
    />
  </svg>
);
export default PhoneSvg;
