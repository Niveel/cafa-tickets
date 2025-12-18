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

    return (
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
    );
};

export default EventDetailsPage;