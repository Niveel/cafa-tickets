import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { sanitizeEventsResponse } from "@/utils/sanitizeEventData";
import type { PaginatedEventsResponse } from "@/types/events.types";

/**
 * GET /api/events
 * Fetch paginated events from Django backend
 * This is a public endpoint (no authentication required)
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url); 
        
        // Forward all query params to backend
        const queryString = searchParams.toString();
        const backendUrl = `${BASE_URL}/events/${queryString ? `?${queryString}` : ''}`;

        console.log('Fetching events from:', backendUrl);

        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Don't cache event listings
        });

        if (!response.ok) {
            console.error('Backend response error:', response.status);
            const error = await response.text();
            return NextResponse.json(
                { error: 'Failed to fetch events', detail: error },
                { status: response.status }
            );
        }

        const data = await response.json() as PaginatedEventsResponse;
        
        // ✨ Sanitize image URLs before sending to frontend
        const sanitizedData = sanitizeEventsResponse(data);
        
        return NextResponse.json(sanitizedData, { status: 200 });

    } catch (error) {
        console.error('Events API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}