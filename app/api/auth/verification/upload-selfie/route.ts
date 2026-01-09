// app/api/auth/verification/upload-selfie/route.ts
import { NextResponse } from 'next/server';
import { BASE_URL } from '@/data/constants';
import { fetchWithAuthRetry } from '@/app/lib/serverAuth';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const selfieImage = formData.get('selfie_image');

        if (!selfieImage || !(selfieImage instanceof File)) {
            console.error('❌ Invalid selfie image received');
            return NextResponse.json(
                { error: 'Invalid file', message: 'Please provide a valid selfie' },
                { status: 400 }
            );
        }

        const backendFormData = new FormData();
        backendFormData.append('selfie_image', selfieImage);

        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/verification/upload-selfie/`, {
            method: 'POST',
            body: backendFormData,
        });

        const data = await response.json();

        // Only log if there's an error or rejection
        if (!response.ok) {
            console.error('❌ Selfie Upload Failed - Backend Error:', {
                status: response.status,
                response: data
            });
            return NextResponse.json(data, { status: response.status });
        }

        // Log rejection details for debugging
        if (data.success && data.data?.verification_status === 'rejected') {
            console.log('\n❌ VERIFICATION REJECTED');
            console.log('Backend Response:', JSON.stringify(data, null, 2));
            console.log('Rejection Reason:', data.data.rejection_reason);
            console.log('Can Retry:', data.data.can_retry);
            console.log('');
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('💥 Selfie Upload Error:', error);
        
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to upload selfie' },
            { status: 500 }
        );
    }
}