import { Suspense } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Loader2, ShieldCheck } from 'lucide-react';

import { MyEventsContent } from '@/components';
import { getCurrentUser } from '@/app/lib/auth';

const DashboardEventsPage = async () => {
    const currentUser = await getCurrentUser();
    const isOrganizer = currentUser?.is_organizer;

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
                        href={isOrganizer ? "/dashboard/events/create" : "/dashboard/profile/verify"}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300 hover:scale-[1.02]"
                    >
                        {isOrganizer ? (
                            <>
                                <Plus className="w-5 h-5" aria-hidden="true" />
                                Create Event
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                                Verify to Create Event
                            </>
                        )}
                    </Link>
                </div>
            </div>

            {/* Verification Notice for Non-Organizers */}
            {!isOrganizer && (
                <div className="p-6 bg-amber-500/10 border-2 border-amber-500 rounded-xl">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <h3 className="big-text-4 font-bold text-white mb-2">
                                Verification Required
                            </h3>
                            <p className="normal-text text-slate-300 mb-4">
                                To create your first event, you need to verify your identity. This helps us maintain trust and safety on our platform.
                            </p>
                            <Link
                                href="/dashboard/profile/verify"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg font-semibold normal-text-2 hover:bg-accent-100 transition-all"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Start Verification
                            </Link>
                        </div>
                    </div>
                </div>
            )}

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