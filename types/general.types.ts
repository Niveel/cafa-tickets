import { ReactElement } from "react";

export interface NavLink {
    id: number;
    name: string;
    url: string;
    icon: ReactElement;
}

export interface EventCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    event_count: number;
}

export interface CurrentUser {
    id: number;
    username: string;
    email: string;
    full_name: string;
    phone_number: string | null;
    profile_image: string | null;
    bio: string | null;
    city: string | null;
    country: string | null;
    is_email_verified: boolean;
    date_joined: string;
    last_login: string | null;
    is_organizer: boolean;

    settings: {
        marketing_emails: boolean;
        event_reminders: boolean;
        email_notifications: boolean;
        sms_notifications: boolean;
    };

    stats: {
        total_tickets_purchased: number;
        total_events_attended: number;
        events_organized: number;
        total_spent: number;
        account_age_days: number;
    };
}


export interface ProfileMenuItem {
    label: string;
    icon: ReactElement;
    link: string | null;
    isLogout?: boolean;
}

export type DashboardSideLink = {
    id: number;
    title: string;
    link: string;
    icon: ReactElement;
}

export interface PublicStats {
    success: boolean;
    data: {
        overview: {
            total_upcoming_events: number;
            total_tickets_sold: number;
            total_organizers: number;
            total_attendees_checked_in: number;
            total_events_published: number;
            active_events_now: number;
        };
        revenue: {
            total_revenue: string;
            currency: string;
        };
        highlights: {
            most_popular_event: {
                id: number;
                slug: string;
                title: string;
                tickets_sold: number;
                category: string | null;
            } | null;
            events_this_month: number;
            new_organizers_this_month: number;
        };
        last_updated: string;
    };
}

export interface PolicySection {
    id: number;
    title: string;
    content: string[];
}

export interface TermSection {
    id: number;
    title: string;
    content: string[];
    subsections?: {
        title: string;
        content: string[];
    }[];
}