/**
 * API Client with Automatic Token Refresh
 * 
 * This utility handles:
 * - Adding access token to requests
 * - Automatically refreshing expired tokens
 * - Retrying failed requests after token refresh
 * 
 * Note: This is a server-side utility for making authenticated requests
 * For client-side logout, use @/utils/logout from client components
 */

type FetchOptions = RequestInit & {
    skipAuth?: boolean; // Skip adding auth header
};

/**
 * Make an authenticated API request
 * Automatically handles token refresh if access token is expired
 */
export async function fetchWithAuth(
    url: string,
    options: FetchOptions = {}
): Promise<Response> {
    const { skipAuth = false, ...fetchOptions } = options;

    // First attempt - use existing access token
    let response = await makeRequest(url, fetchOptions, skipAuth);

    // If 401 and not skipping auth, try to refresh token and retry
    if (response.status === 401 && !skipAuth) {
        console.log('Access token expired, attempting refresh...');

        const refreshed = await refreshAccessToken();

        if (refreshed) {
            console.log('Token refreshed, retrying request...');
            // Retry the original request with new token
            response = await makeRequest(url, fetchOptions, skipAuth);
        } else {
            console.error('Token refresh failed, redirecting to login...');
            // Refresh failed - redirect to login (client-side only)
            if (typeof window !== 'undefined') {
                window.location.href = '/login?session_expired=true';
            }
        }
    }

    return response;
}

/**
 * Internal function to make the actual request
 */
async function makeRequest(
    url: string,
    options: RequestInit,
    skipAuth: boolean
): Promise<Response> {
    const headers = new Headers(options.headers);

    // Add default headers
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    // Note: We don't manually add the access token here
    // The browser automatically sends the HttpOnly cookie with the request
    // This is more secure than storing tokens in localStorage

    return fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Important: Send cookies with request
    });
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(): Promise<boolean> {
    try {
        const response = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include', // Send cookies (including refresh_token)
        });

        if (response.ok) {
            console.log('Access token refreshed successfully');
            return true;
        } else {
            console.error('Failed to refresh token:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
}