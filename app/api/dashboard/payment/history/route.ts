import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const pageSize = searchParams.get('page_size') || '10';
        const status = searchParams.get('status') || '';
        const dateFrom = searchParams.get('date_from') || '';
        const dateTo = searchParams.get('date_to') || '';

        const params = new URLSearchParams({
            page,
            page_size: pageSize,
        });

        if (status) {
            params.append('status', status);
        }

        if (dateFrom) {
            params.append('date_from', dateFrom);
        }

        if (dateTo) {
            params.append('date_to', dateTo);
        }

        const response = await fetch(`${BASE_URL}/payments/?${params.toString()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "Failed to fetch payment history" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}