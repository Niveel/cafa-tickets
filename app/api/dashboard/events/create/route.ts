import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function POST(request: Request) {
    try {
        // Get FormData from request
        const formData = await request.formData();

        // console.log('Creating event...', formData);

        // ✅ Use shared helper - handles auth + retry automatically
        const response = await fetchWithAuthRetry(`${BASE_URL}/events/create/`, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type - let fetch handle it for FormData
        });

        const data = await response.json();
        console.log('Event creation response status:', response.status);

        if (!response.ok) {
            console.error('Event creation failed:', data);
            return NextResponse.json(data, { status: response.status });
        }

        // ✅ Success - Return created event
        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('Event creation API error:', error);
        
        // Handle auth errors
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}