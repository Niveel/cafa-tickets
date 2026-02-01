import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

import { AttendedEventsResponse } from '@/types/dash-events.types';
import { AttendedEventCard } from '@/components';

type AttendedEvent = AttendedEventsResponse['results'][0];

type Props = {
    attendedEvents: AttendedEvent[];
};

const AttendedEventsList = ({ attendedEvents }: Props) => {
    // ✅ Check if attendedEvents exists first
    if (!attendedEvents || attendedEvents.length === 0) {
        return (
            <div role="region" aria-label="Attended events" className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-accent-50" aria-hidden="true" />
                </div>
                <h2 className="big-text-3 font-bold text-white mb-3">
                    No Events Attended Yet
                </h2>
                <p className="normal-text text-slate-300 mb-6 max-w-md mx-auto">
                    You haven&apos;t attended any events yet. Browse events and purchase tickets to start building your event history.
                </p>
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                >
                    Browse Events
                </Link>
            </div>
        );
    }

    return (
        <div role="region" aria-label="Attended events" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attendedEvents.map((attendedEvent, index) => (
                <AttendedEventCard
                    key={`${attendedEvent.ticket_id}-${index}`}
                    attendedEvent={attendedEvent}
                />
            ))}
        </div>
    );
};

export default AttendedEventsList;