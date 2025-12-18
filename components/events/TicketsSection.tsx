"use client";

import { Ticket as TicketIcon, Clock, Ban, Info, AlertCircle } from 'lucide-react';
import { EventDetails, RecurringEventDetails } from '@/types/events.types';
import { CurrentUser } from '@/types/general.types';
import { TicketCard } from '@/components';
import Link from 'next/link';

interface TicketsSectionProps {
    event: EventDetails | RecurringEventDetails;
    currentUser: CurrentUser | null;
}

const TicketsSection = ({ event, currentUser }: TicketsSectionProps) => {
    const isUpcoming = event.status === 'upcoming';
    const isOngoing = event.status === 'ongoing';
    const isPast = event.status === 'past';
    const hasNoTickets = !event.ticket_types || event.ticket_types.length === 0;

    // Show tickets only for upcoming events
    if (!isUpcoming) {
        return (
            <section className="relative py-8 sm:y-12 bg-primary" id="tickets">
                <div className="inner-wrapper">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-slate-600/20 flex items-center justify-center border border-slate-600">
                            <TicketIcon className="w-6 h-6 text-slate-400" aria-hidden="true" />
                        </div>
                        <h2 className="big-text-1 font-bold text-white">
                            Tickets
                        </h2>
                    </div>

                    {/* Status Message */}
                    <div className="max-w-2xl mx-auto">
                        <div className={`relative p-8 rounded-2xl border-2 text-center ${isOngoing
                                ? 'bg-accent/10 border-accent'
                                : 'bg-slate-600/10 border-slate-600'
                            }`}>
                            {/* Icon */}
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isOngoing
                                    ? 'bg-accent/20'
                                    : 'bg-slate-600/20'
                                }`}>
                                {isOngoing ? (
                                    <Clock className="w-8 h-8 text-accent-50" aria-hidden="true" />
                                ) : (
                                    <Ban className="w-8 h-8 text-slate-400" aria-hidden="true" />
                                )}
                            </div>

                            {/* Message */}
                            <h3 className="big-text-3 font-bold text-white mb-3">
                                {isOngoing && 'Event In Progress'}
                                {isPast && 'Ticket Sales Closed'}
                            </h3>

                            <p className="normal-text text-slate-300 leading-relaxed mb-4">
                                {isOngoing && (
                                    <>
                                        This event is currently ongoing! Ticket sales have ended as the event has already started.
                                        We hope everyone attending has a fantastic time!
                                    </>
                                )}
                                {isPast && (
                                    <>
                                        This event has already taken place. Ticket sales are no longer available.
                                        Check out our other upcoming events to find your next experience!
                                    </>
                                )}
                            </p>

                            {/* Additional Info */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-lg border border-accent/30">
                                <Info className="w-4 h-4 text-accent-50 shrink-0" aria-hidden="true" />
                                <span className="small-text text-slate-300">
                                    {isOngoing && `Started on ${new Date(event.start_date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}`}
                                    {isPast && `Took place on ${new Date(event.start_date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}`}
                                </span>
                            </div>

                            {/* CTA */}
                            <div className="mt-6">
                                <Link href="/events"
                                    className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300 hover:scale-105"
                                >
                                    Explore Other Events
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ✅ Show no tickets available message
    if (hasNoTickets) {
        return (
            <section className="relative py-8 sm:y-12 bg-primary" id="tickets">
                <div className="inner-wrapper">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-slate-600/20 flex items-center justify-center border border-slate-600">
                            <TicketIcon className="w-6 h-6 text-slate-400" aria-hidden="true" />
                        </div>
                        <h2 className="big-text-1 font-bold text-white">
                            Tickets
                        </h2>
                    </div>

                    {/* No Tickets Message */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative p-8 rounded-2xl border-2 bg-amber-500/10 border-amber-500 text-center">
                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-amber-400" aria-hidden="true" />
                            </div>

                            {/* Message */}
                            <h3 className="big-text-3 font-bold text-white mb-3">
                                No Tickets Available Yet
                            </h3>

                            <p className="normal-text text-slate-300 leading-relaxed mb-4">
                                The organizer hasn&apos;t added any ticket types for this event yet.
                                Please check back later or contact the organizer for more information.
                            </p>

                            {/* Additional Info */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-lg border border-amber-500/30">
                                <Info className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                                <span className="small-text text-slate-300">
                                    Tickets will be available soon
                                </span>
                            </div>

                            {/* CTA */}
                            <div className="mt-6">
                                <Link href="/events"
                                    className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300 hover:scale-105"
                                >
                                    Browse Other Events
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Show tickets for upcoming events
    return (
        <section className="relative py-8 sm:y-12 bg-primary" id="tickets">
            <div className="inner-wrapper">
                {/* Section Header */}
                <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent">
                            <TicketIcon className="w-6 h-6 text-accent-50" aria-hidden="true" />
                        </div>
                        <h2 className="big-text-1 font-bold text-white">
                            Get Your Tickets
                        </h2>
                    </div>
                    <p className="big-text-5 text-slate-200 max-w-3xl">
                        Choose your ticket type and secure your spot at this amazing event.
                        {event.tickets_available <= 50 && event.tickets_available > 0 && (
                            <span className="text-accent-50 font-bold"> Hurry, only {event.tickets_available} tickets left!</span>
                        )}
                    </p>
                </div>

                {/* Tickets Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.ticket_types.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            event={event}
                            currentUser={currentUser}
                        />
                    ))}
                </div>

                {/* Important Notes */}
                <div className="mt-8 p-4 bg-primary-100 rounded-xl border border-accent">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                            <Info className="w-5 h-5 text-accent-50" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h3 className="big-text-5 font-bold text-white mb-3">
                                Important Ticket Information
                            </h3>
                            <ul className="space-y-2 text-slate-200 normal-text-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-accent-50 mt-1">•</span>
                                    <span>Tickets are non-refundable</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-accent-50 mt-1">•</span>
                                    <span>Please bring a valid ticket to the event (your qr code or ticket number)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-accent-50 mt-1">•</span>
                                    <span>Check-in policy: {event.check_in_policy === 'single_entry' ? 'Single entry only' : 'Daily entry allowed for multi-day events'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TicketsSection;