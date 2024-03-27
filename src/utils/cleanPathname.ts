export const cleanPathname = (pathname: string) => {
  const cleanPathname = pathname.replace(/^\/[a-z]{2}/, "");

  return cleanPathname;
};
