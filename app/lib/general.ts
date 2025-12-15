import { BASE_URL } from "@/data/constants";
import { EventCategory } from "@/types/general.types";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type EventCategoriesResponse = {
    count: number;
    categories: EventCategory[];
};

// ============================================
// EVENT CATEGORIES
// ============================================

/**
 * Fetch all event categories from the backend
 * This is a public endpoint (no authentication required)
 * 
 * @returns Array of event categories sorted alphabetically
 * @throws Error if the request fails
 */
export const getEventCategories = async (): Promise<EventCategory[]> => {
    try {
        const response = await fetch(`${BASE_URL}/event-categories/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'force-cache', // Cache categories as they don't change often
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.status}`);
        }

        const data: EventCategoriesResponse = await response.json();
        
        // Return the categories array
        return data.categories;

    } catch (error) {
        console.error('Error fetching event categories:', error);
        throw error;
    }
};
