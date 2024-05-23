import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let defaultLocale: string = "en";
let locales: string[] = ["en", "bn"];

function getLocale(request: NextRequest): string {
    const acceptedLanguage: string | undefined =
        request.headers.get("accept-language") ?? undefined;
    const headers: { "accept-language": string | undefined } = {
        "accept-language": acceptedLanguage,
    };
    const languages: string[] = new Negotiator({ headers }).languages();

    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest): NextResponse {
    console.log(request.url);
    const pathname: string = request.nextUrl.pathname;

    const pathNameIsMissingLocale: boolean = locales.every(
        (locale: string) =>
            !pathname.startsWith(`/${locale}`) &&
            !pathname.startsWith(`/${locale}/`)
    );

    if (pathNameIsMissingLocale) {
        const locale: string = getLocale(request);

        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
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
        "/((?!api|_next/static|_next/image|favicon.ico|assets/|sign-in|sign-up).*)",
    ],
};
