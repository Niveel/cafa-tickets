// =====================
// Common Types
// =====================

export type EventStatus = "upcoming" | "ongoing" | "past";

export type TicketStatus = "active" | "expired" | "sold_out";

// =====================
// Category
// =====================

export interface EventCategory {
    id: number;
    name: string;
    slug: string;
}

// =====================
// Ticket Type Analytics
// =====================

export interface EventTicketTypeAnalytics {
    id: number;
    name: string;
    price: string;
    quantity: number;
    tickets_sold: number;
    tickets_remaining: number;
    revenue: string;
    sales_percentage: number;

    available_from?: string;
    available_until?: string;
    status?: TicketStatus;
}

// =====================
// Event Analytics
// =====================

export interface EventAnalytics {
    total_tickets: number;
    tickets_sold: number;
    tickets_remaining: number;
    tickets_checked_in: number;
    sales_percentage: number;
    gross_revenue: string;
    net_revenue: string;
    platform_fee: string;
    page_views: number;
    unique_visitors: number;
    conversion_rate: number;
    last_sale_date: string | null;
}

// =====================
// Event (My Events List)
// =====================

export interface MyEvent {
    id: number;
    title: string;
    slug: string;
    featured_image: string;

    category: EventCategory;

    venue_name: string;
    venue_city: string;

    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;

    status: EventStatus;
    is_published: boolean;
    is_recurring: boolean;

    created_at: string;
    updated_at: string;

    analytics: EventAnalytics;
    ticket_types: EventTicketTypeAnalytics[];
}

// =====================
// Summary
// =====================

export interface MyEventsSummary {
    total_events: number;
    upcoming_events: number;
    ongoing_events: number;
    past_events: number;
    total_revenue: string;
    total_tickets_sold: number;
}

// =====================
// Response
// =====================

export interface MyEventsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    summary: MyEventsSummary;
    results: MyEvent[];
}

// =====================
// Overview
// =====================

export interface EventAnalyticsOverview {
    total_tickets: number;
    tickets_sold: number;
    tickets_remaining: number;
    tickets_checked_in: number;
    sales_percentage: number;
    check_in_percentage: number;

    gross_revenue: string;
    net_revenue: string;
    platform_fee: string;
    platform_fee_percentage: number;

    average_ticket_price: string;
    projected_revenue: string;
}

// =====================
// Sales by Ticket Type
// =====================

export interface SalesByTicketType {
    ticket_type_id: number;
    ticket_type: string;
    price: string;

    tickets_sold: number;
    total_quantity: number;

    revenue: string;
    percentage_of_total_sales: number;
    percentage_of_quantity_sold: number;
}

// =====================
// Sales Timeline
// =====================

export interface SalesTimelineEntry {
    date: string;
    tickets_sold: number;
    revenue: string;

    cumulative_tickets: number;
    cumulative_revenue: string;
}

// =====================
// Sales by Hour
// =====================

export interface SalesByHour {
    hour: string;
    tickets_sold: number;
    revenue: string;
}

// =====================
// Traffic
// =====================

export interface EventTrafficAnalytics {
    page_views: number;
    unique_visitors: number;
    conversion_rate: number;
}

// =====================
// Recent Sales
// =====================

export interface RecentTicketSale {
    ticket_id: string;
    ticket_type: string;
    amount: string;
    buyer_name: string;
    purchase_date: string;
}

// =====================
// Final Event Analytics
// =====================

export interface MyEventAnalytics {
    event_id: number;
    event_title: string;
    event_status: EventStatus;

    overview: EventAnalyticsOverview;

    sales_by_ticket_type: SalesByTicketType[];
    sales_timeline: SalesTimelineEntry[];
    sales_by_hour: SalesByHour[];

    traffic: EventTrafficAnalytics;

    recent_sales: RecentTicketSale[];
}

// =====================
// Common
// =====================

export type PaymentStatus = "paid" | "pending" | "failed";

// =====================
// Ticket Type
// =====================

export interface AttendeeTicketType {
    id: number;
    name: string;
    price: string;
}

// =====================
// Attendee
// =====================

export interface EventAttendee {
    ticket_id: string;

    attendee_name: string;
    attendee_email: string;
    attendee_phone: string;

    ticket_type: AttendeeTicketType;

    purchase_date: string;

    payment_status: PaymentStatus;
    payment_reference: string;
    amount_paid: string;

    is_checked_in: boolean;
    checked_in_at: string | null;
    checked_in_by: string | null;
}

// =====================
// Summary
// =====================

export interface EventAttendeesSummary {
    total_attendees: number;
    checked_in: number;
    not_checked_in: number;
    check_in_percentage: number;
}

// =====================
// Response
// =====================

export interface EventAttendees {
    count: number;
    next: string | null;
    previous: string | null;
    summary: EventAttendeesSummary;
    results: EventAttendee[];
}

// =====================
// Event (Attended)
// =====================

export interface AttendedEventInfo {
    id: number;
    title: string;
    slug: string;
    featured_image: string;
    category: string;
    venue_name: string;
    event_date: string;
}

// =====================
// Attended Event Item
// =====================

export interface AttendedEvent {
    event: AttendedEventInfo;

    ticket_id: string;
    ticket_type: string;
    attended_date: string;
    amount_paid: string;
}

// =====================
// Response
// =====================

export interface AttendedEventsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: AttendedEvent[];
}
