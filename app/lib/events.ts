import { BASE_URL } from "@/data/constants";
import { PaginatedEventsResponse, EventFilters, EventDetails } from "@/types/events.types";
import { sanitizeEventsResponse } from "@/utils/sanitizeEventData";

/**
 * Fetch paginated events from the backend
 * 
 * @param filters - Filter and pagination options
 * @returns Paginated events response with sanitized image URLs
 */
export async function getEvents(filters: EventFilters = {}): Promise<PaginatedEventsResponse> {
    try {
        // Build query params
        const params = new URLSearchParams();

        if (filters.search) params.set('search', filters.search);
        if (filters.category) params.set('category', filters.category);
        if (filters.city) params.set('city', filters.city);
        if (filters.status && filters.status !== 'all') params.set('status', filters.status);
        if (filters.date_from) params.set('date_from', filters.date_from);
        if (filters.date_to) params.set('date_to', filters.date_to);
        if (filters.price_min) params.set('price_min', filters.price_min);
        if (filters.price_max) params.set('price_max', filters.price_max);
        if (filters.ordering) params.set('ordering', filters.ordering);
        if (filters.page) params.set('page', filters.page.toString());

        const queryString = params.toString();
        const url = `${BASE_URL}/events/${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Don't cache event listings
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data: PaginatedEventsResponse = await response.json();
        
        // ✨ Sanitize image URLs before returning to caller
        const sanitizedData = sanitizeEventsResponse(data);
        
        return sanitizedData;

    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

/**
 * Fetch event details by slug
 * 
 * @param slug - Event slug
 * @returns Event details with sanitized image URLs or null if not found
 */
export async function getEventBySlug(slug: string): Promise<EventDetails | null> {
    try {
        const url = `${BASE_URL}/events/${slug}/`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Don't cache event details
        });

        // Handle 404 - Event not found
        if (response.status === 404) {
            console.log(`Event not found: ${slug}`);
            return null;
        }

        // Handle other errors
        if (!response.ok) {
            console.error(`Failed to fetch event: ${response.status}`);
            throw new Error(`Failed to fetch event: ${response.status}`);
        }

        const data: EventDetails = await response.json();
        // console.log('Raw Event Details:', data);
        
        return data;

    } catch (error) {
        console.error(`Error fetching event ${slug}:`, error);
        throw error;
    }
}