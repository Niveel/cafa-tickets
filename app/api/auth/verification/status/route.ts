import { NextResponse } from 'next/server';
import { BASE_URL } from '@/data/constants';
import { fetchWithAuthRetry } from '@/app/lib/serverAuth';

export async function GET() {
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/verification/status/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Verification status error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to check verification status' },
            { status: 500 }
        );
    }
}