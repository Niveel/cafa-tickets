/**
 * Authentication Utilities
 * 
 * These functions check authentication status and handle token refresh
 */

import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";
import { CurrentUser } from "@/types/general.types";

/**
 * Check if user has valid access token (Server-Side)
 * Note: This doesn't verify the token - just checks if it exists
 * Token verification happens on the Django backend
 */
export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    // User is authenticated if they have a refresh token
    // Even if access token is expired, it can be refreshed
    return !!refreshToken;
}

/**
 * Get current logged-in user (Server-Side)
 * Returns user data or null if not authenticated
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        return null;
    }

    try {
        // Fetch user profile from Django backend
        const response = await fetch(`${BASE_URL}/users/me/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Don't cache user data
        });

        if (!response.ok) {
            console.error('Failed to fetch user:', response.status);
            return null;
        }

        const user = await response.json();
        return user as CurrentUser;

    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}

/**
 * Get access token from cookies (Server-Side)
 * Returns null if not found
 */
export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    return accessToken || null;
}

/**
 * Get refresh token from cookies (Server-Side)
 * Returns null if not found
 */
export async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    return refreshToken || null;
}

/**
 * Check if user is authenticated (Client-Side)
 * Note: HttpOnly cookies can't be accessed from client JavaScript
 * So we make a request to check auth status
 */
export async function isAuthenticatedClient(): Promise<boolean> {
    try {
        const response = await fetch('/api/auth/check', {
            credentials: 'include', // Send cookies
        });

        return response.ok;
    } catch (error) {
        console.error('Auth check failed:', error);
        return false;
    }
}