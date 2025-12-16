import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('access_token');
    const refreshToken = request.cookies.get('refresh_token');

    // ✅ Check if trying to access protected dashboard routes
    const isDashboardRoute = pathname.startsWith('/dashboard');

    // ✅ If accessing dashboard without any tokens, redirect to login
    if (isDashboardRoute && !refreshToken) {
        console.log('🚫 Unauthorized dashboard access - redirecting to login');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname); // Save where they wanted to go
        return NextResponse.redirect(loginUrl);
    }

    // ✅ If user has refresh token but no access token, try to refresh
    if (!accessToken && refreshToken) {
        console.log('🔄 Access token missing, attempting refresh...');

        try {
            // Call refresh endpoint
            const refreshResponse = await fetch(`${request.nextUrl.origin}/api/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    Cookie: `refresh_token=${refreshToken.value}`,
                },
            });

            if (refreshResponse.ok) {
                console.log('✅ Token refreshed in middleware');
                
                // Get the new access token from response
                const setCookieHeader = refreshResponse.headers.get('set-cookie');
                
                if (setCookieHeader) {
                    // Create response and set new cookie
                    const response = NextResponse.next();
                    
                    // Forward the Set-Cookie header
                    response.headers.set('set-cookie', setCookieHeader);
                    
                    return response;
                }
            } else {
                console.log('❌ Token refresh failed in middleware');
                
                // ✅ If refresh failed on dashboard route, redirect to login
                if (isDashboardRoute) {
                    console.log('🚫 Refresh failed on dashboard - redirecting to login');
                    const loginUrl = new URL('/login', request.url);
                    loginUrl.searchParams.set('redirect', pathname);
                    loginUrl.searchParams.set('session_expired', 'true');
                    return NextResponse.redirect(loginUrl);
                }
            }
        } catch (error) {
            console.error('Middleware refresh error:', error);
            
            // ✅ If refresh errored on dashboard route, redirect to login
            if (isDashboardRoute) {
                console.log('🚫 Refresh error on dashboard - redirecting to login');
                const loginUrl = new URL('/login', request.url);
                loginUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(loginUrl);
            }
        }
    }

    return NextResponse.next();
}

// Apply middleware to all routes except static files and API routes
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)',
    ],
};