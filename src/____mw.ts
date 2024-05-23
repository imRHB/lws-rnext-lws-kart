import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "./auth";

const protectedRoutes = ["/account"];
const unprotectedRoutes = ["/", "/sign-in"];

export default async function middleware(request: NextRequest) {
    const session = await auth();

    const isProtectedRoute = protectedRoutes.some((prefix) =>
        request.nextUrl.pathname.startsWith(prefix)
    );

    if (!session && isProtectedRoute) {
        const signInURL = new URL("/sign-in", request.nextUrl.origin);
        signInURL.searchParams.set("redirect", request.nextUrl.pathname);
        return NextResponse.redirect(signInURL.toString());
    }

    if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
        const dashboardURL = new URL("/dashboard", request.nextUrl.origin);
        return NextResponse.redirect(dashboardURL.toString());
    }

    return NextResponse.next();
}

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
