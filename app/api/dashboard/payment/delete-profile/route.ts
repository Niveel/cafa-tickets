import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { message: "Payment profile ID is required" },
                { status: 400 }
            );
        }

        // ✅ Use shared helper - handles auth + retry automatically
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/payment-profile/${id}/`, {
            method: "DELETE",
        });

        // Django returns 204 No Content on successful delete
        if (response.status === 204) {
            return NextResponse.json(
                { message: "Payment profile deleted successfully" },
                { status: 200 }
            );
        }

        // If not 204, try to get error message
        let data;
        try {
            data = await response.json();
        } catch {
            // If response has no body, return generic error
            return NextResponse.json(
                { message: "Failed to delete payment profile" },
                { status: response.status }
            );
        }

        return NextResponse.json(
            { message: data.message || data.error || "Failed to delete payment profile" },
            { status: response.status }
        );

    } catch (error) {
        console.error("Payment profile deletion error:", error);
        
        // Handle auth errors
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}