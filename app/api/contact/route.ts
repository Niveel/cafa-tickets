import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate required fields
        const { name, email, subject, message } = body;
        
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Name, email, subject, and message are required" },
                { status: 400 }
            );
        }

        // Forward to backend
        const response = await fetch(`${BASE_URL}/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
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
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}