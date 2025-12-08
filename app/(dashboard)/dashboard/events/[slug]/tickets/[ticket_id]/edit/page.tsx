import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { myEventDetails } from '@/data/dummy.dash-events';
import { EditTicketForm } from '@/components';

type Props = {
    params: Promise<{ slug: string; ticketId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Edit Ticket Type | Cafa Tickets`,
        description: 'Edit ticket type details for your event.',
    };
}

const EditTicketPage = async ({ params }: Props) => {
    const { slug, ticketId } = await params;
    
    // In production, fetch from API
    const event = myEventDetails;
    const ticket = event.ticket_types.find(t => t.id.toString() === ticketId);

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

    if (!ticket) {
        return (
            <main className="min-h-screen bg-primary-100 dash-page">
                <div className="inner-wrapper">
                    <div className="text-center py-12">
                        <h1 className="big-text-2 font-bold text-white mb-3">
                            Ticket Type Not Found
                        </h1>
                        <p className="normal-text text-slate-300 mb-6">
                            The ticket type you&apos;re looking for doesn&apos;t exist.
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
                            Edit Ticket Type
                        </h1>
                        <p className="normal-text text-slate-400">
                            {ticket.name} • {event.title}
                        </p>
                    </div>
                </div>

                {/* Edit Ticket Form */}
                <EditTicketForm ticket={ticket} eventSlug={slug} />
            </div>
        </main>
    );
};

export default EditTicketPage;