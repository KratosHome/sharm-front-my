import createMiddleware from "next-intl/middleware";
import {NextRequest} from "next/server";
// export { auth as middleware } from "./server/auth/auth";

const protectedRoutes = ["/admin1"]

export default function middleware(request: NextRequest) {

    const responseForLocale = createMiddleware({
        locales: ['ua', 'ru'],
        localeDetection: true,
        localePrefix: "always",
        defaultLocale: 'ua'
    })(request);


    return responseForLocale;
}

export const config = {
    matcher: ['/', '/(ua|ru)/:path*']
};

