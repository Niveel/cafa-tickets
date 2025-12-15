import { EventDetails } from "@/types/events.types";

/**
 * Sanitize image URLs in event details response
 * Removes localhost:8000/media/ prefix from external URLs
 */
export function sanitizeEventDetailsResponse(data: EventDetails): EventDetails {
    const sanitizeUrl = (url: string): string => {
        if (!url) return url;
        
        // Remove localhost:8000/media/ prefix from external URLs
        const malformedPrefix = 'http://localhost:8000/media/https%3A/';
        if (url.startsWith(malformedPrefix)) {
            return url.replace(malformedPrefix, 'https://');
        }
        
        return url;
    };

    return {
        ...data,
        featured_image: sanitizeUrl(data.featured_image),
        additional_images: data.additional_images.map(img => sanitizeUrl(img)),
        organizer: {
            ...data.organizer,
            profile_image: data.organizer.profile_image 
                ? sanitizeUrl(data.organizer.profile_image) 
                : null
        },
        similar_events: data.similar_events.map(event => ({
            ...event,
            featured_image: sanitizeUrl(event.featured_image)
        }))
    };
}