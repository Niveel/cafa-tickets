"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';

import { Event } from '@/types/events.types';
import { placeholderImage, placeholderPic } from '@/data/constants';

interface EventCardProps {
    event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
    // Check if event is currently ongoing
    const isOngoing = event.status === 'ongoing';

    // Format date
    const formatDate = (dateString: string): { day: string; month: string; weekday: string } => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
        return { day: day.toString(), month, weekday };
    };

    const { day, month, weekday } = formatDate(event.start_date);

    // Calculate ticket percentage
    const ticketPercentage = Math.round((event.tickets_sold / event.total_tickets) * 100);
    const isTrending = ticketPercentage >= 60;

    // Format price range
    const formatPrice = (price: string): string => {
        return parseFloat(price).toFixed(0);
    };

    const showPriceRange = event.lowest_price !== event.highest_price;

    return (
        <article className="group relative bg-primary-100 rounded-2xl overflow-hidden border-2 border-accent/20 hover:border-accent transition-all duration-500 hover:shadow-2xl">
            {/* Image Container */}
            <Link
                href={`/events/${event.slug}`}
                className="relative block aspect-4/3 overflow-hidden"
                aria-label={`View ${event.title} event details`}
            >
                <Image
                    src={event.featured_image || placeholderImage}
                    alt={`${event.title} - ${event.category.name} event in ${event.venue_city}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    {/* Category Badge */}
                    <span className="px-3 py-1.5 bg-accent/90 backdrop-blur-sm text-white rounded-lg small-text font-bold border border-accent">
                        {event.category.name}
                    </span>

                    <div className="flex flex-col gap-2">
                        {/* Live Now Badge - For Ongoing Events */}
                        {isOngoing && (
                            <div
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/95 backdrop-blur-sm rounded-lg border-2 border-accent animate-pulse"
                                role="status"
                                aria-label="Event is currently ongoing"
                            >
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                <span className="small-text text-white font-bold">LIVE NOW</span>
                            </div>
                        )}

                        {/* Trending Badge */}
                        {isTrending && !isOngoing && (
                            <div
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-lg border border-accent"
                                role="status"
                                aria-label="Trending event"
                            >
                                <TrendingUp className="w-3.5 h-3.5 text-accent-50" aria-hidden="true" />
                                <span className="small-text text-accent-50 font-bold">Trending</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Date Badge */}
                <div className="absolute bottom-4 left-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/95 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-accent shadow-xl">
                        <span className="text-xs font-bold text-white/80 uppercase leading-none">
                            {month}
                        </span>
                        <span className="text-xl font-bold text-white leading-none mt-0.5">
                            {day}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Event Title */}
                <Link
                    href={`/events/${event.slug}`}
                    className="block"
                >
                    <h3 className="big-text-4 font-bold text-white line-clamp-2 group-hover:text-accent-50 transition-colors duration-300 leading-tight">
                        {event.title}
                    </h3>
                </Link>

                {/* Event Meta */}
                <div className="space-y-2">
                    {/* Date & Time */}
                    <div className="flex items-center gap-2 text-slate-200">
                        <Calendar className="w-4 h-4 text-accent-50 shrink-0" aria-hidden="true" />
                        <span className="normal-text-2 font-medium">
                            {weekday}, {month} {day} • {new Date(`2000-01-01T${event.start_time}`).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-slate-200">
                        <MapPin className="w-4 h-4 text-accent-50 shrink-0" aria-hidden="true" />
                        <span className="normal-text-2 font-medium line-clamp-1">
                            {event.venue_name}, {event.venue_city}
                        </span>
                    </div>
                </div>

                {/* Organizer Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-accent">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-accent shrink-0">
                        <Image
                            src={event.organizer.profile_image || placeholderPic}
                            alt={event.organizer.full_name}
                            fill
                            className="object-cover bg-white"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="small-text text-slate-300 leading-tight">
                            Organized by
                        </p>
                        <p className="normal-text-2 text-white font-semibold truncate">
                            {event.organizer.full_name || "@" + event.organizer.username}
                        </p>
                    </div>
                </div>

                {/* Price & Tickets */}
                <div className="flex items-center justify-between pt-3 border-t border-accent">
                    {/* Price */}
                    <div>
                        <p className="small-text text-slate-300 mb-0.5">
                            {showPriceRange ? 'From' : 'Price'}
                        </p>
                        <p className="big-text-5 font-bold text-white">
                            GHS {formatPrice(event.lowest_price)}
                            {showPriceRange && (
                                <span className="normal-text-2 text-slate-300 font-normal">
                                    {' '}- {formatPrice(event.highest_price)}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Tickets Status */}
                    <div className="text-right">
                        <p className="small-text text-slate-300 mb-0.5">Available</p>
                        <p className="normal-text-2 font-bold text-accent-50">
                            {event.tickets_available} left
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <Link
                    href={`/events/${event.slug}`}
                    className="block w-full py-3 px-4 bg-accent text-white text-center rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                    View Details
                </Link>
            </div>

            {/* Hover Glow Effect */}
            <div
                className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-500 pointer-events-none rounded-2xl"
                aria-hidden="true"
            ></div>
        </article>
    );
};

export default EventCard;