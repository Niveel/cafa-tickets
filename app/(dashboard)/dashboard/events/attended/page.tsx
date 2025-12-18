import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { AttendedEventsList } from '@/components';
import { getMyAttendedEvents } from '@/app/lib/dashboard';

const AttendedEventsPage = async () => {
    const attendedEvents = await getMyAttendedEvents();

    console.log("Attended Events:", attendedEvents);

    return (
        <main className='dash-page space-y-6'>
            {/* Back Button */}
            <Link
                href="/dashboard/events"
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to My Events
            </Link>

            {/* Page Header */}
            <div>
                <h1 className="big-text-2 font-bold text-white mb-2">
                    Attended Events
                </h1>
                <p className="big-text-5 text-slate-200">
                    Your event attendance history
                </p>
            </div>

            {!attendedEvents ? (
                <div className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                    <p className="big-text-3 text-white">Unable to load attended events</p>
                </div>
            ) : (
                <>
                    {/* Info Card */}
                    <div role="region" aria-label="Attended events info" className="bg-primary rounded-xl p-4 border-2 border-blue-500/30">
                        <h2 className="big-text-4 font-bold text-white mb-2">
                            About Your Attendance History
                        </h2>
                        <p className="normal-text text-slate-200">
                            This page shows all events you&apos;ve successfully attended. Your check-in was confirmed at the event entrance.
                        </p>
                    </div>

                    {/* Attended Events List */}
                    <AttendedEventsList attendedEvents={attendedEvents.results} />
                </>
            )}
        </main>
    );
};

export default AttendedEventsPage;