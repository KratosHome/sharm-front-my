import * as React from "react";
import { SVGProps } from "react";
const CartSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 20"
    fill="none"
    stroke="#363636"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.427 17.673a.69.69 0 1 0 0-1.382.69.69 0 0 0 0 1.382ZM16.027 17.673a.69.69 0 1 0 0-1.382.69.69 0 0 0 0 1.382ZM2.9 3.164h2.764l1.851 9.25a1.382 1.382 0 0 0 1.382 1.113h6.716a1.382 1.382 0 0 0 1.381-1.112L18.1 6.618H6.354"
    />
  </svg>
);
export default CartSvg;
