"use client";

import { Ticket as TicketIcon, Clock, Ban, Info } from 'lucide-react';
import { EventDetails, RecurringEventDetails } from '@/types/events.types';
import {TicketCard} from '@/components';

interface TicketsSectionProps {
    event: EventDetails | RecurringEventDetails;
}

const TicketsSection = ({ event }: TicketsSectionProps) => {
    const isUpcoming = event.status === 'upcoming';
    const isOngoing = event.status === 'ongoing';
    const isPast = event.status === 'past';

    // Show tickets only for upcoming events
    if (!isUpcoming) {
        return (
            <section className="relative py-12 sm:py-16 bg-primary" id="tickets">
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
                        <div className={`relative p-8 rounded-2xl border-2 text-center ${
                            isOngoing 
                                ? 'bg-accent/10 border-accent' 
                                : 'bg-slate-600/10 border-slate-600'
                        }`}>
                            {/* Icon */}
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                                isOngoing 
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
                                <a
                                    href="/events"
                                    className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300 hover:scale-105"
                                >
                                    Explore Other Events
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Show tickets for upcoming events
    return (
        <section className="relative py-12 sm:py-16 bg-primary" id="tickets">
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
                        {event.tickets_available <= 50 && (
                            <span className="text-accent-50 font-bold"> Hurry, only {event.tickets_available} tickets left!</span>
                        )}
                    </p>
                </div>

                {/* Tickets Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {event.ticket_types.map((ticket) => (
                        <TicketCard 
                            key={ticket.id} 
                            ticket={ticket}
                            onSelect={(ticketId, quantity) => {
                                // Handle ticket selection
                                console.log(`Selected ticket ${ticketId} with quantity ${quantity}`);
                            }}
                        />
                    ))}
                </div>

                {/* Important Notes */}
                <div className="mt-10 p-6 bg-primary-100 rounded-xl border border-accent">
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
                                    <span>Tickets are non-refundable but can be transferred to another person</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-accent-50 mt-1">•</span>
                                    <span>Please bring a valid ID and your ticket confirmation email</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-accent-50 mt-1">•</span>
                                    <span>Gates open 30 minutes before the event start time</span>
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