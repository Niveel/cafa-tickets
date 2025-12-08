import { MyEventsResponse, MyEventAnalytics, EventAttendees, AttendedEventsResponse, MyEventDetailsResponse } from "@/types/dash-events.types"

export const myEvents: MyEventsResponse = {
    "count": 25,
    "next": null,
    "previous": null,
    "summary": {
        "total_events": 25,
        "upcoming_events": 12,
        "ongoing_events": 2,
        "past_events": 11,
        "total_revenue": "485000.00",
        "total_tickets_sold": 8750
    },
    "results": [
        {
            "id": 1,
            "title": "Afrobeats Night",
            "slug": "afrobeats-night",
            "featured_image": "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "category": {
                "id": 1,
                "name": "Music",
                "slug": "music"
            },
            "venue_name": "National Theatre",
            "venue_city": "Accra",
            "start_date": "2025-07-15",
            "start_time": "20:00:00",
            "end_date": "2025-07-15",
            "end_time": "02:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-06-01T10:00:00Z",
            "updated_at": "2025-06-05T14:30:00Z",
            "analytics": {
                "total_tickets": 500,
                "tickets_sold": 150,
                "tickets_remaining": 350,
                "tickets_checked_in": 0,
                "sales_percentage": 30.0,
                "gross_revenue": "10500.00",
                "net_revenue": "9975.00",
                "platform_fee": "525.00",
                "page_views": 1250,
                "unique_visitors": 890,
                "conversion_rate": 16.85,
                "last_sale_date": "2025-06-14T16:20:00Z"
            },
            "ticket_types": [
                {
                    "id": 1,
                    "name": "Regular",
                    "price": "50.00",
                    "quantity": 300,
                    "tickets_sold": 100,
                    "tickets_remaining": 200,
                    "revenue": "5000.00",
                    "sales_percentage": 33.33
                },
                {
                    "id": 2,
                    "name": "VIP",
                    "price": "150.00",
                    "quantity": 100,
                    "tickets_sold": 50,
                    "tickets_remaining": 50,
                    "revenue": "7500.00",
                    "sales_percentage": 50.0
                },
                {
                    "id": 3,
                    "name": "Early Bird",
                    "price": "35.00",
                    "quantity": 100,
                    "tickets_sold": 0,
                    "tickets_remaining": 100,
                    "revenue": "0.00",
                    "sales_percentage": 0.0,
                    "available_from": "2025-06-01T00:00:00Z",
                    "available_until": "2025-06-15T23:59:59Z",
                    "status": "expired"
                }
            ]
        },
        {
            "id": 2,
            "title": "Tech Startup Conference 2025",
            "slug": "tech-startup-conference-2025",
            "featured_image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 2,
                "name": "Conference",
                "slug": "conference"
            },
            "venue_name": "Accra International Conference Centre",
            "venue_city": "Accra",
            "start_date": "2025-12-10",
            "start_time": "09:00:00",
            "end_date": "2025-12-12",
            "end_time": "18:00:00",
            "status": "ongoing",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-09-01T08:00:00Z",
            "updated_at": "2025-12-08T10:00:00Z",
            "analytics": {
                "total_tickets": 800,
                "tickets_sold": 750,
                "tickets_remaining": 50,
                "tickets_checked_in": 612,
                "sales_percentage": 93.75,
                "gross_revenue": "45000.00",
                "net_revenue": "42750.00",
                "platform_fee": "2250.00",
                "page_views": 5420,
                "unique_visitors": 3200,
                "conversion_rate": 23.44,
                "last_sale_date": "2025-12-09T22:15:00Z"
            },
            "ticket_types": [
                {
                    "id": 4,
                    "name": "Early Bird",
                    "price": "40.00",
                    "quantity": 200,
                    "tickets_sold": 200,
                    "tickets_remaining": 0,
                    "revenue": "8000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                },
                {
                    "id": 5,
                    "name": "Standard",
                    "price": "60.00",
                    "quantity": 500,
                    "tickets_sold": 450,
                    "tickets_remaining": 50,
                    "revenue": "27000.00",
                    "sales_percentage": 90.0
                },
                {
                    "id": 6,
                    "name": "VIP Pass",
                    "price": "100.00",
                    "quantity": 100,
                    "tickets_sold": 100,
                    "tickets_remaining": 0,
                    "revenue": "10000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 3,
            "title": "Gospel Praise Night",
            "slug": "gospel-praise-night",
            "featured_image": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 1,
                "name": "Music",
                "slug": "music"
            },
            "venue_name": "Independence Square",
            "venue_city": "Accra",
            "start_date": "2025-11-20",
            "start_time": "18:00:00",
            "end_date": "2025-11-20",
            "end_time": "23:00:00",
            "status": "past",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-10-01T12:00:00Z",
            "updated_at": "2025-11-21T09:00:00Z",
            "analytics": {
                "total_tickets": 1000,
                "tickets_sold": 980,
                "tickets_remaining": 0,
                "tickets_checked_in": 945,
                "sales_percentage": 98.0,
                "gross_revenue": "19600.00",
                "net_revenue": "18620.00",
                "platform_fee": "980.00",
                "page_views": 3850,
                "unique_visitors": 2100,
                "conversion_rate": 46.67,
                "last_sale_date": "2025-11-20T17:30:00Z"
            },
            "ticket_types": [
                {
                    "id": 7,
                    "name": "General Admission",
                    "price": "20.00",
                    "quantity": 1000,
                    "tickets_sold": 980,
                    "tickets_remaining": 0,
                    "revenue": "19600.00",
                    "sales_percentage": 98.0,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 4,
            "title": "Stand-Up Comedy Show: Laugh Riot",
            "slug": "stand-up-comedy-show-laugh-riot",
            "featured_image": "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 3,
                "name": "Comedy",
                "slug": "comedy"
            },
            "venue_name": "Alliance Française",
            "venue_city": "Accra",
            "start_date": "2025-12-20",
            "start_time": "19:30:00",
            "end_date": "2025-12-20",
            "end_time": "22:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-05T14:00:00Z",
            "updated_at": "2025-12-06T11:00:00Z",
            "analytics": {
                "total_tickets": 300,
                "tickets_sold": 215,
                "tickets_remaining": 85,
                "tickets_checked_in": 0,
                "sales_percentage": 71.67,
                "gross_revenue": "10750.00",
                "net_revenue": "10212.50",
                "platform_fee": "537.50",
                "page_views": 980,
                "unique_visitors": 650,
                "conversion_rate": 33.08,
                "last_sale_date": "2025-12-07T20:45:00Z"
            },
            "ticket_types": [
                {
                    "id": 8,
                    "name": "Regular",
                    "price": "40.00",
                    "quantity": 200,
                    "tickets_sold": 150,
                    "tickets_remaining": 50,
                    "revenue": "6000.00",
                    "sales_percentage": 75.0
                },
                {
                    "id": 9,
                    "name": "Premium",
                    "price": "80.00",
                    "quantity": 100,
                    "tickets_sold": 65,
                    "tickets_remaining": 35,
                    "revenue": "5200.00",
                    "sales_percentage": 65.0
                }
            ]
        },
        {
            "id": 5,
            "title": "Christmas Food Festival",
            "slug": "christmas-food-festival",
            "featured_image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 4,
                "name": "Food & Drink",
                "slug": "food-drink"
            },
            "venue_name": "Labadi Beach",
            "venue_city": "Accra",
            "start_date": "2025-12-24",
            "start_time": "10:00:00",
            "end_date": "2025-12-26",
            "end_time": "22:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-10-15T09:00:00Z",
            "updated_at": "2025-12-01T15:00:00Z",
            "analytics": {
                "total_tickets": 2000,
                "tickets_sold": 1450,
                "tickets_remaining": 550,
                "tickets_checked_in": 0,
                "sales_percentage": 72.5,
                "gross_revenue": "36250.00",
                "net_revenue": "34437.50",
                "platform_fee": "1812.50",
                "page_views": 8900,
                "unique_visitors": 5200,
                "conversion_rate": 27.88,
                "last_sale_date": "2025-12-08T18:30:00Z"
            },
            "ticket_types": [
                {
                    "id": 10,
                    "name": "Single Day Pass",
                    "price": "25.00",
                    "quantity": 1500,
                    "tickets_sold": 1200,
                    "tickets_remaining": 300,
                    "revenue": "30000.00",
                    "sales_percentage": 80.0
                },
                {
                    "id": 11,
                    "name": "3-Day Pass",
                    "price": "50.00",
                    "quantity": 500,
                    "tickets_sold": 250,
                    "tickets_remaining": 250,
                    "revenue": "12500.00",
                    "sales_percentage": 50.0
                }
            ]
        },
        {
            "id": 6,
            "title": "Yoga & Wellness Retreat",
            "slug": "yoga-wellness-retreat",
            "featured_image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 5,
                "name": "Sports & Fitness",
                "slug": "sports-fitness"
            },
            "venue_name": "Eco Resort",
            "venue_city": "Cape Coast",
            "start_date": "2026-01-15",
            "start_time": "08:00:00",
            "end_date": "2026-01-17",
            "end_time": "16:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-20T10:00:00Z",
            "updated_at": "2025-12-05T12:00:00Z",
            "analytics": {
                "total_tickets": 50,
                "tickets_sold": 32,
                "tickets_remaining": 18,
                "tickets_checked_in": 0,
                "sales_percentage": 64.0,
                "gross_revenue": "9600.00",
                "net_revenue": "9120.00",
                "platform_fee": "480.00",
                "page_views": 420,
                "unique_visitors": 285,
                "conversion_rate": 11.23,
                "last_sale_date": "2025-12-07T14:20:00Z"
            },
            "ticket_types": [
                {
                    "id": 12,
                    "name": "Full Package",
                    "price": "300.00",
                    "quantity": 50,
                    "tickets_sold": 32,
                    "tickets_remaining": 18,
                    "revenue": "9600.00",
                    "sales_percentage": 64.0
                }
            ]
        },
        {
            "id": 7,
            "title": "Art Exhibition: African Heritage",
            "slug": "art-exhibition-african-heritage",
            "featured_image": "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 6,
                "name": "Art & Culture",
                "slug": "art-culture"
            },
            "venue_name": "Nubuke Foundation",
            "venue_city": "Accra",
            "start_date": "2025-12-09",
            "start_time": "10:00:00",
            "end_date": "2025-12-15",
            "end_time": "18:00:00",
            "status": "ongoing",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-01T11:00:00Z",
            "updated_at": "2025-12-08T09:00:00Z",
            "analytics": {
                "total_tickets": 400,
                "tickets_sold": 285,
                "tickets_remaining": 115,
                "tickets_checked_in": 198,
                "sales_percentage": 71.25,
                "gross_revenue": "5700.00",
                "net_revenue": "5415.00",
                "platform_fee": "285.00",
                "page_views": 1560,
                "unique_visitors": 980,
                "conversion_rate": 29.08,
                "last_sale_date": "2025-12-08T16:40:00Z"
            },
            "ticket_types": [
                {
                    "id": 13,
                    "name": "Day Pass",
                    "price": "20.00",
                    "quantity": 400,
                    "tickets_sold": 285,
                    "tickets_remaining": 115,
                    "revenue": "5700.00",
                    "sales_percentage": 71.25
                }
            ]
        },
        {
            "id": 8,
            "title": "Business Networking Mixer",
            "slug": "business-networking-mixer",
            "featured_image": "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 7,
                "name": "Business",
                "slug": "business"
            },
            "venue_name": "Kempinski Hotel",
            "venue_city": "Accra",
            "start_date": "2025-11-28",
            "start_time": "18:00:00",
            "end_date": "2025-11-28",
            "end_time": "21:00:00",
            "status": "past",
            "is_published": true,
            "is_recurring": true,
            "created_at": "2025-10-20T13:00:00Z",
            "updated_at": "2025-11-29T08:00:00Z",
            "analytics": {
                "total_tickets": 150,
                "tickets_sold": 150,
                "tickets_remaining": 0,
                "tickets_checked_in": 142,
                "sales_percentage": 100.0,
                "gross_revenue": "12000.00",
                "net_revenue": "11400.00",
                "platform_fee": "600.00",
                "page_views": 890,
                "unique_visitors": 520,
                "conversion_rate": 28.85,
                "last_sale_date": "2025-11-28T17:15:00Z"
            },
            "ticket_types": [
                {
                    "id": 14,
                    "name": "Professional Pass",
                    "price": "80.00",
                    "quantity": 150,
                    "tickets_sold": 150,
                    "tickets_remaining": 0,
                    "revenue": "12000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 9,
            "title": "Kids Funfair Extravaganza",
            "slug": "kids-funfair-extravaganza",
            "featured_image": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 8,
                "name": "Family & Kids",
                "slug": "family-kids"
            },
            "venue_name": "Legon Botanical Gardens",
            "venue_city": "Accra",
            "start_date": "2025-12-27",
            "start_time": "10:00:00",
            "end_date": "2025-12-27",
            "end_time": "18:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-10T10:00:00Z",
            "updated_at": "2025-12-02T14:00:00Z",
            "analytics": {
                "total_tickets": 600,
                "tickets_sold": 412,
                "tickets_remaining": 188,
                "tickets_checked_in": 0,
                "sales_percentage": 68.67,
                "gross_revenue": "8240.00",
                "net_revenue": "7828.00",
                "platform_fee": "412.00",
                "page_views": 2340,
                "unique_visitors": 1560,
                "conversion_rate": 26.41,
                "last_sale_date": "2025-12-08T10:30:00Z"
            },
            "ticket_types": [
                {
                    "id": 15,
                    "name": "Child Ticket",
                    "price": "15.00",
                    "quantity": 400,
                    "tickets_sold": 312,
                    "tickets_remaining": 88,
                    "revenue": "4680.00",
                    "sales_percentage": 78.0
                },
                {
                    "id": 16,
                    "name": "Adult Ticket",
                    "price": "25.00",
                    "quantity": 200,
                    "tickets_sold": 100,
                    "tickets_remaining": 100,
                    "revenue": "2500.00",
                    "sales_percentage": 50.0
                }
            ]
        },
        {
            "id": 10,
            "title": "Highlife Jazz Fusion Concert",
            "slug": "highlife-jazz-fusion-concert",
            "featured_image": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 1,
                "name": "Music",
                "slug": "music"
            },
            "venue_name": "+233 Jazz Bar & Grill",
            "venue_city": "Accra",
            "start_date": "2026-01-10",
            "start_time": "20:00:00",
            "end_date": "2026-01-10",
            "end_time": "23:30:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-25T12:00:00Z",
            "updated_at": "2025-12-05T16:00:00Z",
            "analytics": {
                "total_tickets": 200,
                "tickets_sold": 98,
                "tickets_remaining": 102,
                "tickets_checked_in": 0,
                "sales_percentage": 49.0,
                "gross_revenue": "5880.00",
                "net_revenue": "5586.00",
                "platform_fee": "294.00",
                "page_views": 560,
                "unique_visitors": 380,
                "conversion_rate": 25.79,
                "last_sale_date": "2025-12-07T19:15:00Z"
            },
            "ticket_types": [
                {
                    "id": 17,
                    "name": "Standard",
                    "price": "60.00",
                    "quantity": 200,
                    "tickets_sold": 98,
                    "tickets_remaining": 102,
                    "revenue": "5880.00",
                    "sales_percentage": 49.0
                }
            ]
        },
        {
            "id": 11,
            "title": "Marathon for Hope",
            "slug": "marathon-for-hope",
            "featured_image": "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 5,
                "name": "Sports & Fitness",
                "slug": "sports-fitness"
            },
            "venue_name": "Accra Sports Stadium",
            "venue_city": "Accra",
            "start_date": "2025-10-15",
            "start_time": "06:00:00",
            "end_date": "2025-10-15",
            "end_time": "12:00:00",
            "status": "past",
            "is_published": true,
            "is_recurring": true,
            "created_at": "2025-08-01T09:00:00Z",
            "updated_at": "2025-10-16T10:00:00Z",
            "analytics": {
                "total_tickets": 1500,
                "tickets_sold": 1500,
                "tickets_remaining": 0,
                "tickets_checked_in": 1465,
                "sales_percentage": 100.0,
                "gross_revenue": "45000.00",
                "net_revenue": "42750.00",
                "platform_fee": "2250.00",
                "page_views": 6780,
                "unique_visitors": 4200,
                "conversion_rate": 35.71,
                "last_sale_date": "2025-10-14T20:00:00Z"
            },
            "ticket_types": [
                {
                    "id": 18,
                    "name": "5K Run",
                    "price": "20.00",
                    "quantity": 800,
                    "tickets_sold": 800,
                    "tickets_remaining": 0,
                    "revenue": "16000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                },
                {
                    "id": 19,
                    "name": "10K Run",
                    "price": "30.00",
                    "quantity": 500,
                    "tickets_sold": 500,
                    "tickets_remaining": 0,
                    "revenue": "15000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                },
                {
                    "id": 20,
                    "name": "Half Marathon",
                    "price": "70.00",
                    "quantity": 200,
                    "tickets_sold": 200,
                    "tickets_remaining": 0,
                    "revenue": "14000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 12,
            "title": "Fashion Week Ghana 2025",
            "slug": "fashion-week-ghana-2025",
            "featured_image": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 9,
                "name": "Fashion",
                "slug": "fashion"
            },
            "venue_name": "Accra International Conference Centre",
            "venue_city": "Accra",
            "start_date": "2026-02-20",
            "start_time": "18:00:00",
            "end_date": "2026-02-22",
            "end_time": "23:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-15T11:00:00Z",
            "updated_at": "2025-12-01T13:00:00Z",
            "analytics": {
                "total_tickets": 600,
                "tickets_sold": 245,
                "tickets_remaining": 355,
                "tickets_checked_in": 0,
                "sales_percentage": 40.83,
                "gross_revenue": "24500.00",
                "net_revenue": "23275.00",
                "platform_fee": "1225.00",
                "page_views": 3200,
                "unique_visitors": 1890,
                "conversion_rate": 12.96,
                "last_sale_date": "2025-12-07T21:30:00Z"
            },
            "ticket_types": [
                {
                    "id": 21,
                    "name": "General Admission",
                    "price": "50.00",
                    "quantity": 300,
                    "tickets_sold": 150,
                    "tickets_remaining": 150,
                    "revenue": "7500.00",
                    "sales_percentage": 50.0
                },
                {
                    "id": 22,
                    "name": "VIP",
                    "price": "150.00",
                    "quantity": 200,
                    "tickets_sold": 75,
                    "tickets_remaining": 125,
                    "revenue": "11250.00",
                    "sales_percentage": 37.5
                },
                {
                    "id": 23,
                    "name": "VVIP Front Row",
                    "price": "300.00",
                    "quantity": 100,
                    "tickets_sold": 20,
                    "tickets_remaining": 80,
                    "revenue": "6000.00",
                    "sales_percentage": 20.0
                }
            ]
        },
        {
            "id": 13,
            "title": "Film Screening: Ghanaian Cinema Night",
            "slug": "film-screening-ghanaian-cinema-night",
            "featured_image": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 10,
                "name": "Film & Media",
                "slug": "film-media"
            },
            "venue_name": "Silverbird Cinemas",
            "venue_city": "Accra",
            "start_date": "2025-12-18",
            "start_time": "19:00:00",
            "end_date": "2025-12-18",
            "end_time": "22:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-12T14:00:00Z",
            "updated_at": "2025-12-03T10:00:00Z",
            "analytics": {
                "total_tickets": 250,
                "tickets_sold": 187,
                "tickets_remaining": 63,
                "tickets_checked_in": 0,
                "sales_percentage": 74.8,
                "gross_revenue": "3740.00",
                "net_revenue": "3553.00",
                "platform_fee": "187.00",
                "page_views": 780,
                "unique_visitors": 520,
                "conversion_rate": 35.96,
                "last_sale_date": "2025-12-08T15:20:00Z"
            },
            "ticket_types": [
                {
                    "id": 24,
                    "name": "Regular Seat",
                    "price": "20.00",
                    "quantity": 250,
                    "tickets_sold": 187,
                    "tickets_remaining": 63,
                    "revenue": "3740.00",
                    "sales_percentage": 74.8
                }
            ]
        },
        {
            "id": 14,
            "title": "Photography Workshop: Portrait Mastery",
            "slug": "photography-workshop-portrait-mastery",
            "featured_image": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 11,
                "name": "Workshop",
                "slug": "workshop"
            },
            "venue_name": "Creative Arts Studio",
            "venue_city": "Accra",
            "start_date": "2026-01-25",
            "start_time": "09:00:00",
            "end_date": "2026-01-25",
            "end_time": "17:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-12-01T10:00:00Z",
            "updated_at": "2025-12-06T11:30:00Z",
            "analytics": {
                "total_tickets": 30,
                "tickets_sold": 18,
                "tickets_remaining": 12,
                "tickets_checked_in": 0,
                "sales_percentage": 60.0,
                "gross_revenue": "3600.00",
                "net_revenue": "3420.00",
                "platform_fee": "180.00",
                "page_views": 320,
                "unique_visitors": 210,
                "conversion_rate": 8.57,
                "last_sale_date": "2025-12-07T12:45:00Z"
            },
            "ticket_types": [
                {
                    "id": 25,
                    "name": "Workshop Ticket",
                    "price": "200.00",
                    "quantity": 30,
                    "tickets_sold": 18,
                    "tickets_remaining": 12,
                    "revenue": "3600.00",
                    "sales_percentage": 60.0
                }
            ]
        },
        {
            "id": 15,
            "title": "New Year's Eve Countdown Party",
            "slug": "new-years-eve-countdown-party",
            "featured_image": "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 12,
                "name": "Party",
                "slug": "party"
            },
            "venue_name": "Villa Monticello",
            "venue_city": "Accra",
            "start_date": "2025-12-31",
            "start_time": "21:00:00",
            "end_date": "2026-01-01",
            "end_time": "04:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-10-01T09:00:00Z",
            "updated_at": "2025-12-07T17:00:00Z",
            "analytics": {
                "total_tickets": 400,
                "tickets_sold": 378,
                "tickets_remaining": 22,
                "tickets_checked_in": 0,
                "sales_percentage": 94.5,
                "gross_revenue": "37800.00",
                "net_revenue": "35910.00",
                "platform_fee": "1890.00",
                "page_views": 5620,
                "unique_visitors": 3450,
                "conversion_rate": 10.96,
                "last_sale_date": "2025-12-08T19:50:00Z"
            },
            "ticket_types": [
                {
                    "id": 26,
                    "name": "Early Bird",
                    "price": "80.00",
                    "quantity": 150,
                    "tickets_sold": 150,
                    "tickets_remaining": 0,
                    "revenue": "12000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out",
                    "available_from": "2025-10-01T00:00:00Z",
                    "available_until": "2025-11-30T23:59:59Z"
                },
                {
                    "id": 27,
                    "name": "Regular",
                    "price": "120.00",
                    "quantity": 200,
                    "tickets_sold": 178,
                    "tickets_remaining": 22,
                    "revenue": "21360.00",
                    "sales_percentage": 89.0
                },
                {
                    "id": 28,
                    "name": "VIP Tables (4 pax)",
                    "price": "600.00",
                    "quantity": 50,
                    "tickets_sold": 50,
                    "tickets_remaining": 0,
                    "revenue": "30000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 16,
            "title": "Literary Festival: Words & Wisdom",
            "slug": "literary-festival-words-wisdom",
            "featured_image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 13,
                "name": "Literature",
                "slug": "literature"
            },
            "venue_name": "British Council",
            "venue_city": "Accra",
            "start_date": "2025-09-20",
            "start_time": "10:00:00",
            "end_date": "2025-09-22",
            "end_time": "18:00:00",
            "status": "past",
            "is_published": true,
            "is_recurring": true,
            "created_at": "2025-07-10T11:00:00Z",
            "updated_at": "2025-09-23T09:00:00Z",
            "analytics": {
                "total_tickets": 300,
                "tickets_sold": 285,
                "tickets_remaining": 0,
                "tickets_checked_in": 267,
                "sales_percentage": 95.0,
                "gross_revenue": "8550.00",
                "net_revenue": "8122.50",
                "platform_fee": "427.50",
                "page_views": 1450,
                "unique_visitors": 920,
                "conversion_rate": 30.98,
                "last_sale_date": "2025-09-20T09:15:00Z"
            },
            "ticket_types": [
                {
                    "id": 29,
                    "name": "Day Pass",
                    "price": "30.00",
                    "quantity": 300,
                    "tickets_sold": 285,
                    "tickets_remaining": 0,
                    "revenue": "8550.00",
                    "sales_percentage": 95.0,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 17,
            "title": "Startup Pitch Competition",
            "slug": "startup-pitch-competition",
            "featured_image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 7,
                "name": "Business",
                "slug": "business"
            },
            "venue_name": "Impact Hub Accra",
            "venue_city": "Accra",
            "start_date": "2026-01-30",
            "start_time": "14:00:00",
            "end_date": "2026-01-30",
            "end_time": "19:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-28T10:00:00Z",
            "updated_at": "2025-12-05T15:00:00Z",
            "analytics": {
                "total_tickets": 200,
                "tickets_sold": 67,
                "tickets_remaining": 133,
                "tickets_checked_in": 0,
                "sales_percentage": 33.5,
                "gross_revenue": "2010.00",
                "net_revenue": "1909.50",
                "platform_fee": "100.50",
                "page_views": 890,
                "unique_visitors": 560,
                "conversion_rate": 11.96,
                "last_sale_date": "2025-12-06T18:30:00Z"
            },
            "ticket_types": [
                {
                    "id": 30,
                    "name": "Attendee",
                    "price": "30.00",
                    "quantity": 200,
                    "tickets_sold": 67,
                    "tickets_remaining": 133,
                    "revenue": "2010.00",
                    "sales_percentage": 33.5
                }
            ]
        },
        {
            "id": 18,
            "title": "Wine Tasting Evening",
            "slug": "wine-tasting-evening",
            "featured_image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 4,
                "name": "Food & Drink",
                "slug": "food-drink"
            },
            "venue_name": "Movenpick Ambassador Hotel",
            "venue_city": "Accra",
            "start_date": "2025-11-15",
            "start_time": "18:30:00",
            "end_date": "2025-11-15",
            "end_time": "21:30:00",
            "status": "past",
            "is_published": true,
            "is_recurring": true,
            "created_at": "2025-10-05T12:00:00Z",
            "updated_at": "2025-11-16T10:00:00Z",
            "analytics": {
                "total_tickets": 80,
                "tickets_sold": 80,
                "tickets_remaining": 0,
                "tickets_checked_in": 78,
                "sales_percentage": 100.0,
                "gross_revenue": "8000.00",
                "net_revenue": "7600.00",
                "platform_fee": "400.00",
                "page_views": 430,
                "unique_visitors": 280,
                "conversion_rate": 28.57,
                "last_sale_date": "2025-11-14T22:00:00Z"
            },
            "ticket_types": [
                {
                    "id": 31,
                    "name": "Tasting Session",
                    "price": "100.00",
                    "quantity": 80,
                    "tickets_sold": 80,
                    "tickets_remaining": 0,
                    "revenue": "8000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 19,
            "title": "Dance Battle Championship",
            "slug": "dance-battle-championship",
            "featured_image": "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 14,
                "name": "Dance",
                "slug": "dance"
            },
            "venue_name": "West Hills Mall",
            "venue_city": "Accra",
            "start_date": "2025-12-14",
            "start_time": "16:00:00",
            "end_date": "2025-12-14",
            "end_time": "21:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-05T13:00:00Z",
            "updated_at": "2025-12-04T16:00:00Z",
            "analytics": {
                "total_tickets": 350,
                "tickets_sold": 268,
                "tickets_remaining": 82,
                "tickets_checked_in": 0,
                "sales_percentage": 76.57,
                "gross_revenue": "6700.00",
                "net_revenue": "6365.00",
                "platform_fee": "335.00",
                "page_views": 1680,
                "unique_visitors": 1120,
                "conversion_rate": 23.93,
                "last_sale_date": "2025-12-08T12:40:00Z"
            },
            "ticket_types": [
                {
                    "id": 32,
                    "name": "General Admission",
                    "price": "25.00",
                    "quantity": 350,
                    "tickets_sold": 268,
                    "tickets_remaining": 82,
                    "revenue": "6700.00",
                    "sales_percentage": 76.57
                }
            ]
        },
        {
            "id": 20,
            "title": "Cooking Masterclass: Ghanaian Cuisine",
            "slug": "cooking-masterclass-ghanaian-cuisine",
            "featured_image": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 11,
                "name": "Workshop",
                "slug": "workshop"
            },
            "venue_name": "Culinary Arts Centre",
            "venue_city": "Accra",
            "start_date": "2025-08-22",
            "start_time": "10:00:00",
            "end_date": "2025-08-22",
            "end_time": "14:00:00",
            "status": "past",
            "is_published": true,
            "is_recurring": true,
            "created_at": "2025-07-15T11:00:00Z",
            "updated_at": "2025-08-23T09:00:00Z",
            "analytics": {
                "total_tickets": 25,
                "tickets_sold": 25,
                "tickets_remaining": 0,
                "tickets_checked_in": 24,
                "sales_percentage": 100.0,
                "gross_revenue": "3750.00",
                "net_revenue": "3562.50",
                "platform_fee": "187.50",
                "page_views": 280,
                "unique_visitors": 190,
                "conversion_rate": 13.16,
                "last_sale_date": "2025-08-20T19:30:00Z"
            },
            "ticket_types": [
                {
                    "id": 33,
                    "name": "Class Ticket",
                    "price": "150.00",
                    "quantity": 25,
                    "tickets_sold": 25,
                    "tickets_remaining": 0,
                    "revenue": "3750.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 21,
            "title": "Gaming Tournament: FIFA 25",
            "slug": "gaming-tournament-fifa-25",
            "featured_image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 15,
                "name": "Gaming",
                "slug": "gaming"
            },
            "venue_name": "GameZone Arena",
            "venue_city": "Accra",
            "start_date": "2026-01-05",
            "start_time": "12:00:00",
            "end_date": "2026-01-05",
            "end_time": "20:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-18T14:00:00Z",
            "updated_at": "2025-12-02T11:00:00Z",
            "analytics": {
                "total_tickets": 100,
                "tickets_sold": 76,
                "tickets_remaining": 24,
                "tickets_checked_in": 0,
                "sales_percentage": 76.0,
                "gross_revenue": "1520.00",
                "net_revenue": "1444.00",
                "platform_fee": "76.00",
                "page_views": 890,
                "unique_visitors": 620,
                "conversion_rate": 12.26,
                "last_sale_date": "2025-12-07T15:10:00Z"
            },
            "ticket_types": [
                {
                    "id": 34,
                    "name": "Spectator Pass",
                    "price": "20.00",
                    "quantity": 100,
                    "tickets_sold": 76,
                    "tickets_remaining": 24,
                    "revenue": "1520.00",
                    "sales_percentage": 76.0
                }
            ]
        },
        {
            "id": 22,
            "title": "Charity Gala Dinner",
            "slug": "charity-gala-dinner",
            "featured_image": "https://images.unsplash.com/photo-1519167758481-83f29da8c8d0?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 16,
                "name": "Charity",
                "slug": "charity"
            },
            "venue_name": "La Palm Royal Beach Hotel",
            "venue_city": "Accra",
            "start_date": "2025-10-05",
            "start_time": "19:00:00",
            "end_date": "2025-10-05",
            "end_time": "23:00:00",
            "status": "past",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-08-15T10:00:00Z",
            "updated_at": "2025-10-06T11:00:00Z",
            "analytics": {
                "total_tickets": 200,
                "tickets_sold": 195,
                "tickets_remaining": 0,
                "tickets_checked_in": 189,
                "sales_percentage": 97.5,
                "gross_revenue": "39000.00",
                "net_revenue": "37050.00",
                "platform_fee": "1950.00",
                "page_views": 2340,
                "unique_visitors": 1450,
                "conversion_rate": 13.45,
                "last_sale_date": "2025-10-04T18:45:00Z"
            },
            "ticket_types": [
                {
                    "id": 35,
                    "name": "Single Ticket",
                    "price": "200.00",
                    "quantity": 200,
                    "tickets_sold": 195,
                    "tickets_remaining": 0,
                    "revenue": "39000.00",
                    "sales_percentage": 97.5,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 23,
            "title": "Beach Volleyball Tournament",
            "slug": "beach-volleyball-tournament",
            "featured_image": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 5,
                "name": "Sports & Fitness",
                "slug": "sports-fitness"
            },
            "venue_name": "Kokrobite Beach",
            "venue_city": "Accra",
            "start_date": "2025-09-12",
            "start_time": "08:00:00",
            "end_date": "2025-09-13",
            "end_time": "18:00:00",
            "status": "past",
            "is_published": true,
            "is_recurring": true,
            "created_at": "2025-07-20T09:00:00Z",
            "updated_at": "2025-09-14T10:00:00Z",
            "analytics": {
                "total_tickets": 120,
                "tickets_sold": 116,
                "tickets_remaining": 0,
                "tickets_checked_in": 112,
                "sales_percentage": 96.67,
                "gross_revenue": "2900.00",
                "net_revenue": "2755.00",
                "platform_fee": "145.00",
                "page_views": 670,
                "unique_visitors": 420,
                "conversion_rate": 27.62,
                "last_sale_date": "2025-09-11T20:00:00Z"
            },
            "ticket_types": [
                {
                    "id": 36,
                    "name": "Spectator Pass",
                    "price": "25.00",
                    "quantity": 120,
                    "tickets_sold": 116,
                    "tickets_remaining": 0,
                    "revenue": "2900.00",
                    "sales_percentage": 96.67,
                    "status": "sold_out"
                }
            ]
        },
        {
            "id": 24,
            "title": "Poetry Slam Night",
            "slug": "poetry-slam-night",
            "featured_image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 13,
                "name": "Literature",
                "slug": "literature"
            },
            "venue_name": "Goethe-Institut",
            "venue_city": "Accra",
            "start_date": "2025-12-21",
            "start_time": "19:00:00",
            "end_date": "2025-12-21",
            "end_time": "22:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": true,
            "created_at": "2025-11-10T12:00:00Z",
            "updated_at": "2025-12-03T14:00:00Z",
            "analytics": {
                "total_tickets": 150,
                "tickets_sold": 89,
                "tickets_remaining": 61,
                "tickets_checked_in": 0,
                "sales_percentage": 59.33,
                "gross_revenue": "1335.00",
                "net_revenue": "1268.25",
                "platform_fee": "66.75",
                "page_views": 540,
                "unique_visitors": 360,
                "conversion_rate": 24.72,
                "last_sale_date": "2025-12-08T11:20:00Z"
            },
            "ticket_types": [
                {
                    "id": 37,
                    "name": "Entry Ticket",
                    "price": "15.00",
                    "quantity": 150,
                    "tickets_sold": 89,
                    "tickets_remaining": 61,
                    "revenue": "1335.00",
                    "sales_percentage": 59.33
                }
            ]
        },
        {
            "id": 25,
            "title": "Electronic Music Festival",
            "slug": "electronic-music-festival",
            "featured_image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
            "category": {
                "id": 1,
                "name": "Music",
                "slug": "music"
            },
            "venue_name": "Trade Fair Centre",
            "venue_city": "Accra",
            "start_date": "2026-02-14",
            "start_time": "18:00:00",
            "end_date": "2026-02-15",
            "end_time": "04:00:00",
            "status": "upcoming",
            "is_published": true,
            "is_recurring": false,
            "created_at": "2025-11-01T09:00:00Z",
            "updated_at": "2025-12-05T13:00:00Z",
            "analytics": {
                "total_tickets": 2500,
                "tickets_sold": 1342,
                "tickets_remaining": 1158,
                "tickets_checked_in": 0,
                "sales_percentage": 53.68,
                "gross_revenue": "107360.00",
                "net_revenue": "101992.00",
                "platform_fee": "5368.00",
                "page_views": 12450,
                "unique_visitors": 7890,
                "conversion_rate": 17.01,
                "last_sale_date": "2025-12-08T20:15:00Z"
            },
            "ticket_types": [
                {
                    "id": 38,
                    "name": "Early Bird",
                    "price": "60.00",
                    "quantity": 500,
                    "tickets_sold": 500,
                    "tickets_remaining": 0,
                    "revenue": "30000.00",
                    "sales_percentage": 100.0,
                    "status": "sold_out",
                    "available_from": "2025-11-01T00:00:00Z",
                    "available_until": "2025-11-30T23:59:59Z"
                },
                {
                    "id": 39,
                    "name": "Regular",
                    "price": "80.00",
                    "quantity": 1500,
                    "tickets_sold": 642,
                    "tickets_remaining": 858,
                    "revenue": "51360.00",
                    "sales_percentage": 42.8
                },
                {
                    "id": 40,
                    "name": "VIP",
                    "price": "150.00",
                    "quantity": 400,
                    "tickets_sold": 150,
                    "tickets_remaining": 250,
                    "revenue": "22500.00",
                    "sales_percentage": 37.5
                },
                {
                    "id": 41,
                    "name": "VVIP Table (4 pax)",
                    "price": "800.00",
                    "quantity": 100,
                    "tickets_sold": 50,
                    "tickets_remaining": 50,
                    "revenue": "40000.00",
                    "sales_percentage": 50.0
                }
            ]
        }
    ]
}

export const myEventAnalytics: MyEventAnalytics = {
    "event_id": 1,
    "event_title": "Afrobeats Night",
    "event_status": "upcoming",
    "overview": {
        "total_tickets": 500,
        "tickets_sold": 150,
        "tickets_remaining": 350,
        "tickets_checked_in": 0,
        "sales_percentage": 30.0,
        "check_in_percentage": 0.0,
        "gross_revenue": "10500.00",
        "net_revenue": "9975.00",
        "platform_fee": "525.00",
        "platform_fee_percentage": 5.0,
        "average_ticket_price": "70.00",
        "projected_revenue": "35000.00"
    },
    "sales_by_ticket_type": [
        {
            "ticket_type_id": 1,
            "ticket_type": "Regular",
            "price": "50.00",
            "tickets_sold": 100,
            "total_quantity": 300,
            "revenue": "5000.00",
            "percentage_of_total_sales": 66.7,
            "percentage_of_quantity_sold": 33.33
        },
        {
            "ticket_type_id": 2,
            "ticket_type": "VIP",
            "price": "150.00",
            "tickets_sold": 50,
            "total_quantity": 100,
            "revenue": "7500.00",
            "percentage_of_total_sales": 33.3,
            "percentage_of_quantity_sold": 50.0
        }
    ],
    "sales_timeline": [
        {
            "date": "2025-06-01",
            "tickets_sold": 20,
            "revenue": "1400.00",
            "cumulative_tickets": 20,
            "cumulative_revenue": "1400.00"
        },
        {
            "date": "2025-06-02",
            "tickets_sold": 15,
            "revenue": "1050.00",
            "cumulative_tickets": 35,
            "cumulative_revenue": "2450.00"
        },
        {
            "date": "2025-06-03",
            "tickets_sold": 25,
            "revenue": "1750.00",
            "cumulative_tickets": 60,
            "cumulative_revenue": "4200.00"
        }
    ],
    "sales_by_hour": [
        {
            "hour": "00:00",
            "tickets_sold": 2,
            "revenue": "100.00"
        },
        {
            "hour": "10:00",
            "tickets_sold": 15,
            "revenue": "750.00"
        },
        {
            "hour": "14:00",
            "tickets_sold": 30,
            "revenue": "1500.00"
        }
    ],
    "traffic": {
        "page_views": 1250,
        "unique_visitors": 890,
        "conversion_rate": 16.85,

    },

    "recent_sales": [
        {
            "ticket_id": "TKT-UUID-150",
            "ticket_type": "Regular",
            "amount": "50.00",
            "buyer_name": "Jane Smith",
            "purchase_date": "2025-06-14T16:20:00Z"
        },
        {
            "ticket_id": "TKT-UUID-149",
            "ticket_type": "VIP",
            "amount": "150.00",
            "buyer_name": "Michael Johnson",
            "purchase_date": "2025-06-14T15:10:00Z"
        }
    ]
}

export const eventAttendees: EventAttendees = {
    "count": 150,
    "next": "/api/v1/events/1/attendees/?page=2",
    "previous": null,
    "summary": {
        "total_attendees": 150,
        "checked_in": 0,
        "not_checked_in": 150,
        "check_in_percentage": 0.0
    },
    "results": [
        {
            "ticket_id": "TKT-UUID-001",
            "attendee_name": "John Doe",
            "attendee_email": "john.doe@example.com",
            "attendee_phone": "+233241234567",
            "ticket_type": {
                "id": 1,
                "name": "Regular",
                "price": "50.00"
            },
            "purchase_date": "2025-06-01T10:40:00Z",
            "payment_status": "paid",
            "payment_reference": "PSK-XYZ123",
            "amount_paid": "50.00",
            "is_checked_in": false,
            "checked_in_at": null,
            "checked_in_by": null
        },
        {
            "ticket_id": "TKT-UUID-002",
            "attendee_name": "Jane Smith",
            "attendee_email": "jane.smith@example.com",
            "attendee_phone": "+233241234568",
            "ticket_type": {
                "id": 2,
                "name": "VIP",
                "price": "150.00"
            },
            "purchase_date": "2025-06-02T14:20:00Z",
            "payment_status": "paid",
            "payment_reference": "PSK-ABC456",
            "amount_paid": "150.00",
            "is_checked_in": false,
            "checked_in_at": null,
            "checked_in_by": null
        }
    ]
}

export const attendedEvents: AttendedEventsResponse = {
    "count": 8,
    "next": "/api/v1/tickets/attended-events/?page=2",
    "previous": null,
    "results": [
        {
            "event": {
                "id": 1,
                "title": "Afrobeats Night",
                "slug": "afrobeats-night",
                "featured_image": "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "category": "Music",
                "venue_name": "National Theatre",
                "event_date": "2025-06-15"
            },
            "ticket_id": "TKT-UUID-001",
            "ticket_type": "Regular",
            "attended_date": "2025-06-15T20:15:00Z",
            "amount_paid": "50.00"
        }
    ]
}

export const myEventDetails: MyEventDetailsResponse = {
    "id": 1,
    "title": "Afrobeats Night",
    "slug": "afrobeats-night",
    "featured_image": "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "additional_images": [
        "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "category": {
        "id": 1,
        "name": "Music",
        "slug": "music"
    },
    "short_description": "The biggest Afrobeats party in Accra",
    "description": "# Afrobeats Night\n\nJoin us for an unforgettable night of music, dance, and celebration...",
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
    "status": "upcoming",
    "is_published": true,
    "is_recurring": false,
    "recurrence_pattern": null,
    "check_in_policy": "single_entry",
    "max_attendees": 500,
    "created_at": "2025-06-01T10:00:00Z",
    "updated_at": "2025-06-05T14:30:00Z",
    "organizer": {
        "id": 5,
        "username": "eventmaster",
        "full_name": "Event Master",
        "email": "eventmaster@example.com",
        "phone": "+233241234567",
        "profile_image": "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    "ticket_types": [
        {
            "id": 1,
            "name": "Regular",
            "description": "Standard admission",
            "price": "50.00",
            "quantity": 300,
            "tickets_sold": 100,
            "tickets_remaining": 200,
            "revenue": "5000.00",
            "sales_percentage": 33.33,
            "min_purchase": 1,
            "max_purchase": 10,
            "available_from": null,
            "available_until": null,
            "status": "active"
        },
        {
            "id": 2,
            "name": "VIP",
            "description": "VIP access with premium seating",
            "price": "150.00",
            "quantity": 100,
            "tickets_sold": 50,
            "tickets_remaining": 50,
            "revenue": "7500.00",
            "sales_percentage": 50.0,
            "min_purchase": 1,
            "max_purchase": 5,
            "available_from": null,
            "available_until": null,
            "status": "active"
        },
        {
            "id": 3,
            "name": "Early Bird",
            "description": "Limited early bird special",
            "price": "35.00",
            "quantity": 100,
            "tickets_sold": 0,
            "tickets_remaining": 100,
            "revenue": "0.00",
            "sales_percentage": 0.0,
            "min_purchase": 1,
            "max_purchase": 5,
            "available_from": "2025-06-01T00:00:00Z",
            "available_until": "2025-06-15T23:59:59Z",
            "status": "expired"
        }
    ]
}
