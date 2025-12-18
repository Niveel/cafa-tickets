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
        const formData = await request.formData();

        console.log('Updating event:', slug);

        const response = await fetchWithAuthRetry(`${BASE_URL}/events/${slug}/update/`, {
            method: 'PATCH',
            body: formData,
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
        console.log('Event update response status:', response.status);

        if (!response.ok) {
            console.error('Event update failed:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Event update API error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to update event' },
            { status: 500 }
        );
    }
}