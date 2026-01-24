import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const response = await fetchWithAuthRetry(`${BASE_URL}/events/create/`, {
            method: 'POST',
            body: formData,
        });

        // ✅ DEBUGGING: Check what we're getting back
        const contentType = response.headers.get('content-type');
        console.log('Response Content-Type:', contentType);
        console.log('Response Status:', response.status);

        // If not JSON, log the HTML error
        if (!contentType?.includes('application/json')) {
            const html = await response.text();
            console.error('HTML Response (Django Error Page):', html.substring(0, 500));
            
            return NextResponse.json(
                { error: 'Server returned HTML error page. Check backend logs.' },
                { status: 500 }
            );
        }

        const data = await response.json();
        // console.log('Event creation response:', data);

        if (!response.ok) {
            console.error('Event creation failed:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('Event creation API error:', error);
        
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