import { NextResponse, NextRequest } from "next/server";
import checkAuth from "./app/actions/checkAuth";

export async function middleware(request: NextRequest) {
    const { isAuthenticated } = await checkAuth();

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/bookings', '/room/add', '/rooms/my'],
}