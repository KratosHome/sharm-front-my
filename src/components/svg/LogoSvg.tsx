import * as React from "react";
import { SVGProps } from "react";
const LogoSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 250 70"
    fill="none"
    {...props}
  >
    <path
      fill="#D91920"
      fillRule="evenodd"
      d="M6.66 4.991 14.258.217h.434L.582 0v11.068C2.75 9.226 4.36 6.73 6.66 4.99ZM18.382 0C12.516 1.702.514 11.613.582 19.314 14.62 10.163 28.947-1.396 52.028 3.038V0H18.382Zm19.97 3.69c3.004 2.057 5.955 3.774 8.032 6.727 7.382 10.488 3.347 30.658-1.302 41.015h6.946V5.425c-4.147-.818-8.334-2.028-13.675-1.953v.217ZM31.84 7.595c2.336 1.6 4.798 2.164 6.513 4.34 8.891 11.285 3.787 29.078-1.52 39.496h7.163C47.166 35.496 56.16 8.768 31.84 7.596ZM1.233 22.136c-5.886 8.199 10.971 18.16 15.412 19.53-2.458-3.163-5.622-5.374-6.946-9.765C6.546 21.44 19.205 10.539 25.762 8.03v-.217h-.65c-7.795 4.784-18.668 7.063-23.879 14.322ZM27.065 9.982c-8.322 3.644-10.24 4.43-13.242 13.454v.869c5.53-3.77 11.903-11.44 20.405-5.209 1.99 1.458 4.24 3.216 5.21 5.642l.434.217c.175-9.126-3.452-15.18-12.807-14.973Zm1.953 22.135c2.747-1.492 4.643-12.13-2.387-11.719-1.963.933-5.88 1.751-6.73 3.69-1.402 3.2 6.99 8.794 9.117 8.029Zm5.427 10.85c8.333-5.038 7.41-15.816-.217-20.833 2.155 10.093-5.68 16.161-13.241 18.012 1.859 4.09 9.072 5.474 13.458 2.822Zm-6.295-9.331c-8.448.173-8.413-4.227-11.288-9.549-9.653 7.608 3.208 19.737 11.288 9.549ZM.582 35.59v5.425c8.228 2.344 17.312 6.097 27.568 6.077l-11.505-2.604C10.255 42.47 5.441 39.004.582 35.59Zm0 15.842h33.646l.434-.217.652-2.387c-13.48-.025-25.053-.559-34.515-4.775l-.217 7.379Z"
      clipRule="evenodd"
    />
    <path
      fill="#D91920"
      d="M237.608 31.93c-2.602 1.576-8.698 5.43-11.517 4.959-3.684-.617.946-10.688-.038-13.321-.942-.8-2.295-.8-3.4-.25-1.82 1.12-4.556 5.133-7.217 8.913-5.345 7.593-10.393 14.244-7.116-5.387 2.957-9.375 2.171-9.75-.253-6.766-1.5 1.848-3.627 4.982-5.882 8.066-3.341 4.57-6.961 9.028-9.232 9.028-.703 0-1.303-.195-1.774-.538-1.408-1.07-1.644-4.777-.972-6.175v-.125c-.751-2.068-9.799 8.212-12.878 6.307-1.904-1.111-3.491-6.36-5.205-7.852-.496-.415-1.088-.637-1.806-.637-3.115 0-4.561 4.447-5.646 6.578-1.012 2.08-9.006 27.947-7.486 19.076 1.305-8.269 4.215-16.677 7.027-24.692 1.325-3.407 4.485-9.508 4.485-13.017 0-.525-.166-.96-.504-1.328-1.349-1.393-2.078.262-3.036 1.01-.362.619-1.933 3.634-4.051 7.19-4.099 6.875-10.247 15.766-13.657 13.208-2.746-2.044.052-5.843-1.429-7.562-.311-.35-.643-.52-1.008-.52-3.195 0-12.513 7.928-15.535 9.763-1.743.437-.518-.944.036-1.651 3.158-4.874 10.649-9.22 15.262-13.405 1.424-.675 5.44-4.348 1.279-4.348-2.161 0-3.279.685-5.127 1.725-2.181 1.282-9.505 7.592-17.168 13.69-8.992 7.157-18.451 14.022-20.612 12.127l-.23-.42c.517-4.609 2.252-9.677 4.39-14.58 2.251-5.16 4.948-10.136 7.147-14.202.309-.561.671-1.078.968-1.663.4-.809.047-2.296-1.167-2.296-2.469 0-4.333 3.302-5.529 4.97-2.425 3.37-18.539 24.4-19.72 25.374-.877.724-.895 1.93-2.714 1.93-1.006 0-.344-2.065-.27-2.355.782-3.278 1.546-6.42 2.603-9.735 2.23-7.052 4.964-14.356 8.02-21.235.347-.778.583-1.53.877-2.173.143-1.509-1.084-2.43-2.754-1.55-1.055.557-2.379 2.717-2.864 3.687l-.105.049c-.892 1.518-3.65 5.98-6.86 11.037-5.353 8.429-11.963 18.508-13.275 19.332-.184.164-3.504 3.477-3.395 1.216-1.183-3.66 1-12.326 4.389-21.26 2.665-7.03 6.077-14.225 9.18-19.28.714-1.184.893-3.001-1.334-2.802l-.24-.04c-3.77.464-8.696 11.07-12.374 22.504-4.14 12.866-6.699 26.783-4.258 28.486 1.47 1.476 5.162-.89 6.332-1.788 2.382-1.847 7.632-9.521 12.721-17.046-1.31 4.35-5.463 14.97-3.532 18.6 1.545 2.911 6.09.688 7.878-.683 1.165-.893 1.638-1.82 2.532-2.7 1.52-1.518 5.806-6.604 10.29-11.94-.958 3.879-5.955 12.039-3.665 15.483 1.725 2.605 6.411.501 8.136-.577 4.295-2.668 14.182-10.022 18.893-12.94-.972 1.913-3.041 4.373-.766 6.144.731.546 1.428.821 2.085.821.444 0 .927-.088 1.437-.254a9.801 9.801 0 0 0 1.644-.757c2.289-.89 4.411-2.357 6.367-3.876 2.319-1.8 4.405-3.675 6.265-4.747 0 2.014-.152 3.905 1.648 5.5 1.1 1.013 2.644 1.523 4.575 1.523 3.667 0 7.047-4.084 9.409-5.853l.008.107v.308l-.084.54c-1.515 7.669-2.726 15.402-3.153 23.263.309 2.217 2.029 6.16 4.485 2.171 3.759-7.227 6.431-16.175 9.501-23.76 2.312-5.462 5.623 2.14 8.551 3.092.876.138 1.472.084 2.375 0a19.756 19.756 0 0 0 5.197-3.714c.46-.454.859-.872 1.198-1.229.022 1.68.579 3.02 1.656 3.996 1.127 1.015 2.657 1.532 4.591 1.532.895 0 1.709-.178 2.402-.49 1.764-.845 6.568-3.988 7.701-5.953l.006-.009.19-.19.32-.343.053-.01.104.093.052.26c0 5.703 1.685 8.917 4.218 9.766 2.098.704 4.776-.214 7.56-2.683 1.144-1.016 2.305-2.292 3.452-3.827.638-.846.889-1.4 1.385-1.87.366-.346.866-.647 1.752-.988.287.196.579.393.865.596-.127.998-.154 1.862-.086 2.6.194 2.063 1.144 3.114 2.761 3.25 2.738.234 7.387-2.157 13.499-6.677 1.524-1.506 2.559-2.507 2.559-2.988 0-.886-.547-.748-1.392-.813Z"
    />
    <path
      fill="#D91920"
      d="M176.92 49.534h.96v3.885h.023s.48-1.055 1.907-1.055c1.643 0 2.758 1.115 2.758 2.997 0 1.966-.97 3.333-2.842 3.333-1.103 0-1.691-.564-1.871-.767l-.167.599h-.768v-8.992Zm.96 4.7v2.89s.383.814 1.523.814c1.534 0 2.182-.995 2.182-2.553 0-1.535-.755-2.266-2.062-2.266a1.704 1.704 0 0 0-1.643 1.115ZM193.986 57.53s-.61 1.164-2.409 1.164-2.975-.983-2.975-3.045c0-2.026 1.091-3.285 2.89-3.285 1.608 0 2.507 1.055 2.507 2.793 0 .432-.097.636-.097.636h-4.305v.023c0 1.367.756 2.135 2.027 2.135 1.247 0 1.787-.792 1.787-.792l.575.372Zm-4.377-2.456h3.502s.012-.037.012-.144c0-1.103-.552-1.835-1.631-1.835-1.198 0-1.811.839-1.883 1.979ZM204.01 57.639c-.12.276-.575 1.055-1.906 1.055-1.367 0-2.123-.636-2.123-1.715 0-1.75 2.579-2.133 4.017-2.242v-.18c0-1.006-.443-1.45-1.475-1.45-1.103 0-1.582.648-1.582.648l-.54-.457s.54-.934 2.218-.934c1.583 0 2.339.671 2.339 2.181v3.981h-.804l-.144-.887Zm-.012-.719v-1.499c-1.39.12-3.034.384-3.034 1.462 0 .73.467 1.116 1.428 1.116 1.21 0 1.57-.983 1.606-1.079ZM227.271 53.311h-1.835v3.393c0 .779.228 1.187.803 1.187.575 0 .996-.12.996-.12v.672s-.384.25-1.295.25c-.996 0-1.463-.538-1.463-1.773v-3.609h-.743v-.755l.743-.012v-1.859l.779-.095.18-.013v1.955h1.835v.78ZM233.912 60.828c.708 0 1.248-.996 1.763-2.338l-2.662-5.958h1.068l2.074 4.975h.024l1.739-4.975h1.068l-2.411 6.138c-.695 1.762-1.487 3.021-2.494 3.021-.54 0-.852-.216-.852-.216l.168-.79s.252.143.515.143ZM216.032 52.532v4.004c0 .784-.545 1.242-1.399 1.3l-.089.004-.087.003-.087-.003-.089-.004c-.855-.058-1.399-.516-1.399-1.3v-4.004h-.972v4.184c0 1.306.901 1.978 2.231 1.978.113 0 .216-.006.316-.014.1.008.204.014.315.014 1.331 0 2.231-.672 2.231-1.978v-4.184h-.971ZM217.003 51.333h-5.093v-.756h5.093v.756Z"
    />
  </svg>
);
export default LogoSvg;