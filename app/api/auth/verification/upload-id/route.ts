// app/api/auth/verification/upload-id/route.ts
import { NextResponse } from 'next/server';
import { BASE_URL } from '@/data/constants';
import { fetchWithAuthRetry } from '@/app/lib/serverAuth'; 

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const idDocument = formData.get('id_document');

        if (!idDocument || !(idDocument instanceof File)) {
            console.error('❌ Invalid ID document received');
            return NextResponse.json(
                { error: 'Invalid file', message: 'Please provide a valid ID document' },
                { status: 400 }
            );
        }

        const backendFormData = new FormData();
        backendFormData.append('id_document', idDocument);

        const response = await fetchWithAuthRetry(`https://api.cafatickets.com/api/v1/auth/verification/upload-id/`, {
            method: 'POST',
            body: backendFormData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ ID Upload Failed - Backend Error:', {
                status: response.status,
                response: data
            });
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('💥 ID Upload Error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to upload ID document' },
            { status: 500 }
        );
    }
}