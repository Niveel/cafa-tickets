import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

/**
 * Decode JWT token to get expiration time
 * JWT format: header.payload.signature
 * Payload contains: { exp: timestamp, ... }
 */
function getTokenExpiration(token: string): number | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        // Decode the payload (base64url)
        const payload = JSON.parse(
            Buffer.from(parts[1], 'base64').toString('utf-8')
        );
        
        // Return seconds until expiration
        if (payload.exp) {
            const now = Math.floor(Date.now() / 1000);
            return payload.exp - now;
        }
        
        return null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        console.log('Login request for:', email);

        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log('Login response status:', response.status);

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        // ✅ Get actual token expiration from JWT payload
        const accessTokenExpiry = getTokenExpiration(data.tokens.access);
        const refreshTokenExpiry = getTokenExpiration(data.tokens.refresh);

        console.log('Access token expires in:', accessTokenExpiry, 'seconds');
        console.log('Refresh token expires in:', refreshTokenExpiry, 'seconds');

        // Success - Set HttpOnly cookies for tokens
        const nextResponse = NextResponse.json(
            {
                message: data.message,
                user: data.user,
            },
            { status: 200 }
        );

        // ✅ Set access token cookie to match Django JWT expiration
        nextResponse.cookies.set('access_token', data.tokens.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: accessTokenExpiry || 60 * 60, // Use token expiry or default to 1 hour
            path: '/',
        });

        // ✅ Set refresh token cookie to match Django JWT expiration
        nextResponse.cookies.set('refresh_token', data.tokens.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: refreshTokenExpiry || 60 * 60 * 24, // Use token expiry or default to 1 day
            path: '/',
        });

        console.log('✅ Tokens stored with matching expiration times');

        return nextResponse;

    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json(
            { error: 'Failed to process login request' },
            { status: 500 }
        );
    }
}