"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { MyEvent } from '@/types/dash-events.types';
import { Calendar, MapPin, Users, ChevronRight, Search, X, Loader2 } from 'lucide-react';

import { placeholderImage } from '@/data/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { sanitizeImgUrl } from '@/utils/functions';

type Props = {
    events: MyEvent[];
    onSelectEvent: (eventId: number) => void;
    hasMore?: boolean;
    isLoading?: boolean;
    onLoadMore?: () => void;
};

const EventSelector = ({ events, onSelectEvent, hasMore = false, isLoading = false, onLoadMore }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 300);

    const formatDate = (date: string, time: string) => {
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleDateString('en-GH', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter events based on debounced search query
    const filteredEvents = useMemo(() => {
        if (!debouncedQuery.trim()) return events;

        const query = debouncedQuery.toLowerCase();
        return events.filter(event => 
            event.title.toLowerCase().includes(query) ||
            event.venue_name.toLowerCase().includes(query) ||
            event.venue_city.toLowerCase().includes(query) ||
            event.category.name.toLowerCase().includes(query)
        );
    }, [events, debouncedQuery]);

    const clearSearch = () => {
        setSearchQuery('');
    };

    // Infinite scroll sentinel
    const sentinelRef = useInfiniteScroll(
        () => {
            if (onLoadMore && !debouncedQuery) {
                onLoadMore();
            }
        },
        { hasMore, isLoading, threshold: 200 }
    );

    if (events.length === 0 && !isLoading) {
        return (
            <div className="text-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-slate-500/20 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-slate-400" aria-hidden="true" />
                </div>
                <h2 className="big-text-2 font-bold text-white mb-3">
                    No Upcoming Events
                </h2>
                <p className="normal-text text-slate-400 max-w-md mx-auto">
                    You don&apos;t have any upcoming or ongoing events to check in attendees for.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <h2 className="big-text-3 font-bold text-white">
                    Select Event to Check In
                </h2>
                <p className="normal-text-2 text-slate-400">
                    {filteredEvents.length} of {events.length} event{events.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by event name, venue, or category..."
                    className="w-full h-12 pl-12 pr-12 bg-primary-100 border-2 border-accent/30 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-accent transition-colors normal-text"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4 text-white" aria-hidden="true" />
                    </button>
                )}
            </div>

            {/* No Results */}
            {filteredEvents.length === 0 && !isLoading && (
                <div className="text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-full bg-slate-500/20 flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-400" aria-hidden="true" />
                    </div>
                    <h3 className="big-text-4 font-bold text-white mb-2">
                        No Events Found
                    </h3>
                    <p className="normal-text text-slate-400 mb-4">
                        No events match &quot;{searchQuery}&quot;
                    </p>
                    <button
                        onClick={clearSearch}
                        className="px-4 py-2 bg-accent hover:bg-accent-100 text-white rounded-lg font-semibold small-text transition-colors"
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {/* Events Grid */}
            {filteredEvents.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredEvents.map((event) => (
                        <button
                            key={event.id}
                            onClick={() => onSelectEvent(event.id)}
                            className="group bg-primary rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300 overflow-hidden text-left"
                        >
                            {/* Event Image */}
                            <div className="relative h-40 bg-primary-200">
                                <Image
                                    src={sanitizeImgUrl(event.featured_image) || placeholderImage}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/50 to-transparent"></div>
                                
                                {/* Status Badge */}
                                <div className="absolute top-3 right-3">
                                    <span className={`px-3 py-1 rounded-lg font-semibold small-text ${
                                        event.status === 'ongoing'
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    }`}>
                                        {event.status === 'ongoing' ? 'Ongoing' : 'Upcoming'}
                                    </span>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm text-white rounded-lg small-text font-semibold border border-accent/30">
                                        {event.category.name}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="big-text-4 font-bold text-white mb-3 group-hover:text-accent-50 transition-colors">
                                    {event.title}
                                </h3>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                                        <span className="small-text">
                                            {formatDate(event.start_date, event.start_time)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-400">
                                        <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                                        <span className="small-text">
                                            {event.venue_name}, {event.venue_city}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                                        <span className="small-text">
                                            {event.analytics.tickets_checked_in} / {event.analytics.tickets_sold} checked in
                                        </span>
                                    </div>
                                </div>

                                {/* Check-in Progress */}
                                <div className="mt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="small-text text-slate-400">Check-in Progress</span>
                                        <span className="small-text font-semibold text-white">
                                            {event.analytics.tickets_sold > 0 
                                                ? ((event.analytics.tickets_checked_in / event.analytics.tickets_sold) * 100).toFixed(1)
                                                : 0}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                                            style={{ 
                                                width: `${event.analytics.tickets_sold > 0 
                                                    ? (event.analytics.tickets_checked_in / event.analytics.tickets_sold) * 100 
                                                    : 0}%` 
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Select Button */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-accent/30">
                                    <span className="normal-text-2 font-semibold text-accent-50 group-hover:text-accent transition-colors">
                                        Start Check-in
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-accent-50 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" aria-hidden="true" />
                    <span className="ml-3 normal-text text-slate-400">Loading more events...</span>
                </div>
            )}

            {/* Infinite Scroll Sentinel - Hidden div that triggers load more */}
            {!debouncedQuery && hasMore && !isLoading && (
                <div ref={sentinelRef} className="h-4" aria-hidden="true" />
            )}

            {/* End of Results */}
            {!hasMore && events.length > 0 && !debouncedQuery && (
                <div className="text-center py-6">
                    <p className="small-text text-slate-500">
                        You&apos;ve reached the end of the list
                    </p>
                </div>
            )}
        </div>
    );
};

export default EventSelector;