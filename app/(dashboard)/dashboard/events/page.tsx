import { Suspense } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Loader2 } from 'lucide-react';
import { MyEventsContent } from '@/components';

const DashboardEventsPage = () => {
    return (
        <main className='dash-page space-y-8'>
            {/* Page Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="massive-text font-bold text-white mb-2">
                        My Events
                    </h1>
                    <p className="big-text-5 text-slate-200">
                        Manage and track your created events
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/events/attended"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-200 text-white rounded-xl font-semibold normal-text-2 hover:bg-primary transition-all duration-300 border-2 border-accent/30 hover:border-accent"
                    >
                        <Calendar className="w-5 h-5" aria-hidden="true" />
                        Attended Events
                    </Link>
                    <Link
                        href="/dashboard/events/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300 hover:scale-[1.02]"
                    >
                        <Plus className="w-5 h-5" aria-hidden="true" />
                        Create Event
                    </Link>
                </div>
            </div>

            {/* Filters & List */}
            <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            }>
                <MyEventsContent />
            </Suspense>
        </main>
    );
};

export default DashboardEventsPage;