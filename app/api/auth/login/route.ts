import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        console.log('Login request for:', email);

        // Make request to Django backend login endpoint
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
        console.log('Login response data:', data);

        if (!response.ok) {
            // Return error response
            return NextResponse.json(data, { status: response.status });
        }

        // Success - Set HttpOnly cookies for tokens
        const nextResponse = NextResponse.json(
            {
                message: data.message,
                user: data.user,
            },
            { status: 200 }
        );

        // Set access token cookie (expires in 5 minutes as per JWT)
        nextResponse.cookies.set('access_token', data.tokens.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 5, // 5 minutes
            path: '/',
        });

        // Set refresh token cookie (expires in 1 day)
        nextResponse.cookies.set('refresh_token', data.tokens.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        console.log('Tokens stored in HttpOnly cookies');

        return nextResponse;

    } catch (error: any) {
        console.error('Login API error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json(
            { error: 'Failed to process login request', detail: error.message },
            { status: 500 }
        );
    }
}