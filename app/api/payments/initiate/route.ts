import { NextResponse } from 'next/server';
import { BASE_URL } from '@/data/constants';
import { fetchWithAuthRetry } from '@/app/lib/serverAuth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Extract data from the request
        const { event_slug, ticket_type_id, quantity, attendee_info } = body;

        // Prepare payload for new payment endpoint
        const payload = {
            event_slug: event_slug || '',
            ticket_type_id,
            quantity,
            buyer_name: attendee_info.name,
            buyer_email: attendee_info.email,
            buyer_phone: attendee_info.phone,
        };

        // Call the new payment initiation endpoint
        const response = await fetchWithAuthRetry(
            `${BASE_URL}/payments/initiate/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('Payment initiation error:', data);
            return NextResponse.json(
                { message: data.error || 'Failed to initiate payment' },
                { status: response.status }
            );
        }

        // Return payment details in the format frontend expects
        return NextResponse.json({
            success: true,
            purchase_id: data.purchase_id,
            payment: {
                payment_url: data.authorization_url,
                reference: data.payment_reference,
                amount: data.amount,
                currency: data.currency,
            }
        }, { status: 201 });

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