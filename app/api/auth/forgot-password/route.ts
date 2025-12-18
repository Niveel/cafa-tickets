import { NextResponse } from 'next/server';
import { BASE_URL } from '@/data/constants';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch(`${BASE_URL}/auth/users/reset_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Djoser returns 204 No Content on success
        if (response.status === 204) {
            return new NextResponse(null, { status: 204 });
        }

        const data = await response.json();

        if (!response.ok) {
            console.error('Forgot password error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Forgot password API error:', error);
        return NextResponse.json(
            { error: 'Failed to process password reset request' },
            { status: 500 }
        );
    }
}