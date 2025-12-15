import type { Event, PaginatedEventsResponse } from '@/types/events.types';

/**
 * Sanitize image URLs from Django backend
 * Extracts clean Unsplash URLs from Django's media-prefixed URLs
 */
export function sanitizeImageUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    
    // If URL contains encoded "https://", extract and decode it
    // Example: http://localhost:8000/media/https%3A/images.unsplash.com/photo-...
    // Extract: https://images.unsplash.com/photo-...
    
    if (url.includes('media/https%3A')) {
        const match = url.match(/https%3A(.+)/);
        if (match) {
            // Decode the URL-encoded string
            const cleanUrl = decodeURIComponent('https:' + match[1]);
            return cleanUrl;
        }
    }
    
    // If URL contains media/http%3A (non-SSL)
    if (url.includes('media/http%3A')) {
        const match = url.match(/http%3A(.+)/);
        if (match) {
            const cleanUrl = decodeURIComponent('http:' + match[1]);
            return cleanUrl;
        }
    }
    
    // If it's already a proper URL, return as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    
    // If it's a relative path (actual uploaded file)
    if (url.startsWith('/media/')) {
        // Prepend backend URL
        return `http://localhost:8000${url}`;
    }
    
    // Default: return as-is
    return url;
}

/**
 * Sanitize a single event object
 */
export function sanitizeEvent(event: Event): Event {
    return {
        ...event,
        featured_image: sanitizeImageUrl(event.featured_image) || event.featured_image,
        organizer: {
            ...event.organizer,
            profile_image: sanitizeImageUrl(event.organizer.profile_image) || event.organizer.profile_image,
        },
    };
}

/**
 * Type guard to check if response is paginated
 */
function isPaginatedResponse(data: unknown): data is PaginatedEventsResponse {
    return (
        typeof data === 'object' &&
        data !== null &&
        'results' in data &&
        Array.isArray((data as PaginatedEventsResponse).results)
    );
}

/**
 * Type guard to check if response is single event
 */
function isSingleEvent(data: unknown): data is Event {
    return (
        typeof data === 'object' &&
        data !== null &&
        'id' in data &&
        'title' in data &&
        !Array.isArray(data) &&
        !('results' in data)
    );
}

/**
 * Type guard to check if response is array of events
 */
function isEventArray(data: unknown): data is Event[] {
    return Array.isArray(data) && data.length > 0 && 'id' in data[0];
}

/**
 * Sanitize events response from Django
 * Handles paginated responses, single events, or event arrays
 */
export function sanitizeEventsResponse<T>(data: T): T {
    if (!data) return data;
    
    // Handle paginated response
    if (isPaginatedResponse(data)) {
        return {
            ...data,
            results: data.results.map(sanitizeEvent),
        } as T;
    }
    
    // Handle single event
    if (isSingleEvent(data)) {
        return sanitizeEvent(data) as T;
    }
    
    // Handle array of events
    if (isEventArray(data)) {
        return data.map(sanitizeEvent) as T;
    }
    
    return data;
}