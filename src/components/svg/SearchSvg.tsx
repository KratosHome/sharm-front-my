import * as React from "react";
import { SVGProps } from "react";
const SearchSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 20"
    width={21}
    height={20}
    fill="none"
    stroke="#363636"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.814 15.911a6.756 6.756 0 1 0 0-13.511 6.756 6.756 0 0 0 0 13.511ZM18.258 17.6l-3.673-3.673"
    />
  </svg>
);
export default SearchSvg;
