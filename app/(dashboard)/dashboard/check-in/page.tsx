import { Metadata } from 'next';
import { myEvents } from '@/data/dummy.dash-events';
import { CheckInContent } from '@/components';

export const metadata: Metadata = {
    title: 'Event Check-in | Cafa Tickets',
    description: 'Check in attendees at your events using QR code scanner or manual entry.',
    keywords: ['event check-in', 'QR scanner', 'attendee management', 'Ghana events'],
};

const CheckInPage = async () => {
    // In production, fetch only user's upcoming/ongoing events
    // const response = await fetchMyUpcomingEvents({ page: 1, page_size: 10 });
    const upcomingEvents = myEvents.results.filter(
        e => e.status === 'upcoming' || e.status === 'ongoing'
    );

    // In production, check if there's a next page
    // const hasMore = !!response.next;
    const hasMore = false; // Set to true if you have pagination in backend

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <CheckInContent 
                    initialEvents={upcomingEvents}
                    initialHasMore={hasMore}
                />
            </div>
        </main>
    );
};

export default CheckInPage;