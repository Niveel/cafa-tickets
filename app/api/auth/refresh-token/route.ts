import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        // Get refresh token from cookies
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refresh_token')?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { error: 'No refresh token found' },
                { status: 401 }
            );
        }

        console.log('Refreshing access token...');

        // Request new access token from backend
        const response = await fetch(`${BASE_URL}/auth/jwt/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const data = await response.json();
        console.log('Refresh response status:', response.status);

        if (!response.ok) {
            // Refresh token is invalid/expired
            console.error('Refresh token invalid:', data);

            // Clear invalid tokens
            const nextResponse = NextResponse.json(
                { error: 'Refresh token expired', detail: data.detail },
                { status: 401 }
            );

            nextResponse.cookies.delete('access_token');
            nextResponse.cookies.delete('refresh_token');

            return nextResponse;
        }

        // Success - Set new access token in cookie
        const nextResponse = NextResponse.json(
            { success: true },
            { status: 200 }
        );

        const payload = JSON.parse(Buffer.from(data.access.split('.')[1], 'base64').toString('utf-8'));
        const expiresIn = payload.exp ? payload.exp - Math.floor(Date.now() / 1000) : 60 * 60;

        nextResponse.cookies.set('access_token', data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: expiresIn,
            path: '/',
        });

        console.log('Access token refreshed successfully');

        return nextResponse;

    } catch (error: any) {
        console.error('Token refresh error:', error);
        return NextResponse.json(
            { error: 'Failed to refresh token', detail: error.message },
            { status: 500 }
        );
    }
}