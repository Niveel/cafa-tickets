import { BASE_URL } from '@/data/constants';

interface SitemapEvent {
    slug: string;
    updated_at?: string;
    created_at?: string;
}

export async function GET() {
    // Frontend base URL
    const frontendUrl = process.env.NODE_ENV === 'production'
        ? 'https://www.cafaticket.com' 
        : 'http://localhost:3000';

    // Static routes (only pages that actually exist)
    const staticRoutes = [
        // Public pages
        '',
        '/contact',
        '/events',
        '/events/history',
        '/onboarding',
        '/privacy',
        '/terms',
        
        // Auth pages
        '/login',
        '/signup',
        '/forgot-password',
        '/password-reset',
        
        // Dashboard pages
        '/dashboard',
        '/dashboard/profile',
        '/dashboard/profile/edit',
        '/dashboard/settings',
        '/dashboard/settings/security',
        '/dashboard/settings/notifications',
        '/dashboard/settings/privacy',
        '/dashboard/events',
        '/dashboard/events/create',
        '/dashboard/events/attended',
        '/dashboard/tickets',
        '/dashboard/payments',
        '/dashboard/payments/history',
        '/dashboard/payments/profiles',
        '/dashboard/payments/profiles/create',
        '/dashboard/check-in',
    ];

    // Fetch dynamic events from backend
    let events: SitemapEvent[] = [];
    try {
        const response = await fetch(`${BASE_URL}/events/?page_size=1000`, {
            cache: 'no-store',
        });
        if (response.ok) {
            const data = await response.json();
            events = Array.isArray(data?.results) ? data.results : [];
        }
    } catch (error) {
        console.error('Error fetching events for sitemap:', error);
    }

    // Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${frontendUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${events.map(event => {
    const lastMod = event.updated_at ?? event.created_at ?? new Date().toISOString();
    return `  <url>
    <loc>${frontendUrl}/events/${event.slug}</loc>
    <lastmod>${new Date(lastMod).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
}).join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
