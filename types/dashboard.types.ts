export interface UserStats {
    user_id: number;
    username: string;
    overview: UserOverviewStats;
    purchasing_stats: UserPurchasingStats;
    organizing_stats: UserOrganizingStats;
    recent_activity: RecentActivity[];
}

/* -------------------- OVERVIEW -------------------- */

export interface UserOverviewStats {
    tickets_purchased: number;
    events_organized: number;
    events_attended: number;
    total_spent: string;         // keeping as string since you're using currency as string
    total_revenue: string;
    account_age_days: number;
    account_age_display: string; // optional formatted string like "6 months"
}

/* -------------------- PURCHASING STATS -------------------- */

export interface CategoryPurchaseBreakdown {
    category: string;
    count: number;
    total_spent: string;
}

export interface UserPurchasingStats {
    active_tickets: number;
    used_tickets: number;
    total_spent: string;
    tickets_by_category: CategoryPurchaseBreakdown[];
    upcoming_events: number;
    past_events: number;
}

/* -------------------- ORGANIZING STATS -------------------- */

export interface BestSellingEvent {
    id: number;
    title: string;
    tickets_sold: number;
}

export interface RevenueByMonth {
    month: string;           // "YYYY-MM"
    revenue: string;
    tickets_sold: number;
}

export interface UserOrganizingStats {
    total_events_created: number;
    active_events: number;
    past_events: number;
    total_tickets_sold: number;
    total_revenue: string;
    total_attendees: number;
    average_tickets_per_event: number;
    best_selling_event: BestSellingEvent;
    revenue_by_month: RevenueByMonth[];
}

/* -------------------- RECENT ACTIVITY -------------------- */

export type ActivityType = 
    | "ticket_purchase"
    | "ticket_sale"
    | "event_created";

export interface RecentActivity {
    type: ActivityType;
    event_title: string;
    date: string;               // ISO string
    amount?: string;            // only exists for purchase/sale
}
