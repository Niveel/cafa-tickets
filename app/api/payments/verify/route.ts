import { NextResponse } from 'next/server';
import { BASE_URL } from '@/data/constants';

export async function GET(request: Request) {
    try {
        // Extract reference from URL
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get('reference');

        if (!reference) {
            return NextResponse.json(
                { error: 'Payment reference is required' },
                { status: 400 }
            );
        }

        // Call Django backend to verify payment
        const response = await fetch(
            `${BASE_URL}/payments/verify/${reference}/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('Payment verification error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Verify payment API error:', error);
        
        return NextResponse.json(
            { 
                success: false,
                error: 'Failed to verify payment' 
            },
            { status: 500 }
        );
    }
}