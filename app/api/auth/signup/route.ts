import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch(`${BASE_URL}/auth/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        // Return response with same status code
        return NextResponse.json(data, { status: response.status });

    } catch (error: any) {
        console.error('Signup API error:', error);
        return NextResponse.json(
            { error: 'Failed to process signup request' },
            { status: 500 }
        );
    }
}