import { Metadata } from 'next';

import { CheckInContent } from '@/components';
import { getMyCreatedEvents } from '@/app/lib/dashboard';


export const metadata: Metadata = {
    title: 'Event Check-in | Cafa Tickets',
    description: 'Check in attendees at your events using QR code scanner or manual entry.',
    keywords: ['event check-in', 'QR scanner', 'attendee management', 'Ghana events'],
};

const CheckInPage = async () => {
    // Fetch upcoming and ongoing events from backend using filters
    const [upcomingData, ongoingData] = await Promise.all([
        getMyCreatedEvents(1, 20, { status: 'upcoming' }),
        getMyCreatedEvents(1, 20, { status: 'ongoing' })
    ]);

    if (!upcomingData && !ongoingData) {
        return (
            <main className="dash-page">
                <div className="inner-wrapper">
                    <div className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                        <p className="big-text-3 text-white">Unable to load events</p>
                    </div>
                </div>
            </main>
        );
    }

    // Combine results from both queries
    const upcomingEvents = [
        ...(upcomingData?.results || []),
        ...(ongoingData?.results || [])
    ];

    // Check if there are more events to load (either query has next page)
    const hasMore = !!(upcomingData?.next || ongoingData?.next);

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