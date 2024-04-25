import * as React from "react";
import { SVGProps } from "react";
const HeartSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    viewBox="0 0 17 16"
    fill="none"
    stroke="#363636"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.843 2.65a3.95 3.95 0 0 0-2.791-1.15A3.969 3.969 0 0 0 9.26 2.65l-.76.755-.76-.756A3.96 3.96 0 0 0 4.947 1.5a3.96 3.96 0 0 0-2.792 1.15A3.91 3.91 0 0 0 1 5.422a3.91 3.91 0 0 0 1.156 2.774l.76.756L8.5 14.5l5.583-5.547.76-.756A3.922 3.922 0 0 0 16 5.423a3.9 3.9 0 0 0-1.157-2.774Z"
    />
  </svg>
);
export default HeartSvg;
