import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

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
        console.log('Refreshing access token...');

        const refreshResponse = await fetch(`${BASE_URL}/auth/jwt/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!refreshResponse.ok) {
            console.error('Token refresh failed:', refreshResponse.status);
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
            : 60 * 60 * 2; // Default 2 hours

        // Set new access token cookie
        cookieStore.set('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: expiresIn,
            path: '/',
        });

        console.log('✅ Access token refreshed successfully');
        return newAccessToken;
    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
}

/**
 * Get valid access token with auto-refresh
 * Returns token or null if authentication fails
 */
export async function getValidAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    let accessToken: string | null = cookieStore.get('access_token')?.value || null;

    // If no access token, try to refresh
    if (!accessToken) {
        console.log('No access token found, attempting refresh...');
        accessToken = await refreshAndSetToken();
    }

    return accessToken;
}

/**
 * Make authenticated request to Django backend with auto token refresh
 * Automatically handles 401 by refreshing token and retrying once
 */
export async function fetchWithAuthRetry(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    // Get valid access token
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

    // If 401, try refreshing once more and retry
    if (response.status === 401) {
        console.log('Got 401, attempting one more refresh...');
        
        const newToken = await refreshAndSetToken();
        
        if (newToken) {
            // Update Authorization header
            headers.set('Authorization', `Bearer ${newToken}`);
            
            // Retry request
            response = await fetch(url, {
                ...options,
                headers,
            });
        }
    }

    return response;
}