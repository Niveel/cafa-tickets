import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        
        // Forward all query params to backend
        const queryString = searchParams.toString();
        const backendUrl = `${BASE_URL}/events/my-events/${queryString ? `?${queryString}` : ''}`;

        console.log('Fetching my events from:', backendUrl);

        const response = await fetchWithAuthRetry(backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('Backend response error:', response.status);
            
            const error = await response.text();
            return NextResponse.json(
                { error: 'Failed to fetch events', detail: error },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        // Sanitize image URLs
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((event: any) => ({
                ...event,
                featured_image: sanitizeImageUrl(event.featured_image),
                organizer: {
                    ...event.organizer,
                    profile_image: event.organizer.profile_image 
                        ? sanitizeImageUrl(event.organizer.profile_image)
                        : null
                }
            }));
        }
        
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('My events API error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Unauthorized', message: 'Please login again' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

function sanitizeImageUrl(url: string): string {
    if (!url) return url;
    
    const malformedPattern = /^https?:\/\/localhost:8000\/media\/(https?%3A.*)/;
    const match = url.match(malformedPattern);
    
    if (match) {
        return decodeURIComponent(match[1]).replace(/%3A/g, ':').replace(/\/$/, '');
    }
    
    return url;
}