import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { myEvents, eventAttendees } from '@/data/dummy.dash-events';
import { EventAttendeesSummary, EventAttendeesContent } from '@/components';

type Props = {
    params: Promise<{ slug: string }>;
};

const EventAttendeesPage = async ({ params }: Props) => {
    const { slug } = await params;
    // Find event by slug
    const event = myEvents.results.find(e => e.slug === slug);

    if (!event) {
        return (
            <main className='dash-page'>
                <div className="text-center py-12">
                    <h1 className="big-text-2 font-bold text-white mb-3">
                        Event Not Found
                    </h1>
                    <p className="normal-text text-slate-300 mb-6">
                        The event you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
                    </p>
                    <Link
                        href="/dashboard/events"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        Back to My Events
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className='dash-page space-y-8'>
            {/* Back Button */}
            <Link
                href={`/dashboard/events/${event.slug}`}
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Event Details
            </Link>

            {/* Page Header */}
            <div>
                <h1 className="massive-text font-bold text-white mb-2">
                    Event Attendees
                </h1>
                <p className="big-text-5 text-slate-200">
                    {event.title}
                </p>
            </div>

            {/* Summary Cards */}
            <EventAttendeesSummary summary={eventAttendees.summary} />

            {/* Filters & Table */}
            <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            }>
                <EventAttendeesContent 
                    eventSlug={event.slug}
                    ticketTypes={event.ticket_types.map(tt => ({ 
                        id: tt.id, 
                        name: tt.name 
                    }))}
                />
            </Suspense>
        </main>
    );
};

export default EventAttendeesPage;