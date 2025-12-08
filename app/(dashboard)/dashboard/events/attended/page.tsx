import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { attendedEvents } from '@/data/dummy.dash-events';
import { AttendedEventsList } from '@/components';

const AttendedEventsPage = () => {
    return (
        <main className='dash-page space-y-8'>
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
                <h1 className="massive-text font-bold text-white mb-2">
                    Attended Events
                </h1>
                <p className="big-text-5 text-slate-200">
                    Your event attendance history
                </p>
            </div>

            {/* Info Card */}
            <div role="region" aria-label="Attended events info" className="bg-primary rounded-xl p-6 border-2 border-blue-500/30">
                <h2 className="big-text-4 font-bold text-white mb-3">
                    About Your Attendance History
                </h2>
                <p className="normal-text text-slate-200">
                    This page shows all events you&apos;ve successfully attended. Your check-in was confirmed at the event entrance.
                </p>
            </div>

            {/* Attended Events List */}
            <AttendedEventsList attendedEvents={attendedEvents.results} />
        </main>
    );
};

export default AttendedEventsPage;