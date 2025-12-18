// app/api/dashboard/tickets/download/route.ts
import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const ticketId = searchParams.get('ticketId');

        if (!ticketId) {
            return NextResponse.json(
                { error: 'Ticket ID is required' },
                { status: 400 }
            );
        }

        const response = await fetchWithAuthRetry(
            `${BASE_URL}/tickets/${ticketId}/download/`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
        }

        // Get the PDF blob
        const blob = await response.blob();
        
        // Return the PDF with appropriate headers
        return new NextResponse(blob, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="ticket-${ticketId}.pdf"`,
            },
        });

    } catch (error) {
        console.error('Ticket download API error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to download ticket' },
            { status: 500 }
        );
    }
}