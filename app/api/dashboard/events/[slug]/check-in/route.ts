// app/api/dashboard/events/[slug]/check-in/route.ts
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
        const body = await request.json();

        const response = await fetchWithAuthRetry(
            `${BASE_URL}/events/${slug}/checkin/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            // console.error('Check-in API error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Check-in API error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to check in ticket' },
            { status: 500 }
        );
    }
}