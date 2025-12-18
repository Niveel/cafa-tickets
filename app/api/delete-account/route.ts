// app/api/delete-account/route.ts
import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";
import { cookies } from "next/headers";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        // Clear auth cookies on successful deletion
        const cookieStore = await cookies();
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: 'Session expired. Please log in again.' },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to delete account' },
            { status: 500 }
        );
    }
}