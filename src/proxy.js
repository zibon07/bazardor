import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        const { pathname, search } = request.nextUrl;
        const url = new URL("/sign-in", request.url);
        url.searchParams.set("redirect", pathname + search);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/product/:path*", "/profile/:path*"],
};