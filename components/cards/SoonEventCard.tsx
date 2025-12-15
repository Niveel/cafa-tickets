"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {  MapPin, Users, Clock, TrendingUp } from 'lucide-react';

import { placeholderImage } from '@/data/constants';

interface SoonEventCardProps {
    event: {
        id: number;
        title: string;
        slug: string;
        featured_image: string;
        venue_name: string;
        venue_city: string;
        start_date: string;
        start_time: string;
        lowest_price: string;
        tickets_sold: number;
        total_tickets: number;
        category: {
            name: string;
        };
    };
}

const SoonEventCard = ({ event }: SoonEventCardProps) => {
    // Format date
    const formatDate = (dateString: string): { day: string; month: string } => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        return { day: day.toString(), month };
    };

    const { day, month } = formatDate(event.start_date);

    // Calculate days until event
    const getDaysUntil = (dateString: string): number => {
        const today = new Date();
        const eventDate = new Date(dateString);
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysUntil = getDaysUntil(event.start_date);

    // Calculate ticket percentage
    const ticketPercentage = Math.round((event.tickets_sold / event.total_tickets) * 100);
    const isAlmostSoldOut = ticketPercentage >= 80;

    return (
        <Link
            href={`/events/${event.slug}`}
            className="group block shrink-0 w-[320px] sm:w-[400px] lg:w-[480px]"
            aria-label={`View ${event.title} event on ${event.start_date} at ${event.venue_name}`}
        >
            <article className="relative h-[450px] sm:h-[520px] rounded-3xl overflow-hidden border-2 border-accent/30 transition-all duration-500 hover:border-accent hover:shadow-2xl">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={event.featured_image || placeholderImage}
                        alt={`${event.title} - ${event.category.name} event`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col p-6 sm:p-8">
                    {/* Top Section - Category & Days Badge */}
                    <div className="flex items-start justify-between mb-auto">
                        {/* Category Badge */}
                        <span className="px-4 py-2 bg-accent/90 backdrop-blur-sm text-white rounded-xl normal-text font-bold border border-accent">
                            {event.category.name}
                        </span>

                        {/* Days Until Badge */}
                        <div className="px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-xl border-2 border-accent/50">
                            <p className="small-text text-accent-50 font-bold text-center">
                                {daysUntil === 0 ? 'TODAY' : daysUntil === 1 ? 'TOMORROW' : `IN ${daysUntil} DAYS`}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section - Event Details */}
                    <div className="space-y-4">
                        {/* Almost Sold Out Warning */}
                        {isAlmostSoldOut && (
                            <div 
                                className="flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm border border-accent/50 rounded-xl"
                                role="alert"
                            >
                                <TrendingUp className="w-4 h-4 text-accent-50 shrink-0" aria-hidden="true" />
                                <span className="small-text text-white font-bold">
                                    {ticketPercentage}% Sold Out - Book Now!
                                </span>
                            </div>
                        )}

                        {/* Date Display - Large */}
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent/90 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-accent shrink-0">
                                <span className="text-2xl sm:text-3xl font-bold text-white leading-none">
                                    {day}
                                </span>
                                <span className="small-text text-white font-bold uppercase">
                                    {month}
                                </span>
                            </div>

                            {/* Event Title */}
                            <div className="flex-1">
                                <h3 className="big-text-2 sm:big-text-1 font-bold text-white mb-2 leading-tight line-clamp-2 group-hover:text-accent-50 transition-colors duration-300">
                                    {event.title}
                                </h3>
                            </div>
                        </div>

                        {/* Event Meta Information */}
                        <div className="space-y-2">
                            {/* Venue & Location */}
                            <div className="flex items-center gap-2 text-slate-100">
                                <MapPin className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                                <span className="normal-text font-medium">
                                    {event.venue_name}, {event.venue_city}
                                </span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-2 text-slate-100">
                                <Clock className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                                <span className="normal-text font-medium">
                                    {event.start_time.slice(0, 5)}
                                </span>
                            </div>

                            {/* Tickets Available */}
                            <div className="flex items-center gap-2 text-slate-100">
                                <Users className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                                <span className="normal-text font-medium">
                                    {event.total_tickets - event.tickets_sold} tickets left
                                </span>
                            </div>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-accent/30">
                            <div>
                                <p className="small-text text-slate-300 mb-1">Starting from</p>
                                <p className="big-text-3 font-bold text-white">
                                    GHS {parseFloat(event.lowest_price).toFixed(0)}
                                </p>
                            </div>
                            <div className="px-6 py-3 bg-accent text-white rounded-xl font-bold normal-text group-hover:bg-accent-100 transition-all duration-300 group-hover:scale-105 flex items-center gap-2">
                                Book Now
                                <span 
                                    className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div 
                    className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-500 pointer-events-none"
                    aria-hidden="true"
                ></div>
            </article>
        </Link>
    );
};

export default SoonEventCard;