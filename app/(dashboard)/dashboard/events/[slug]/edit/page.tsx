import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { EditEventForm } from '@/components';
import { getMyCreatedEventDetails, getMyPaymentProfiles } from '@/app/lib/dashboard';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Edit Event | ${slug} | Cafa Tickets`,
        description: 'Edit your event details, ticket types, and settings.',
    };
}

const EditEventPage = async ({ params }: Props) => {
    const { slug } = await params;
    const [myEventDetails, myPaymentProfiles] = await Promise.all([ 
        getMyCreatedEventDetails(slug),
        getMyPaymentProfiles()
    ]);

    const event = myEventDetails;

    // !event || event.slug !== slug
    if (!event) {
        return (
            <main className="min-h-screen bg-primary-100 dash-page">
                <div className="inner-wrapper">
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
                </div>
            </main>
        );
    }

    // Check if event has started or ended (cannot edit)
    const now = new Date();
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const hasStarted = now >= startDate;
    const hasEnded = now > endDate;

    if (hasStarted || hasEnded) {
        return (
            <main className="min-h-screen bg-primary-100 dash-page">
                <div className="inner-wrapper">
                    <div className="text-center py-12">
                        <h1 className="big-text-2 font-bold text-white mb-3">
                            Cannot Edit Event
                        </h1>
                        <p className="normal-text text-slate-300 mb-6">
                            {hasEnded 
                                ? 'This event has already ended and cannot be edited.'
                                : 'This event has already started and cannot be edited.'
                            }
                        </p>
                        <Link
                            href={`/dashboard/events/${slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                            Back to Event Details
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    console.log('Editing event with slug:', slug, "event details:", myEventDetails);
    console.log("event slug from data:", event.slug, "slug param:", slug);

    return (
        <main className="min-h-screen bg-primary-100 dash-page">
            <div className="inner-wrapper space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={`/dashboard/events/${slug}`}
                        className="w-10 h-10 rounded-lg bg-primary hover:bg-primary-200 flex items-center justify-center transition-colors border-2 border-accent/30 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label="Back to Event Details"
                    >
                        <ArrowLeft className="w-5 h-5 text-white" aria-hidden="true" />
                    </Link>
                    <div>
                        <h1 className="big-text-1 font-bold text-white">
                            Edit Event
                        </h1>
                        <p className="normal-text text-slate-400">
                            Update your event details and settings
                        </p>
                    </div>
                </div>

                {/* Edit Form */}
                <EditEventForm event={event} paymentProfiles={myPaymentProfiles?.results || []} />
            </div>
        </main>
    );
};

export default EditEventPage;