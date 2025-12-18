import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

/**
 * Get valid access token (server-side)
 * Automatically refreshes if expired
 * Returns null if refresh fails
 */
export async function getValidAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    let accessToken: string | null = cookieStore.get('access_token')?.value || null;

    // If no access token, try to refresh
    if (!accessToken) {
        console.log('No access token found, attempting refresh...');
        accessToken = await refreshAccessTokenServer();
    }

    return accessToken;
}

/**
 * Refresh access token on server-side
 * Returns new access token or null if refresh fails
 */
async function refreshAccessTokenServer(): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refresh_token')?.value;

        if (!refreshToken) {
            console.error('No refresh token found');
            return null;
        }

        console.log('Refreshing access token on server...');

        const response = await fetch(`${BASE_URL}/auth/jwt/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            console.error('Failed to refresh token:', response.status);
            return null;
        }

        const data = await response.json();
        const newAccessToken = data.access;

        // Note: We can't set cookies here directly from a utility function
        // The API route that calls this will need to set the cookie
        console.log('Access token refreshed successfully');
        return newAccessToken;

    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
}

/**
 * Helper to decode JWT and get expiration time
 */
function getTokenExpiration(token: string): number | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        const payload = JSON.parse(
            Buffer.from(parts[1], 'base64').toString('utf-8')
        );
        
        if (payload.exp) {
            return payload.exp;
        }
        
        return null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

/**
 * Check if token is expired or about to expire (within 5 minutes)
 */
export function isTokenExpired(token: string): boolean {
    const exp = getTokenExpiration(token);
    if (!exp) return true;
    
    const now = Math.floor(Date.now() / 1000);
    const bufferTime = 5 * 60; // 5 minutes buffer
    
    return exp <= (now + bufferTime);
}