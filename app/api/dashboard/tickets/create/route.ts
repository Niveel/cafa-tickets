import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function POST(request: Request) {
    try {
        // Get JSON body
        const body = await request.json();

        console.log('Creating ticket type...', body);

        // ✅ Use shared helper - handles auth + retry automatically
        const response = await fetchWithAuthRetry(`${BASE_URL}/tickets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log('Ticket creation response status:', response.status);

        if (!response.ok) {
            console.error('Ticket creation failed:', data);
            return NextResponse.json(data, { status: response.status });
        }

        // ✅ Success - Return created ticket
        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('Ticket creation API error:', error);
        
        // Handle auth errors
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to create ticket' },
            { status: 500 }
        );
    }
}