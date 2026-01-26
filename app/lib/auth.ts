import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";
import { CurrentUser } from "@/types/general.types";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    
    // If no refresh token, definitely not authenticated
    if (!refreshToken) {
        return false;
    }
    
    // Check if we can get access token (will auto-refresh if needed)
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/profile/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });
        
        return response.ok;
    } catch (error) {
        return false;
    }
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/profile/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Failed to fetch user:', response.status);
            console.error('❌ Error body:', errorText);
            return null;
        }

        const user = await response.json();
        return user as CurrentUser;

    } catch (error) {
        console.error('💥 Error fetching current user:', error);
        return null;
    }
}

export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    return accessToken || null;
}

export async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    return refreshToken || null;
}

export async function isAuthenticatedClient(): Promise<boolean> {
    try {
        const response = await fetch('/api/auth/check', {
            credentials: 'include',
        });

        return response.ok;
    } catch (error) {
        console.error('Auth check failed:', error);
        return false;
    }
}
