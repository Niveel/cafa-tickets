import { UserStats } from "../types/dashboard.types";

export const userStats: UserStats = {
    "user_id": 1,
    "username": "johndoe123",
    "overview": {
        "tickets_purchased": 12,
        "events_organized": 4,
        "events_attended": 8,
        "total_spent": "2500.00",
        "total_revenue": "15000.00",
        "account_age_days": 180
    },
    "purchasing_stats": {
        "active_tickets": 5,
        "used_tickets": 7,
        "total_spent": "2500.00",
        "tickets_by_category": [
            {
                "category": "Music",
                "count": 7,
                "total_spent": "1400.00"
            },
            {
                "category": "Sports",
                "count": 3,
                "total_spent": "750.00"
            },
            {
                "category": "Arts",
                "count": 2,
                "total_spent": "350.00"
            }
        ],
        "upcoming_events": 5,
        "past_events": 7
    },
    "organizing_stats": {
        "total_events_created": 4,
        "active_events": 2,
        "past_events": 2,
        "total_tickets_sold": 450,
        "total_revenue": "15000.00",
        "total_attendees": 450,
        "average_tickets_per_event": 112.5,
        "best_selling_event": {
            "id": 1,
            "title": "Afrobeats Night",
            "tickets_sold": 200
        },
        "revenue_by_month": [
            {
                "month": "2025-06",
                "revenue": "8000.00",
                "tickets_sold": 200
            },
            {
                "month": "2025-05",
                "revenue": "7000.00",
                "tickets_sold": 250
            }
        ]
    },
    "recent_activity": [
        {
            "type": "ticket_purchase",
            "event_title": "Jazz Night",
            "date": "2025-06-15T14:30:00Z",
            "amount": "75.00"
        },
        {
            "type": "event_created",
            "event_title": "Rock Concert",
            "date": "2025-06-10T10:00:00Z"
        },
        {
            "type": "ticket_sale",
            "event_title": "Afrobeats Night",
            "date": "2025-06-14T16:20:00Z",
            "amount": "50.00"
        }
    ]
}