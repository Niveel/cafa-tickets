import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";
import { UserStats } from "@/types/dashboard.types";

export async function getUserStats() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/auth/stats/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store", 
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user stats: ${response.status}`);
    }

    const data: UserStats = await response.json();
    return data;
}