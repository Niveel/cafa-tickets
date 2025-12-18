import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

type RouteContext = {
    params: Promise<{
        slug: string;
    }>;
};

export async function POST(request: Request, context: RouteContext) {
    try {
        const { slug } = await context.params;

        // Get JSON body
        const body = await request.json();

        // console.log('Creating ticket type for event:', slug);
        // console.log('Creating ticket type in route:', body);

        // ✅ Use shared helper - handles auth + retry automatically
        const response = await fetchWithAuthRetry(`${BASE_URL}/events/${slug}/tickets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log('Response status:', response.status);

        // ✅ Check content type before parsing JSON
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            // Django returned HTML error page
            const htmlError = await response.text();
            console.error('❌ Backend returned HTML instead of JSON:');
            console.error('Status:', response.status);
            console.error('Content-Type:', contentType);
            console.error('Response preview:', htmlError.substring(0, 500)); // First 500 chars
            
            return NextResponse.json(
                { 
                    error: 'Backend error - received HTML response',
                    status: response.status,
                    details: htmlError.substring(0, 1000) // Send first 1000 chars to frontend
                },
                { status: response.status }
            );
        }

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
            { error: 'Failed to create ticket type' },
            { status: 500 }
        );
    }
}