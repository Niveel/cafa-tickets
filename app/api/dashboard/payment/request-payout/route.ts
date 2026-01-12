// app/api/dashboard/payment/request-payout/route.ts
import { NextResponse } from 'next/server';
import { BASE_URL } from '@/data/constants';
import { fetchWithAuthRetry } from '@/app/lib/serverAuth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount } = body;

        // Validation
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount', message: 'Please provide a valid amount' },
                { status: 400 }
            );
        }

        // Forward to Django backend
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/withdrawal/request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        // 🔍 Check if response is actually JSON
        const contentType = response.headers.get('content-type');
        
        if (!contentType?.includes('application/json')) {
            // ❌ Got HTML or something else instead of JSON
            const htmlText = await response.text();
            
            console.error('❌ Backend returned non-JSON response:', {
                status: response.status,
                statusText: response.statusText,
                contentType: contentType,
                url: response.url,
                htmlPreview: htmlText.substring(0, 500), // First 500 chars
            });

            // Save full HTML to see the complete error
            console.error('Full HTML Error:', htmlText);

            return NextResponse.json(
                { 
                    success: false,
                    error: 'Server error',
                    message: 'Backend server error. Check logs for details.' 
                },
                { status: response.status || 500 }
            );
        }

        // ✅ It's JSON, safe to parse
        const data = await response.json();

        if (!response.ok) {
            console.error('❌ Payout request failed:', {
                status: response.status,
                djangoError: data,
                requestAmount: amount,
            });
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('💥 Payout request error:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            type: error?.constructor?.name,
        });
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to request payout' },
            { status: 500 }
        );
    }
}