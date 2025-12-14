import { NextResponse } from "next/server";

export async function POST() {
    try {
        console.log('Logging out user...');

        // Clear both tokens
        const response = NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );

        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');

        console.log('Tokens cleared');

        return response;

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Failed to logout' },
            { status: 500 }
        );
    }
}