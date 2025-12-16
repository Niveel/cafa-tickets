import { EventCategory, CurrentUser } from "@/types/general.types";

export const eventCategories: EventCategory[] = [
    {
        "id": 1,
        "name": "Music",
        "slug": "music",
        "description": "Musical events and concerts",
        "icon": "FaMusic",
        "event_count": 45
    },
    {
        "id": 2,
        "name": "Sports",
        "slug": "sports",
        "description": "Sports matches and tournaments",
        "icon": "FaFootballBall",
        "event_count": 23
    },
    {
        "id": 3,
        "name": "Arts & Culture",
        "slug": "arts-culture",
        "description": "Art exhibitions, galleries, and cultural events",
        "icon": "FaPaintBrush",
        "event_count": 12
    },
    {
        "id": 4,
        "name": "Business & Networking",
        "slug": "business-networking",
        "description": "Professional networking events and conferences",
        "icon": "FaBriefcase",
        "event_count": 18
    },
    {
        "id": 5,
        "name": "Food & Drink",
        "slug": "food-drink",
        "description": "Food festivals, wine tastings, and culinary events",
        "icon": "FaUtensils",
        "event_count": 9
    },
    {
        "id": 6,
        "name": "Comedy",
        "slug": "comedy",
        "description": "Stand-up comedy shows and comedy nights",
        "icon": "FaLaugh",
        "event_count": 7
    },
    {
        "id": 7,
        "name": "Education & Training",
        "slug": "education-training",
        "description": "Workshops, seminars, and training sessions",
        "icon": "FaGraduationCap",
        "event_count": 14
    },
    {
        "id": 8,
        "name": "Other",
        "slug": "other",
        "description": "Other events and activities",
        "icon": "FaCalendarAlt",
        "event_count": 5
    }
]

export const currentUser: CurrentUser = {
    "id": 1,
    "username": "johndoe123",
    "email": "john.doe@example.com",
    "full_name": "John Doe",
    "phone_number": "+233241234567",
    "profile_image": "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1101",
    "bio": "Event enthusiast from Accra",
    "city": "Accra",
    "country": "Ghana",
    "is_email_verified": true,
    "date_joined": "2025-06-01T10:30:00Z",
    "last_login": "2025-06-15T14:20:00Z",
    "settings": {
        "marketing_emails": true,
        "event_reminders": true,
        "email_notifications": true,
        "sms_notifications": false
    },
    "stats": {
        "total_tickets_purchased": 12,
        "events_organized": 0,
        "total_spent": 2500.00,
        "total_events_attended": 10,
        "account_age_days": 45
    }
}
