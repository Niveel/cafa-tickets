import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { 
    EventDetailsHeader,
    EventInfoSection,
    EventTicketTypesManagement,
    EventAnalyticsOverview,
    EventSalesByTicketType,
    EventTrafficStats,
    EventRecentSales,
    EventImageGallery,
} from '@/components';
import { getMyCreatedEventDetails, getMyCreatedEventAnalytics } from '@/app/lib/dashboard';
import { getFullImageUrl } from '@/utils/imageUrl';

type Props = {
    params: Promise<{ slug: string }>;
};

const EventDetailsPage = async ({ params }: Props) => {
    const { slug } = await params;
    const [myEventDetails, myEventAnalytics] = await Promise.all([ 
        getMyCreatedEventDetails(slug),
        getMyCreatedEventAnalytics(slug)
    ]);
    

    if (!myEventDetails || !myEventAnalytics) {
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

    const eventDetails = myEventDetails;

    const galleryImages = eventDetails.additional_images.map(img => getFullImageUrl(img)).filter((img): img is string => Boolean(img));

    return (
        <main className='dash-page space-y-8'>

            {/* Event Header - uses eventListItem (has analytics) */}
            <EventDetailsHeader event={myEventDetails} />

            {/* Event Information Section - uses eventDetails (full data) */}
            <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            }>
                <EventInfoSection event={eventDetails} />
            </Suspense>

            {eventDetails.additional_images && eventDetails.additional_images.length > 0 && (
                <EventImageGallery 
                    images={galleryImages || []}
                    eventTitle={eventDetails.title}
                />
            )}

            {/* Divider */}
            <div className="border-t border-accent/30"></div>

            {/* Ticket Types Management - uses eventDetails (has ticket_types) */}
            <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            }>
                <EventTicketTypesManagement 
                    ticketTypes={eventDetails.ticket_types} 
                    eventSlug={slug}
                />
            </Suspense>

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