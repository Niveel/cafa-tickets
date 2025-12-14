import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        console.log('Resend activation request for:', email);

        // Make request to Django backend
        const response = await fetch(`${BASE_URL}/auth/users/resend_activation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        console.log('Resend activation response status:', response.status);

        // Success - 204 No Content
        if (response.status === 204) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Error responses - try to parse JSON
        let errorData;
        try {
            errorData = await response.json();
            console.log('Resend activation error data:', errorData);
        } catch (e) {
            console.error('Failed to parse error response:', e);
            errorData = { detail: 'Unknown error occurred' };
        }

        // Return error with original status code
        return NextResponse.json(errorData, { status: response.status });

    } catch (error: any) {
        console.error('Resend activation API error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json(
            { error: 'Failed to resend activation email', detail: error.message },
            { status: 500 }
        );
    }
}