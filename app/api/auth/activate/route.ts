import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { uid, token } = body;

        console.log('Activation request:', { uid, token });
        console.log('Backend URL:', `${BASE_URL}/auth/users/activation/`);

        // Make request to Django backend activation endpoint
        const response = await fetch(`${BASE_URL}/auth/users/activation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ uid, token }),
        });

        console.log('Backend response status:', response.status);
        console.log('Backend response headers:', Object.fromEntries(response.headers.entries()));

        // Success - 204 No Content
        if (response.status === 204) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Try to get response text first
        const responseText = await response.text();
        console.log('Backend response text:', responseText);

        // Error responses - try to parse JSON
        let errorData;
        try {
            errorData = responseText ? JSON.parse(responseText) : { detail: 'Unknown error occurred' };
            console.log('Backend error data:', errorData);
        } catch (e) {
            console.error('Failed to parse error response:', e);
            errorData = { 
                detail: responseText || 'Unknown error occurred',
                status: response.status 
            };
        }

        // Return error with original status code
        return NextResponse.json(errorData, { status: response.status });

    } catch (error: any) {
        console.error('Activation API error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json(
            { error: 'Failed to activate account', detail: error.message },
            { status: 500 }
        );
    }
}