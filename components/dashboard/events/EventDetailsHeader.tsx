import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Edit, Users, Eye } from 'lucide-react';
import { MyEventsResponse } from '@/types/dash-events.types';

type Event = MyEventsResponse['results'][0];

type Props = {
    event: Event;
};

const EventDetailsHeader = ({ event }: Props) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'ongoing':
                return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'past':
                return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
            default:
                return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div role="region" aria-label="Event header" className="bg-primary rounded-xl border-2 border-accent/30 overflow-hidden">
            {/* Event Image */}
            <div className="relative h-64 md:h-96 overflow-hidden">
                <Image
                    src={event.featured_image}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
                
                {/* Status & Published Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-lg font-semibold small-text border capitalize ${getStatusBadge(event.status)}`}>
                        {event.status}
                    </span>
                    {!event.is_published && (
                        <span className="px-3 py-1 rounded-lg font-semibold small-text border bg-amber-500/20 text-amber-400 border-amber-500/30">
                            Unpublished
                        </span>
                    )}
                    {event.is_recurring && (
                        <span className="px-3 py-1 rounded-lg font-semibold small-text border bg-purple-500/20 text-purple-400 border-purple-500/30">
                            Recurring
                        </span>
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/50 to-transparent"></div>

                {/* Event Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="small-text text-accent-50 font-semibold mb-2">
                        {event.category.name}
                    </p>
                    <h1 className="big-text-1 font-bold text-white mb-4">
                        {event.title}
                    </h1>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-slate-300" aria-hidden="true" />
                            <p className="big-text-5 text-slate-200">
                                {formatDate(event.start_date)}
                                {event.start_date !== event.end_date && ` - ${formatDate(event.end_date)}`}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-slate-300" aria-hidden="true" />
                            <p className="big-text-5 text-slate-200">
                                {event.venue_name}, {event.venue_city}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-accent/30">
                <div className="flex flex-wrap gap-3">
                    <Link
                        href={`/dashboard/events/${event.slug}/edit`}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold normal-text-2 hover:bg-blue-600 transition-all duration-300"
                    >
                        <Edit className="w-4 h-4" aria-hidden="true" />
                        Edit Event
                    </Link>

                    <Link
                        href={`/dashboard/events/${event.slug}/attendees`}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold normal-text-2 hover:bg-purple-600 transition-all duration-300"
                    >
                        <Users className="w-4 h-4" aria-hidden="true" />
                        View Attendees ({event.analytics.tickets_sold})
                    </Link>

                    <Link
                        href={`/events/${event.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-primary-200 text-white rounded-xl font-semibold normal-text-2 hover:bg-primary transition-all duration-300 border-2 border-accent/30 hover:border-accent"
                    >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                        View Public Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsHeader;