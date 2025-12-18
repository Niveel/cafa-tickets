import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

type RouteContext = {
    params: Promise<{
        slug: string;
    }>;
};

export async function DELETE(request: Request, context: RouteContext) {
    try {
        const { slug } = await context.params;

        console.log('Deleting event:', slug);

        const response = await fetchWithAuthRetry(`${BASE_URL}/events/${slug}/delete/`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            return NextResponse.json(
                { message: 'Event deleted successfully' },
                { status: 200 }
            );
        }

        let data;
        try {
            data = await response.json();
        } catch {
            return NextResponse.json(
                { error: 'Failed to delete event' },
                { status: response.status }
            );
        }

        if (!response.ok) {
            console.error('Event deletion failed:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Event deletion API error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}