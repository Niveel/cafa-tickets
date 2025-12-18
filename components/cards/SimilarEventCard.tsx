"use client";

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { SimilarEvent } from '@/types/events.types';
import { placeholderImage } from '@/data/constants';

interface SimilarEventCardProps {
    event: SimilarEvent;
}

const SimilarEventCard = ({ event }: SimilarEventCardProps) => {
    // Format date
    const formatDate = (dateString: string): { day: string; month: string } => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        return { day: day.toString(), month };
    };

    const { day, month } = formatDate(event.start_date);

    return (
        <Link
            href={`/events/${event.slug}`}
            className="group block"
            aria-label={`View ${event.title} event`}
        >
            <article className="relative bg-primary-100 rounded-xl overflow-hidden border-2 border-accent/20 hover:border-accent transition-all duration-500 hover:shadow-2xl hover:scale-105">
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                        src={event.featured_image || placeholderImage}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent"></div>

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4">
                        <div className="w-14 h-14 rounded-xl bg-accent/95 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-accent shadow-xl">
                            <span className="text-xs font-bold text-white/80 uppercase leading-none">
                                {month}
                            </span>
                            <span className="text-xl font-bold text-white leading-none mt-0.5">
                                {day}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                    {/* Title */}
                    <h3 className="big-text-5 font-bold text-white line-clamp-2 leading-tight group-hover:text-accent-50 transition-colors duration-300">
                        {event.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-slate-200">
                        <MapPin className="w-4 h-4 text-accent-50 shrink-0" aria-hidden="true" />
                        <span className="normal-text-2 font-medium">
                            {event.venue_city}
                        </span>
                    </div>

                    {/* Price & Arrow */}
                    <div className="flex items-center justify-between pt-3 border-t border-accent">
                        <div>
                            <p className="small-text text-slate-300 mb-0.5">From</p>
                            <p className="big-text-5 font-bold text-white">
                                GHS {parseFloat(event.lowest_price).toFixed(0)}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:bg-accent-100 transition-all duration-300 group-hover:scale-110">
                            <ArrowRight className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-500 pointer-events-none rounded-xl"></div>
            </article>
        </Link>
    );
};

export default SimilarEventCard;