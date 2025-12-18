import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { EventAttendeesSummary, EventAttendeesContent } from '@/components';
import { getMyCreatedEventDetails, getMyEventAttendees } from '@/app/lib/dashboard';

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{
        search?: string;
        ticket_type_id?: string;
        payment_status?: string;
        check_in_status?: string;
        sort_by?: string;
    }>;
};

const EventAttendeesPage = async ({ params, searchParams }: Props) => {
    const { slug } = await params;
    const filters = await searchParams;

    const [event, eventAttendees] = await Promise.all([
        getMyCreatedEventDetails(slug),
        getMyEventAttendees(slug, 1, 20, {
            search: filters.search,
            ticket_type_id: filters.ticket_type_id,
            payment_status: filters.payment_status,
            check_in_status: filters.check_in_status,
            sort_by: filters.sort_by,
        })
    ]);

    console.log("Event Attendees", eventAttendees);

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

    if (!eventAttendees) {
        return (
            <main className='dash-page'>
                <div className="text-center py-12">
                    <h1 className="big-text-2 font-bold text-white mb-3">
                        Unable to Load Attendees
                    </h1>
                    <p className="normal-text text-slate-300 mb-6">
                        Failed to fetch event attendees. Please try again.
                    </p>
                    <Link
                        href={`/dashboard/events/${slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        Back to Event Details
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

            {/* Filters & Attendees List */}
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
                    initialData={eventAttendees}
                />
            </Suspense>
        </main>
    );
};

export default EventAttendeesPage;