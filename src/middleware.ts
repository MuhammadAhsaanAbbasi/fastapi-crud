"use server"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "../routes";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { create_refresh_token } from "./lib/token";
import setCookies from "./lib/cookies";

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const cookieStore = cookies(); // Extract cookies from request headers
    const isLoggedIn = cookieStore.has('access_token');
    const isRefresh = cookieStore.has('refresh_token');

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (!isLoggedIn && isRefresh) {
        try {
            console.log("Middleware Refresh Token")
            // console.log('refresh_token', ref_token)
            const res = await create_refresh_token();
            if (res) {
                await setCookies(res);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/sign-in", nextUrl))
    }

    return null;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}