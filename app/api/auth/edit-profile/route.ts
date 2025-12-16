import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

export async function PATCH(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized", message: "No authentication token found" },
                { status: 401 }
            );
        }

        // Get the request body (could be JSON or FormData)
        const contentType = request.headers.get("content-type");
        let body;

        if (contentType?.includes("multipart/form-data")) {
            // FormData (for image uploads)
            body = await request.formData();
        } else {
            // JSON (for text fields only)
            body = await request.json();
        }

        // Forward to Django backend
        const response = await fetch(`${BASE_URL}/auth/profile/`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                // Let fetch handle Content-Type for FormData
                ...(contentType?.includes("application/json") && {
                    "Content-Type": "application/json",
                }),
            },
            body: contentType?.includes("application/json")
                ? JSON.stringify(body)
                : body,
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json(
            { error: "Server error", message: "Failed to update profile" },
            { status: 500 }
        );
    }
}