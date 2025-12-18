import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function POST(request: Request) {
    try {
        // Get the request body (contains method, name, description, account_details)
        const body = await request.json();

        // Validate required fields
        if (!body.method || !body.name || !body.account_details) {
            return NextResponse.json(
                {
                    error: "Validation error",
                    message: "Missing required fields: method, name, and account_details are required"
                },
                { status: 400 }
            );
        }

        // Validate method
        if (!["mobile_money", "bank_transfer"].includes(body.method)) {
            return NextResponse.json(
                {
                    error: "Validation error",
                    message: "Invalid method. Must be 'mobile_money' or 'bank_transfer'"
                },
                { status: 400 }
            );
        }

        // ✅ Use shared helper - handles auth + retry automatically
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/payment-profile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error("Payment profile creation error:", error);
        
        // Handle auth errors
        if (error instanceof Error && error.message === 'Authentication required') {
            return NextResponse.json(
                { error: "Unauthorized", message: "No authentication token found" },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: "Server error", message: "Failed to create payment profile" },
            { status: 500 }
        );
    }
}