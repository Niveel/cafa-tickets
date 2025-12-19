import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const { email } = body;
        
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Forward to backend
        const response = await fetch(`${BASE_URL}/newsletter/subscribe/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                data,
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}