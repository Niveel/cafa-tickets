import { RecurrencePattern } from "@/types/dash-events.types";

export function buildEventFormData(eventData: {
    // Basic Info
    title: string;
    category_slug: string;
    short_description: string;
    description: string;
    
    // Venue
    venue_name: string;
    venue_address: string;
    venue_city: string;
    venue_country: string;
    venue_latitude?: string;
    venue_longitude?: string;
    
    // Date & Time
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    
    // Recurrence (optional)
    is_recurring: boolean;
    recurrence_pattern?: RecurrencePattern | null;
    
    // Policies
    check_in_policy: 'single_entry' | 'multiple_entry' | 'daily_entry';
    max_attendees: number;
    
    // Payment
    payment_profile_id: string;
    
    // Images - Accept both File (new uploads) and string (existing URLs for edit)
    featured_image: File | string;
    additional_images?: (File | string)[];
    
    // Publishing
    is_published: boolean;
    
    // Tickets
    ticket_types: Array<{
        name: string;
        description?: string;
        price: string;
        quantity: number;
        min_purchase?: number;
        max_purchase?: number;
        available_from?: string;
        available_until?: string;
    }>;
}): FormData {
    const formData = new FormData();

    // Add text fields
    formData.append('title', eventData.title);
    formData.append('category_slug', eventData.category_slug);
    formData.append('short_description', eventData.short_description);
    formData.append('description', eventData.description);
    
    // Venue
    formData.append('venue_name', eventData.venue_name);
    formData.append('venue_address', eventData.venue_address);
    formData.append('venue_city', eventData.venue_city);
    formData.append('venue_country', eventData.venue_country);
    if (eventData.venue_latitude) formData.append('venue_latitude', eventData.venue_latitude);
    if (eventData.venue_longitude) formData.append('venue_longitude', eventData.venue_longitude);
    
    // Date & Time
    formData.append('start_date', eventData.start_date);
    formData.append('end_date', eventData.end_date);
    formData.append('start_time', eventData.start_time);
    formData.append('end_time', eventData.end_time);
    
    // Recurrence
    formData.append('is_recurring', eventData.is_recurring.toString());
    if (eventData.recurrence_pattern) {
        formData.append('recurrence_pattern', JSON.stringify(eventData.recurrence_pattern));
    }
    
    // Policies
    formData.append('check_in_policy', eventData.check_in_policy);
    formData.append('max_attendees', eventData.max_attendees.toString());
    
    // Payment
    formData.append('payment_profile_id', eventData.payment_profile_id);
    
    // Images - Smart handling for both create and edit modes
    if (eventData.featured_image instanceof File) {
        // New upload - append File
        formData.append('featured_image', eventData.featured_image);
    }
    // Note: If featured_image is a string (existing URL), we don't append it.
    // The backend will keep the existing image when the field is not in FormData.
    
    if (eventData.additional_images && eventData.additional_images.length > 0) {
        eventData.additional_images.forEach((image) => {
            if (image instanceof File) {
                // New upload - append File
                formData.append('additional_images', image);
            }
            // Note: Skip strings (existing URLs) - backend keeps them
        });
    }
    
    // Publishing
    formData.append('is_published', eventData.is_published.toString());
    
    // Add ticket types as JSON string
    const ticketTypesJSON = JSON.stringify(eventData.ticket_types);
    formData.append('ticket_types', ticketTypesJSON);

    return formData;
}