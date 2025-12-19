import {
    EventHero,
    EventDescription,
    TicketsSection,
    OrganizerSection,
    VenueSection,
    ShareSection,
    SimilarEventsSection,
    EventNotFound
} from '@/components';
import { getEventBySlug } from '@/app/lib/events';
import { getCurrentUser } from '@/app/lib/auth';

type Props = {
    params: Promise<{ slug: string }>;
};

const EventDetailsPage = async ({ params }: Props) => {
    const { slug } = await params;
    const [eventDetails, currentUser] = await Promise.all([
        getEventBySlug(slug),
        getCurrentUser()
    ])

    if (!eventDetails) {
        return <EventNotFound />;
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: eventDetails.title,
        description: eventDetails.description,
        image: eventDetails.featured_image,
        startDate: eventDetails.start_date,
        endDate: eventDetails.end_date,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
            '@type': 'Place',
            name: eventDetails.venue.name,
            address: {
                '@type': 'PostalAddress',
                streetAddress: eventDetails.venue.address,
                addressLocality: eventDetails.venue.city,
                addressCountry: eventDetails.venue.country
            }
        },
        offers: {
            '@type': 'Offer',
            url: `https://www.cafaticket.com/events/${eventDetails.slug}`,
            price: eventDetails.lowest_price,
            priceCurrency: 'GHS',
            availability: 'https://schema.org/InStock',
            validFrom: new Date().toISOString()
        },
        organizer: {
            '@type': 'Organization',
            name: eventDetails.organizer.full_name,
            url: 'https://www.cafaticket.com'
        }
    };


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-primary">
                {/* Hero Section with Image Gallery & Key Info */}
                <EventHero event={eventDetails} />

                {/* Event Description with Markdown Support */}
                <EventDescription event={eventDetails} />

                {/* Tickets Section (Conditionally shown based on status) */}
                <TicketsSection event={eventDetails} currentUser={currentUser} />

                {/* Organizer Profile & Stats */}
                <OrganizerSection event={eventDetails} />

                {/* Venue Location with Google Maps */}
                <VenueSection event={eventDetails} />

                {/* Share Event on Social Media */}
                <ShareSection event={eventDetails} />

                {/* Similar Events Recommendations */}
                <SimilarEventsSection event={eventDetails} />
            </main>
        </>
    );
};

export default EventDetailsPage;