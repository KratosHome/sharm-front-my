import * as React from "react";
import { SVGProps } from "react";
const UserSvg = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10.579 9.167a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667ZM3.913 17.5h13.333v-.632c-.012-.888-.31-1.76-.866-2.533-.556-.773-1.352-1.423-2.313-1.889a8.03 8.03 0 0 0-3.488-.78c-.1 0-.2.003-.301.006a8.03 8.03 0 0 0-3.186.774c-.962.466-1.758 1.116-2.314 1.89-.556.772-.854 1.644-.865 2.532v.632Z"
    />
  </svg>
);
export default UserSvg;
