import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

/**
 * Helper to decode JWT and get expiration info
 */
function getTokenInfo(token: string): { exp: number | null; timeLeft: number } {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return { exp: null, timeLeft: 0 };
        
        const payload = JSON.parse(
            Buffer.from(parts[1], 'base64').toString('utf-8')
        );
        
        if (payload.exp) {
            const now = Math.floor(Date.now() / 1000);
            const timeLeft = payload.exp - now;
            return { exp: payload.exp, timeLeft };
        }
        
        return { exp: null, timeLeft: 0 };
    } catch (error) {
        console.error('Failed to decode token:', error);
        return { exp: null, timeLeft: 0 };
    }
}

/**
 * Check if token should be refreshed (expired or expires within 2 minutes)
 */
function shouldRefreshToken(token: string): boolean {
    const { timeLeft } = getTokenInfo(token);
    const bufferTime = 2 * 60; // 2 minutes buffer
    return timeLeft <= bufferTime;
}

/**
 * Refresh access token and set cookie (server-side)
 * Returns new token or null if refresh fails
 */
export async function refreshAndSetToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
        console.error('No refresh token found');
        return null;
    }

    try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/jwt/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!refreshResponse.ok) {
            const errorData = await refreshResponse.json().catch(() => ({}));
            console.error('Token refresh failed:', refreshResponse.status, errorData);
            return null;
        }

        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.access;

        if (!newAccessToken) {
            console.error('No access token in refresh response');
            return null;
        }

        // Get token expiration from JWT payload
        const payload = JSON.parse(
            Buffer.from(newAccessToken.split('.')[1], 'base64').toString('utf-8')
        );
        const expiresIn = payload.exp 
            ? payload.exp - Math.floor(Date.now() / 1000) 
            : 60 * 60; // Default 1 hour

        // Set new access token cookie
        cookieStore.set('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: expiresIn,
            path: '/',
        });

        console.log('Access token refreshed successfully');
        return newAccessToken;
    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
}

/**
 * Get valid access token with proactive auto-refresh
 * Returns token or null if authentication fails
 */
export async function getValidAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    let accessToken: string | null = cookieStore.get('access_token')?.value || null;

    // If no access token, try to refresh
    if (!accessToken) {
        accessToken = await refreshAndSetToken();
        return accessToken;
    }

    // Check if token should be refreshed (expired or expiring soon)
    if (shouldRefreshToken(accessToken)) {
        const newToken = await refreshAndSetToken();
        if (newToken) {
            accessToken = newToken;
        }
        // If refresh fails, continue with existing token (will fail gracefully if expired)
    }

    return accessToken;
}

/**
 * Make authenticated request to Django backend with auto token refresh
 * Proactively refreshes token if it's about to expire
 * Automatically handles 401 by refreshing token and retrying once
 */
export async function fetchWithAuthRetry(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    // Get valid access token (will proactively refresh if needed)
    let accessToken = await getValidAccessToken();

    if (!accessToken) {
        throw new Error('Authentication required');
    }

    // Add Authorization header
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${accessToken}`);

    // First attempt
    let response = await fetch(url, {
        ...options,
        headers,
    });

    // If still got 401 (edge case: token expired between check and request)
    if (response.status === 401) {
        console.log('Got 401, attempting emergency token refresh...');
        
        const newToken = await refreshAndSetToken();
        
        if (newToken) {
            // Update Authorization header and retry
            headers.set('Authorization', `Bearer ${newToken}`);
            
            response = await fetch(url, {
                ...options,
                headers,
            });
        }
    }

    return response;
}