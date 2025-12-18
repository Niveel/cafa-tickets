import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

type RouteContext = {
    params: Promise<{
        slug: string;
    }>;
};

export async function PATCH(request: Request, context: RouteContext) {
    try {
        const { slug } = await context.params;
        const { searchParams } = new URL(request.url);
        const ticketId = searchParams.get('ticketId');

        if (!ticketId) {
            return NextResponse.json(
                { error: 'Ticket ID is required' },
                { status: 400 }
            );
        }

        const body = await request.json();

        console.log('Updating ticket:', ticketId, 'for event:', slug);

        const response = await fetchWithAuthRetry(`${BASE_URL}/events/${slug}/tickets/${ticketId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            const htmlError = await response.text();
            console.error('❌ Backend returned HTML instead of JSON:');
            console.error('Status:', response.status);
            console.error('Response preview:', htmlError.substring(0, 500));
            
            return NextResponse.json(
                { 
                    error: 'Backend error - received HTML response',
                    status: response.status,
                    details: htmlError.substring(0, 1000)
                },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('Ticket update response status:', response.status);

        if (!response.ok) {
            console.error('Ticket update failed:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Ticket update API error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to update ticket' },
            { status: 500 }
        );
    }
}