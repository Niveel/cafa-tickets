import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Ticket, DollarSign, CheckCircle } from 'lucide-react';
import { AttendedEventsResponse } from '@/types/dash-events.types';
import { placeholderImage } from '@/data/constants';

type AttendedEvent = AttendedEventsResponse['results'][0];

type Props = {
    attendedEvent: AttendedEvent;
};

const AttendedEventCard = ({ attendedEvent }: Props) => {
    const { event, ticket_id, ticket_type, attended_date, amount_paid } = attendedEvent;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300 overflow-hidden">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={event.featured_image || placeholderImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
                
                {/* Attended Badge */}
                <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-lg font-semibold small-text border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        <CheckCircle className="w-4 h-4" aria-hidden="true" />
                        Attended
                    </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-2">
                {/* Category */}
                <p className="small-text text-accent-50 font-semibold mb-2">
                    {event.category}
                </p>

                {/* Title */}
                <h3 className="big-text-4 font-bold text-white mb-2 line-clamp-2">
                    {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-1 mb-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" aria-hidden="true" />
                        <p className="normal-text-2 text-slate-300">
                            {formatDate(event.event_date)}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" aria-hidden="true" />
                        <p className="normal-text-2 text-slate-300">
                            {event.venue_name}
                        </p>
                    </div>
                </div>

                {/* Ticket Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="p-2 bg-primary-200 rounded-lg border border-accent/20">
                        <div className="flex items-center gap-2 mb-1">
                            <Ticket className="w-4 h-4 text-blue-400" aria-hidden="true" />
                            <p className="small-text text-slate-400">Ticket Type</p>
                        </div>
                        <p className="normal-text-2 font-semibold text-white">
                            {ticket_type}
                        </p>
                    </div>

                    <div className="p-2 bg-primary-200 rounded-lg border border-accent/20">
                        <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                            <p className="small-text text-slate-400">Amount Paid</p>
                        </div>
                        <p className="normal-text-2 font-semibold text-emerald-400">
                            GH₵ {parseFloat(amount_paid).toLocaleString('en-GH')}
                        </p>
                    </div>
                </div>

                {/* Attended Info */}
                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="small-text text-slate-400 mb-1">Attended On</p>
                            <p className="normal-text-2 font-semibold text-emerald-400">
                                {formatDateTime(attended_date)}
                            </p>
                        </div>
                        <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    </div>
                </div>

                {/* Ticket ID */}
                <div className="mt-2 pt-2 border-t border-accent">
                    <p className="small-text text-slate-400">Ticket ID</p>
                    <p className="normal-text-2 font-mono text-slate-300">
                        {ticket_id}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AttendedEventCard;