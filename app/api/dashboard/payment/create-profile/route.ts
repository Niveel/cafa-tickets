import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function POST(request: Request) {
    try {
        // Get the request body (contains method, name, description, account_details)
        const body = await request.json();

        // Validate required fields
        if (!body.method || !body.name || !body.account_details) {
            console.error('❌ Validation error - Missing fields:', { 
                hasMethod: !!body.method, 
                hasName: !!body.name, 
                hasAccountDetails: !!body.account_details 
            });
            return NextResponse.json(
                {
                    error: "Validation error",
                    message: "Missing required fields: method, name, and account_details are required"
                },
                { status: 400 }
            );
        }

        // Validate method - only bank_transfer allowed
        if (body.method !== "bank_transfer") {
            console.error('❌ Invalid payment method:', body.method);
            return NextResponse.json(
                {
                    error: "Validation error",
                    message: "Invalid method. Only 'bank_transfer' is supported"
                },
                { status: 400 }
            );
        }

        // Call backend API
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/payment-profile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ Backend error:', {
                status: response.status,
                data,
                details: data?.details
            });
            
            // Extract specific error message from details
            let errorMessage = data.message || 'Failed to create payment profile';
            
            if (data.details) {
                // Handle account_details errors (array of strings)
                if (data.details.account_details && Array.isArray(data.details.account_details)) {
                    errorMessage = data.details.account_details[0];
                }
                // Handle other field errors (could be strings or arrays)
                else if (typeof data.details === 'object') {
                    const firstError = Object.values(data.details)[0];
                    if (Array.isArray(firstError)) {
                        errorMessage = firstError[0];
                    } else if (typeof firstError === 'string') {
                        errorMessage = firstError;
                    }
                }
            }
            
            return NextResponse.json(
                { 
                    ...data, 
                    message: errorMessage // Override generic message with specific one
                }, 
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error("💥 Payment profile creation error:", error);
        
        // Handle auth errors
        if (error instanceof Error && error.message === 'Authentication required') {
            console.error('❌ Authentication required - no token found');
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