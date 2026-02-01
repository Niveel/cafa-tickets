"use client";

import React, { useState } from 'react';
import { FileText, Calendar, MapPin, Users, Repeat, CheckCircle, Eye, EyeOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { EventInfo } from '@/types/dash-events.types';

type Props = {
    event: EventInfo;
};

const EventInfoSection = ({ event }: Props) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const formatDateTime = (date: string, time: string) => {
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleString('en-GH', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCheckInPolicyLabel = (policy: string) => {
        const labels = {
            single_entry: 'Single Entry',
            multiple_entry: 'Multiple Entry',
            daily_entry: 'Daily Entry'
        };
        return labels[policy as keyof typeof labels] || policy;
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <h2 className="big-text-2 font-bold text-white">
                    Event Information
                </h2>
                <div className="flex items-center gap-2">
                    {event.is_published ? (
                        <Eye className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                    ) : (
                        <EyeOff className="w-5 h-5 text-slate-400" aria-hidden="true" />
                    )}
                    <span className={`px-3 py-1 rounded-lg font-semibold small-text ${
                        event.is_published 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-slate-500/20 text-slate-400'
                    }`}>
                        {event.is_published ? 'Published' : 'Unpublished'}
                    </span>
                </div>
            </div>

            {/* Short Description */}
            <div className="p-5 bg-primary rounded-xl border-2 border-accent/30">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                        <h3 className="big-text-4 font-bold text-white mb-2">
                            About This Event
                        </h3>
                        <p className="normal-text text-slate-300">
                            {event.short_description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Full Description */}
            <div className="p-5 bg-primary rounded-xl border-2 border-accent/30">
                <h3 className="big-text-4 font-bold text-white mb-4">
                    Full Description
                </h3>
                <div className={`normal-text text-slate-300 ${
                    !showFullDescription ? 'line-clamp-6' : ''
                }`}>
                    <ReactMarkdown>
                        {event.description}
                    </ReactMarkdown>
                </div>
                <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-4 text-accent-50 hover:text-accent-100 font-semibold small-text transition-colors"
                >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date & Time */}
                <div className="p-5 bg-primary rounded-xl border-2 border-accent/30">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                            <Calendar className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h3 className="big-text-5 font-bold text-white mb-3">
                                Date & Time
                            </h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="small-text text-slate-400">Starts</p>
                                    <p className="normal-text-2 font-semibold text-white">
                                        {formatDateTime(event.start_date, event.start_time)}
                                    </p>
                                </div>
                                <div>
                                    <p className="small-text text-slate-400">Ends</p>
                                    <p className="normal-text-2 font-semibold text-white">
                                        {formatDateTime(event.end_date, event.end_time)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Venue */}
                <div className="p-5 bg-primary rounded-xl border-2 border-accent/30">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-purple-400" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h3 className="big-text-5 font-bold text-white mb-3">
                                Venue
                            </h3>
                            <div className="space-y-1">
                                <p className="normal-text-2 font-semibold text-white">
                                    {event.venue_name}
                                </p>
                                <p className="small-text text-slate-400">
                                    {event.venue_address}
                                </p>
                                <p className="small-text text-slate-400">
                                    {event.venue_city}, {event.venue_country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Capacity */}
                <div className="p-5 bg-primary rounded-xl border-2 border-accent/30">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-pink-400" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h3 className="big-text-5 font-bold text-white mb-3">
                                Capacity
                            </h3>
                            <p className="big-text-3 font-bold text-white">
                                {event.max_attendees.toLocaleString()}
                            </p>
                            <p className="small-text text-slate-400">
                                Maximum attendees
                            </p>
                        </div>
                    </div>
                </div>

                {/* Event Type & Policy */}
                <div className="p-5 bg-primary rounded-xl border-2 border-accent/30">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                            {event.is_recurring ? (
                                <Repeat className="w-5 h-5 text-amber-400" aria-hidden="true" />
                            ) : (
                                <CheckCircle className="w-5 h-5 text-amber-400" aria-hidden="true" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="big-text-5 font-bold text-white mb-3">
                                Event Type
                            </h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="small-text text-slate-400">Type</p>
                                    <p className="normal-text-2 font-semibold text-white">
                                        {event.is_recurring ? 'Recurring Event' : 'One-time Event'}
                                    </p>
                                </div>
                                <div>
                                    <p className="small-text text-slate-400">Check-in Policy</p>
                                    <p className="normal-text-2 font-semibold text-white">
                                        {getCheckInPolicyLabel(event.check_in_policy)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventInfoSection;