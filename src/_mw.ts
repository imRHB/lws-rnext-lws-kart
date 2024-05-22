import { NextResponse } from "next/server";
import { auth } from "./auth";

/* export default function middleware(request: NextRequest) {
    auth();
} */

export default auth((req) => {
    const reqUrl = new URL(req.url);

    if (!req.auth && reqUrl?.pathname !== "/") {
        return NextResponse.redirect(
            new URL(
                `http://localhost:3000/sign-in?callbackUrl=${encodeURIComponent(
                    reqUrl?.pathname
                )}`,
                req.url
            )
        );
    }
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|assets/).*)",
    ],
};
