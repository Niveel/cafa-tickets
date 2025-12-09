import { MyTicketsResponse, TicketDetails } from "@/types/tickets.types"

export const myTickets: MyTicketsResponse = {
    "count": 12,
    "next": "/api/v1/tickets/my-tickets/?page=2",
    "previous": null,
    "results": [
        {
            "ticket_id": "TKT-UUID-001",
            "qr_code": "/media/qr_codes/TKT-UUID-001.png",
            "event": {
                "id": 1,
                "title": "Afrobeats Night",
                "slug": "afrobeats-night",
                "featured_image": "/media/events/afrobeats.jpg",
                "category": {
                    "id": 1,
                    "name": "Music"
                },
                "venue_name": "National Theatre",
                "venue_city": "Accra",
                "start_date": "2025-07-15",
                "start_time": "20:00:00",
                "status": "upcoming"
            },
            "ticket_type": {
                "id": 1,
                "name": "Regular",
                "price": "50.00"
            },
            "attendee_info": {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "+233241234567"
            },
            "purchase_date": "2025-06-01T10:40:00Z",
            "payment_reference": "PSK-XYZ123",
            "amount_paid": "50.00",
            "status": "active",
            "is_checked_in": false,
            "checked_in_at": null,
        }
    ]
}

export const ticketDetails: TicketDetails = {
    "ticket_id": "TKT-UUID-001",
    "qr_code": "https://images.unsplash.com/photo-1608226929629-b11e58cbd36b?q=80&w=1043&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "event": {
        "id": 1,
        "title": "Afrobeats Night",
        "slug": "afrobeats-night",
        "featured_image": "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "The biggest Afrobeats party in Accra",
        "category": {
            "id": 1,
            "name": "Music"
        },
        "venue_name": "National Theatre",
        "venue_address": "Liberation Road",
        "venue_city": "Accra",
        "venue_country": "Ghana",
        "venue_location": {
            "latitude": "5.5600",
            "longitude": "-0.2057"
        },
        "start_date": "2025-07-15",
        "start_time": "20:00:00",
        "end_date": "2025-07-15",
        "end_time": "02:00:00",
        "organizer": {
            "id": 5,
            "username": "eventmaster",
            "full_name": "Event Master",
            "profile_image": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    "ticket_type": {
        "id": 1,
        "name": "Regular",
        "description": "Standard admission",
        "price": "50.00"
    },
    "attendee_info": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+233241234567"
    },
    "purchase_info": {
        "purchase_date": "2025-06-01T10:40:00Z",
        "payment_reference": "PSK-XYZ123",
        "payment_method": "card",
        "amount_paid": "50.00",
        "currency": "GHS",
        "payment_status": "completed"
    },
    "status": "active",
    "is_checked_in": false,
    "checked_in_at": null,
}