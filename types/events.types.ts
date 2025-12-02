export interface Event {
    id: number;
    title: string;
    slug: string;
    organizer: {
        id: number;
        username: string;
        full_name: string;
        profile_image: string;
    };
    category: {
        id: number;
        name: string;
        slug: string;
        icon: string;
    };
    short_description: string;
    featured_image: string;
    venue_name: string;
    venue_city: string;
    venue_country: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    tickets_sold: number;
    tickets_available: number;
    total_tickets: number;
    lowest_price: string;
    highest_price: string;
    status: "upcoming" | "ongoing" | "past";
    is_recurring: boolean;
    created_at: string;
}