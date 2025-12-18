"use client";

import { FileText, Calendar, MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { EventDetails, RecurringEventDetails } from '@/types/events.types';
import Link from 'next/link';

interface EventDescriptionProps {
    event: EventDetails | RecurringEventDetails;
}

const EventDescription = ({ event }: EventDescriptionProps) => {
    const isRecurring = 'recurrence_info' in event && event.recurrence_info !== null;

    return (
        <section className="relative py-8 sm:y-12 bg-primary-100">
            <div className="inner-wrapper">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content - Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Section Header */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent">
                                <FileText className="w-6 h-6 text-accent-50" aria-hidden="true" />
                            </div>
                            <h2 className="big-text-1 font-bold text-white">
                                About This Event
                            </h2>
                        </div>

                        {/* Description Content */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: ({ node, ...props }) => (
                                        <h1 className="big-text-2 font-bold text-white mb-4 mt-8" {...props} />
                                    ),
                                    h2: ({ node, ...props }) => (
                                        <h2 className="big-text-3 font-bold text-white mb-3 mt-6" {...props} />
                                    ),
                                    h3: ({ node, ...props }) => (
                                        <h3 className="big-text-4 font-bold text-white mb-3 mt-4" {...props} />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p className="normal-text text-slate-200 mb-4 leading-relaxed" {...props} />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul className="list-none space-y-2 mb-4" {...props} />
                                    ),
                                    li: ({ node, ...props }) => (
                                        <li className="flex items-start gap-3 normal-text text-slate-200">
                                            <span className="text-accent-50 mt-1 shrink-0">•</span>
                                            <span {...props} />
                                        </li>
                                    ),
                                    strong: ({ node, ...props }) => (
                                        <strong className="text-white font-bold" {...props} />
                                    ),
                                    em: ({ node, ...props }) => (
                                        <em className="text-accent-50 not-italic" {...props} />
                                    ),
                                }}
                            >
                                {event.description}
                            </ReactMarkdown>
                        </div>

                        {/* Additional Event Details */}
                        {isRecurring && event.recurrence_info && (
                            <div className="p-6 bg-primary rounded-xl border border-accent">
                                <h3 className="big-text-4 font-bold text-white mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                    Recurring Event Schedule
                                </h3>
                                <div className="space-y-3 text-slate-200">
                                    <div className="flex items-center justify-between">
                                        <span className="normal-text-2">Frequency:</span>
                                        <span className="normal-text font-bold text-white capitalize">
                                            {event.recurrence_info.frequency}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="normal-text-2">Interval:</span>
                                        <span className="normal-text font-bold text-white">
                                            Every {event.recurrence_info.interval} {event.recurrence_info.frequency}(s)
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="normal-text-2">Total Occurrences:</span>
                                        <span className="normal-text font-bold text-white">
                                            {event.recurrence_info.total_occurrences} events
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="normal-text-2">Series Ends:</span>
                                        <span className="normal-text font-bold text-white">
                                            {new Date(event.recurrence_info.end_date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    {event.check_in_policy === 'daily_entry' && (
                                        <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/30">
                                            <p className="small-text text-accent-50 font-semibold">
                                                ✓ Your ticket grants daily entry to all occurrences of this recurring event
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Quick Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Date & Time Card */}
                        <div className="p-6 bg-primary rounded-xl border border-accent">
                            <h3 className="big-text-5 font-bold text-white mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                Date & Time
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="small-text text-slate-300 mb-1">Start</p>
                                    <p className="normal-text font-bold text-white">
                                        {new Date(event.start_date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <p className="normal-text-2 text-slate-200">
                                        {new Date(`2000-01-01T${event.start_time}`).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </p>
                                </div>
                                <div className="border-t border-accent/30 pt-3">
                                    <p className="small-text text-slate-300 mb-1">End</p>
                                    <p className="normal-text font-bold text-white">
                                        {new Date(event.end_date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <p className="normal-text-2 text-slate-200">
                                        {new Date(`2000-01-01T${event.end_time}`).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </p>
                                </div>
                                <div className="border-t border-accent/30 pt-3">
                                    <p className="small-text text-slate-300 mb-1">Timezone</p>
                                    <p className="normal-text-2 text-white font-semibold">
                                        {event.timezone}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="p-6 bg-primary rounded-xl border border-accent">
                            <h3 className="big-text-5 font-bold text-white mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                Location
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="normal-text font-bold text-white mb-1">
                                        {event.venue.name}
                                    </p>
                                    <p className="normal-text-2 text-slate-200">
                                        {event.venue.address}
                                    </p>
                                    <p className="normal-text-2 text-slate-200">
                                        {event.venue.city}, {event.venue.country}
                                    </p>
                                </div>
                                <Link
                                    href={event.venue.google_maps_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-2.5 px-4 bg-accent text-white text-center rounded-lg font-bold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                                >
                                    View on Google Maps
                                </Link>
                            </div>
                        </div>

                        {/* Category Card */}
                        <div className="p-6 bg-primary rounded-xl border border-accent">
                            <h3 className="big-text-5 font-bold text-white mb-3">
                                Category
                            </h3>
                            <Link
                                href={`/events?category=${event.category.slug}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-lg border border-accent hover:bg-accent/30 transition-all duration-300"
                            >
                                <span className="text-accent-50 font-bold normal-text">
                                    {event.category.name}
                                </span>
                            </Link>
                            <p className="normal-text-2 text-slate-300 mt-3">
                                {event.category.description}
                            </p>
                        </div>

                        {/* Capacity Card */}
                        <div className="p-6 bg-primary rounded-xl border border-accent">
                            <h3 className="big-text-5 font-bold text-white mb-4">
                                Capacity
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="normal-text-2 text-slate-300">Total Capacity</span>
                                    <span className="normal-text font-bold text-white">
                                        {event.max_attendees}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="normal-text-2 text-slate-300">Tickets Sold</span>
                                    <span className="normal-text font-bold text-accent-50">
                                        {event.tickets_sold}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="normal-text-2 text-slate-300">Available</span>
                                    <span className="normal-text font-bold text-white">
                                        {event.tickets_available}
                                    </span>
                                </div>
                                <div className="pt-3 border-t border-accent/30">
                                    <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-accent-50 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${(event.tickets_sold / event.max_attendees) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                    <p className="small-text text-slate-300 mt-2 text-center">
                                        {Math.round((event.tickets_sold / event.max_attendees) * 100)}% Full
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDescription;