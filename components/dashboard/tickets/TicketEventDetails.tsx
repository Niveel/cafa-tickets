import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';

import { TicketEventDetails as EventDetailsType, TicketTypeDetails } from '@/types/tickets.types';
import { placeholderImage, placeholderPic } from '@/data/constants';
import { sanitizeImgUrl } from '@/utils/functions';

type Props = {
    event: EventDetailsType;
    ticketType: TicketTypeDetails;
};

const TicketEventDetails = ({ event, ticketType }: Props) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-GH', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (time: string) => {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-GH', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 overflow-hidden">
            {/* Event Image */}
            <div className="relative h-64 bg-primary-200">
                <Image
                    src={sanitizeImgUrl(event.featured_image) || placeholderImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-primary/80 backdrop-blur-sm text-white rounded-lg normal-text-2 font-semibold border border-accent/30">
                        {event.category.name}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Event Title */}
                <div>
                    <Link 
                        href={`/events/${event.slug}`}
                        className="big-text-2 font-bold text-white hover:text-accent-50 transition-colors"
                    >
                        {event.title}
                    </Link>
                    <p className="normal-text text-slate-300 mt-2">
                        {event.description}
                    </p>
                </div>

                {/* Ticket Type */}
                <div className="p-4 bg-primary-200 rounded-lg border border-accent/30">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                            <Tag className="w-5 h-5 text-purple-400" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <p className="small-text text-slate-400 mb-1">Ticket Type</p>
                            <p className="big-text-4 font-bold text-white mb-1">
                                {ticketType.name}
                            </p>
                            <p className="small-text text-slate-300">
                                {ticketType.description}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="big-text-3 font-bold text-emerald-400">
                                GH₵ {parseFloat(ticketType.price).toLocaleString('en-GH')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="flex items-start gap-3 p-4 bg-primary-200 rounded-lg">
                        <Calendar className="w-5 h-5 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400 mb-1">Start Date</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {formatDate(event.start_date)}
                            </p>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3 p-4 bg-primary-200 rounded-lg">
                        <Clock className="w-5 h-5 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400 mb-1">Start Time</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {formatTime(event.start_time)}
                            </p>
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="flex items-start gap-3 p-4 bg-primary-200 rounded-lg">
                        <Calendar className="w-5 h-5 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400 mb-1">End Date</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {formatDate(event.end_date)}
                            </p>
                        </div>
                    </div>

                    {/* End Time */}
                    <div className="flex items-start gap-3 p-4 bg-primary-200 rounded-lg">
                        <Clock className="w-5 h-5 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400 mb-1">End Time</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {formatTime(event.end_time)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Venue */}
                <div className="p-4 bg-primary-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="small-text text-slate-400 mb-1">Venue</p>
                            <p className="big-text-5 font-bold text-white mb-1">
                                {event.venue_name}
                            </p>
                            <p className="small-text text-slate-300">
                                {event.venue_address}
                            </p>
                            <p className="small-text text-slate-300">
                                {event.venue_city}, {event.venue_country}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Organizer */}
                <div className="p-4 bg-primary-200 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <Image
                                src={event.organizer.profile_image || placeholderPic}
                                alt={event.organizer.full_name}
                                fill
                                className="object-cover bg-white"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="small-text text-slate-400 mb-1">Organized by</p>
                            <p className="normal-text-2 font-bold text-white">
                                {event.organizer.full_name}
                            </p>
                            <p className="small-text text-slate-400">
                                @{event.organizer.username}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketEventDetails;