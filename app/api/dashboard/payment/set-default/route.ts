import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { message: "Payment profile ID is required" },
                { status: 400 }
            );
        }

        const response = await fetchWithAuthRetry(
            `${BASE_URL}/auth/payment-profile/${id}/set-default/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 204) {
            return NextResponse.json(
                { message: "Default payment profile updated successfully" },
                { status: 200 }
            );
        }

        let data: { message?: string; error?: string; [key: string]: unknown } = {};
        try {
            data = await response.json();
        } catch {
            // no-op, keep empty data object
        }

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || data.error || "Failed to set default payment profile" },
                { status: response.status }
            );
        }

        return NextResponse.json(
            data?.message
                ? data
                : { ...data, message: "Default payment profile updated successfully" }
        );
    } catch (error) {
        console.error("Set default payment profile error:", error);

        if (error instanceof Error && error.message === "Authentication required") {
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
