import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Cafa Ticket - Event Ticketing Platform',
        short_name: 'Cafa Ticket',
        description: 'Discover and book tickets for concerts, festivals, sports events, conferences, and more. Seamless event ticketing platform for organizers and attendees worldwide.',
        start_url: '/',
        display: 'standalone',
        background_color: '#050E3C',
        theme_color: '#DC0000',
        orientation: 'portrait-primary',
        scope: '/',
        lang: 'en-US',
        dir: 'ltr',
        categories: [
            'entertainment',
            'lifestyle',
            'business',
            'productivity',
            'social'
        ],
        icons: [
            {
                "src": "/web-app-manifest-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/web-app-manifest-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                src: '/icons/icon-72x72.png',
                sizes: '72x72',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icons/icon-96x96.png',
                sizes: '96x96',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icons/icon-128x128.png',
                sizes: '128x128',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icons/icon-144x144.png',
                sizes: '144x144',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icons/icon-152x152.png',
                sizes: '152x152',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icons/icon-384x384.png',
                sizes: '384x384',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
        screenshots: [
            {
                src: '/screenshots/desktop-home.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
                label: 'Cafa Ticket Homepage'
            },
            {
                src: '/screenshots/mobile-events.png',
                sizes: '750x1334',
                type: 'image/png',
                form_factor: 'narrow',
                label: 'Browse Events'
            }
        ],
        shortcuts: [
            {
                name: 'Browse Events',
                short_name: 'Events',
                description: 'Discover upcoming events',
                url: '/events',
                icons: [
                    {
                        src: '/icons/shortcut-events.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: 'My Tickets',
                short_name: 'Tickets',
                description: 'View your tickets',
                url: '/dashboard/tickets',
                icons: [
                    {
                        src: '/icons/shortcut-tickets.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: 'Create Event',
                short_name: 'Create',
                description: 'Create a new event',
                url: '/dashboard/events/create',
                icons: [
                    {
                        src: '/icons/shortcut-create.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            }
        ],
        related_applications: [],
        prefer_related_applications: false,

    };
}