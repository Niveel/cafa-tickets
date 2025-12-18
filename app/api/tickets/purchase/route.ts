import { NextResponse } from 'next/server';
import { BASE_URL } from '@/data/constants';
import { fetchWithAuthRetry } from '@/app/lib/serverAuth';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetchWithAuthRetry(
            `${BASE_URL}/tickets/purchase/`,
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
            console.error('Purchase initiation error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('Purchase API error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to process purchase' },
            { status: 500 }
        );
    }
}