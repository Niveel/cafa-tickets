import { PaymentHistory, PaymentDetails, RevenueSummary, PaymentProfile } from "@/types/payments.types"

export const paymentsData: PaymentHistory = {
    "count": 8,
    "next": null,
    "previous": null,
    "summary": {
        "total_spent": "2500.00",
        "total_transactions": 8,
        "completed_transactions": 7,
        "pending_transactions": 1
    },
    "results": [
        {
            "payment_id": "PAY-123456",
            "reference": "PSK-XYZ123",
            "amount": "105.00",
            "currency": "GHS",
            "payment_method": "card",
            "provider": "paystack",
            "status": "completed",
            "created_at": "2025-06-01T10:35:00Z",
            "completed_at": "2025-06-01T10:40:00Z",
            "event": {
                "id": 1,
                "title": "Afrobeats Night",
                "slug": "afrobeats-night",
                "featured_image": "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "start_date": "2025-07-15"
            },
            "tickets": [
                { "ticket_id": "TKT-UUID-001", "ticket_type": "Regular", "price": "50.00" },
                { "ticket_id": "TKT-UUID-002", "ticket_type": "Regular", "price": "50.00" }
            ],
            "fees": { "service_fee": "5.00", "total_paid": "105.00" }
        },
        {
            "payment_id": "PAY-123457",
            "reference": "PSK-ABC789",
            "amount": "150.00",
            "currency": "GHS",
            "payment_method": "mobile_money",
            "provider": "paystack",
            "status": "completed",
            "created_at": "2025-06-03T14:20:00Z",
            "completed_at": "2025-06-03T14:25:00Z",
            "event": {
                "id": 2,
                "title": "Jazz Night",
                "slug": "jazz-night",
                "featured_image": "https://images.unsplash.com/photo-1643759543584-fb6f448d42d4?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "start_date": "2025-07-20"
            },
            "tickets": [
                { "ticket_id": "TKT-UUID-003", "ticket_type": "VIP", "price": "150.00" }
            ],
            "fees": { "service_fee": "0.00", "total_paid": "150.00" }
        },

        {
            "payment_id": "PAY-123458",
            "reference": "PSK-DEF456",
            "amount": "75.00",
            "currency": "GHS",
            "payment_method": "card",
            "provider": "paystack",
            "status": "completed",
            "created_at": "2025-06-05T09:10:00Z",
            "completed_at": "2025-06-05T09:12:00Z",
            "event": {
                "id": 3,
                "title": "Comedy Friday",
                "slug": "comedy-friday",
                "featured_image": "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "start_date": "2025-07-10"
            },
            "tickets": [
                { "ticket_id": "TKT-UUID-004", "ticket_type": "Regular", "price": "75.00" }
            ],
            "fees": { "service_fee": "0.00", "total_paid": "75.00" }
        },

        {
            "payment_id": "PAY-123459",
            "reference": "PSK-GHI999",
            "amount": "220.00",
            "currency": "GHS",
            "payment_method": "card",
            "provider": "paystack",
            "status": "completed",
            "created_at": "2025-06-06T16:30:00Z",
            "completed_at": "2025-06-06T16:35:00Z",
            "event": {
                "id": 4,
                "title": "Reggae Beach Party",
                "slug": "reggae-beach-party",
                "featured_image": "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "start_date": "2025-08-05"
            },
            "tickets": [
                { "ticket_id": "TKT-UUID-005", "ticket_type": "VIP", "price": "220.00" }
            ],
            "fees": { "service_fee": "0.00", "total_paid": "220.00" }
        },

        {
            "payment_id": "PAY-123460",
            "reference": "PSK-JKL321",
            "amount": "40.00",
            "currency": "GHS",
            "payment_method": "mobile_money",
            "provider": "mtn_momo",
            "status": "completed",
            "created_at": "2025-06-08T11:00:00Z",
            "completed_at": "2025-06-08T11:02:00Z",
            "event": {
                "id": 5,
                "title": "Poetry Lounge",
                "slug": "poetry-lounge",
                "featured_image": "https://images.unsplash.com/photo-1516600164266-f3b8166ae679?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "start_date": "2025-07-25"
            },
            "tickets": [
                { "ticket_id": "TKT-UUID-006", "ticket_type": "Regular", "price": "40.00" }
            ],
            "fees": { "service_fee": "0.00", "total_paid": "40.00" }
        },

        {
            "payment_id": "PAY-123461",
            "reference": "PSK-MNO555",
            "amount": "300.00",
            "currency": "GHS",
            "payment_method": "card",
            "provider": "paystack",
            "status": "completed",
            "created_at": "2025-06-09T18:40:00Z",
            "completed_at": "2025-06-09T18:45:00Z",
            "event": {
                "id": 6,
                "title": "Champions League Watch Party",
                "slug": "ucl-watch-party",
                "featured_image": "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "start_date": "2025-06-12"
            },
            "tickets": [
                { "ticket_id": "TKT-UUID-007", "ticket_type": "VIP", "price": "300.00" }
            ],
            "fees": { "service_fee": "0.00", "total_paid": "300.00" }
        },

        {
            "payment_id": "PAY-123462",
            "reference": "PSK-PEN111",
            "amount": "60.00",
            "currency": "GHS",
            "payment_method": "mobile_money",
            "provider": "vodafone_cash",
            "status": "pending",
            "created_at": "2025-06-10T13:55:00Z",
            "completed_at": null,
            "event": {
                "id": 7,
                "title": "Dance Workshop",
                "slug": "dance-workshop",
                "featured_image": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "start_date": "2025-07-30"
            },
            "tickets": [
                { "ticket_id": "TKT-UUID-008", "ticket_type": "Workshop Pass", "price": "60.00" }
            ],
            "fees": { "service_fee": "0.00", "total_paid": "60.00" }
        }
    ]
}

export const paymentDetails: PaymentDetails = {
    "payment_id": "PAY-123456",
    "reference": "PSK-XYZ123",
    "amount": "105.00",
    "currency": "GHS",
    "payment_method": "card",
    "card_details": {
        "brand": "Visa",
        "last4": "4242",
        "exp_month": "12",
        "exp_year": "2025"
    },
    "provider": "paystack",
    "status": "completed",
    "created_at": "2025-06-01T10:35:00Z",
    "completed_at": "2025-06-01T10:40:00Z",
    "event": {
        "id": 1,
        "title": "Afrobeats Night",
        "slug": "afrobeats-night",
        "featured_image": "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "organizer": {
            "id": 5,
            "username": "eventmaster",
            "full_name": "Event Master"
        },
        "venue_name": "National Theatre",
        "start_date": "2025-07-15",
        "start_time": "20:00:00"
    },
    "tickets": [
        {
            "ticket_id": "TKT-UUID-001",
            "qr_code": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "ticket_type": {
                "id": 1,
                "name": "Regular",
                "price": "50.00"
            },
            "attendee_name": "John Doe",
            "status": "active"
        },
        {
            "ticket_id": "TKT-UUID-002",
            "qr_code": "https://images.unsplash.com/photo-1626682561113-d1db402cc866?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "ticket_type": {
                "id": 1,
                "name": "Regular",
                "price": "50.00"
            },
            "attendee_name": "Jane Doe",
            "status": "active"
        }
    ],
    "breakdown": {
        "subtotal": "100.00",
        "service_fee": "5.00",
        "total": "105.00"
    },
    "billing_info": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+233241234567"
    }
}

export const revenueSummary: RevenueSummary = {
    "period": "all_time",
    "summary": {
        "gross_revenue": "45000.00",
        "platform_fees": "2250.00",
        "net_revenue": "42750.00",
        "total_tickets_sold": 850,
        "total_events": 5,
        "average_ticket_price": "52.94"
    },
    "payout_status": {
        "available_balance": "12000.00",
        "pending_balance": "8000.00",
        "total_paid_out": "22750.00",
        "next_payout_date": "2025-06-15"
    },
    "revenue_by_event": [
        {
            "event_id": 1,
            "event_title": "Afrobeats Night",
            "gross_revenue": "10500.00",
            "net_revenue": "9975.00",
            "platform_fee": "525.00",
            "tickets_sold": 150
        },
        {
            "event_id": 2,
            "event_title": "Jazz Night",
            "gross_revenue": "15000.00",
            "net_revenue": "14250.00",
            "platform_fee": "750.00",
            "tickets_sold": 200
        }
    ],
    "revenue_by_month": [
        {
            "month": "2025-06",
            "gross_revenue": "18000.00",
            "net_revenue": "17100.00",
            "platform_fee": "900.00",
            "tickets_sold": 320
        },
        {
            "month": "2025-05",
            "gross_revenue": "27000.00",
            "net_revenue": "25650.00",
            "platform_fee": "1350.00",
            "tickets_sold": 530
        }
    ],
    "recent_transactions": [
        {
            "date": "2025-06-14T16:20:00Z",
            "event_title": "Afrobeats Night",
            "ticket_type": "Regular",
            "amount": "50.00",
            "platform_fee": "2.50",
            "net_amount": "47.50"
        }
    ]
}

export const paymentProfiles: PaymentProfile[] = [
    {
        "id": "PP-UUID-001",
        "method": "mobile_money",
        "name": "My MTN Mobile Money",
        "description": "Primary account for receiving event payments",
        "account_details": {
            "mobile_number": "+233***4567",
            "network": "MTN",
            "account_name": "John Doe"
        },
        "fee_percentage": 1.5,
        "status": "verified",
        "is_verified": true,
        "verified_at": "2025-06-01T10:02:15Z",
        "is_default": true,
        "created_at": "2025-06-01T10:00:00Z"
    },
    {
        "id": "PP-UUID-002",
        "method": "bank_transfer",
        "name": "Cal Bank Account",
        "description": "Secondary bank account",
        "account_details": {
            "account_number": "******7890",
            "account_name": "John Doe",
            "bank_name": "CAL Bank",
            "bank_code": "CAL"
        },
        "fee_percentage": 2.0,
        "status": "verified",
        "is_verified": true,
        "verified_at": "2025-05-15T14:25:30Z",
        "is_default": false,
        "created_at": "2025-05-15T14:20:00Z"
    }
]