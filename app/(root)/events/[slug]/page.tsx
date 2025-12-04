
import { eventDetails, recurringEventDetails } from '@/data/dummy.events';
import {EventHero, EventDescription, TicketsSection, OrganizerSection, VenueSection, ShareSection, SimilarEventsSection} from '@/components';

const EventDetailsPage = () => {
    // Toggle this to test recurring vs normal events
    const isRecurring = false;
    const event = isRecurring ? recurringEventDetails : eventDetails;

    return (
        <main className="min-h-screen bg-primary">
            {/* Hero Section with Image Gallery & Key Info */}
            <EventHero event={event} />

            {/* Event Description with Markdown Support */}
            <EventDescription event={event} />

            {/* Tickets Section (Conditionally shown based on status) */}
            <TicketsSection event={event} />

            {/* Organizer Profile & Stats */}
            <OrganizerSection event={event} />

            {/* Venue Location with Google Maps */}
            <VenueSection event={event} />

            {/* Share Event on Social Media */}
            <ShareSection event={event} />

            {/* Similar Events Recommendations */}
            <SimilarEventsSection event={event} />
        </main>
    );
};

export default EventDetailsPage;