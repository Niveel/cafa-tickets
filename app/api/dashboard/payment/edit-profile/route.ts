import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, name, description } = body;

        if (!id) {
            return NextResponse.json(
                { message: "Payment profile ID is required" },
                { status: 400 }
            );
        }

        if (!name && !description) {
            return NextResponse.json(
                { message: "At least one field (name or description) is required" },
                { status: 400 }
            );
        }

        // ✅ Use shared helper - handles auth + retry automatically
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/payment-profile/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || data.error || "Failed to update payment profile" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("Payment profile update error:", error);
        
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