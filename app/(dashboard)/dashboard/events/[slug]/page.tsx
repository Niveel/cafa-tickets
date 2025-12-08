import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { myEvents, myEventAnalytics } from '@/data/dummy.dash-events';
import { 
    EventDetailsHeader,
    EventAnalyticsOverview,
    EventSalesByTicketType,
    EventTrafficStats,
    EventRecentSales
} from '@/components';

type Props = {
    params: Promise<{ slug: string }>;
};

const EventDetailsPage = async ({ params }: Props) => {
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
                href="/dashboard/events"
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to My Events
            </Link>

            {/* Event Header */}
            <EventDetailsHeader event={event} />

            {/* Analytics Section */}
            <div>
                <h2 className="big-text-2 font-bold text-white mb-6">
                    Event Analytics
                </h2>
                
                <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-accent animate-spin" />
                    </div>
                }>
                    <div className="space-y-6">
                        {/* Overview Metrics */}
                        <EventAnalyticsOverview analytics={myEventAnalytics.overview} />

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <EventSalesByTicketType salesByTicketType={myEventAnalytics.sales_by_ticket_type} />
                            <EventTrafficStats 
                                traffic={myEventAnalytics.traffic} 
                                ticketsSold={myEventAnalytics.overview.tickets_sold}
                            />
                        </div>

                        {/* Recent Sales */}
                        <EventRecentSales recentSales={myEventAnalytics.recent_sales} />
                    </div>
                </Suspense>
            </div>
        </main>
    );
};

export default EventDetailsPage;