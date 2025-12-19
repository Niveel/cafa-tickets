import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { CreateTicketForm } from '@/components';
import { getMyCreatedEventDetails } from '@/app/lib/dashboard';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Add Ticket Type | Cafa Ticket`,
        description: 'Add a new ticket type to your event.',
    };
}

const CreateTicketPage = async ({ params }: Props) => {
    const { slug } = await params;
    const eventDetails = await getMyCreatedEventDetails(slug);
    
    const event = eventDetails;

    if (!event || event.slug !== slug) {
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
                            Add Ticket Type
                        </h1>
                        <p className="normal-text text-slate-400">
                            {event.title}
                        </p>
                    </div>
                </div>

                {/* Create Ticket Form */}
                <CreateTicketForm eventSlug={slug} />
            </div>
        </main>
    );
};

export default CreateTicketPage;