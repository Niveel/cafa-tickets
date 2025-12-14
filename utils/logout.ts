"use client";

/**
 * Client-side logout utility
 * Call this from client components to logout user
 */
export async function logout(): Promise<void> {
    try {
        // Call logout endpoint to clear cookies
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always redirect to login
        window.location.href = '/login';
    }
}