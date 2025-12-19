"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EventCard } from '@/components';
import { Event } from '@/types/events.types';

type HomeEventsProps = {
    events: Event[];
};

const HomeEvents = ({ events }: HomeEventsProps) => {
    // Get first 18 events (both upcoming and ongoing)
    const displayEvents = events.slice(0, 18);

    return (
        <section 
            className="relative py-12 sm:py-16 lg:py-20 bg-primary"
            aria-label="Explore events"
        >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            </div>

            <div className="inner-wrapper relative z-10">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="massive-text font-bold text-white">
                                Explore Events
                            </h2>
                        </div>
                        <p className="big-text-5 text-slate-200 max-w-2xl">
                            Discover the most exciting events happening across Ghana. From concerts to conferences, find your next experience.
                        </p>
                    </div>

                    {/* Browse All Button - Desktop */}
                    <Link
                        href="/events"
                        className="hidden lg:flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all duration-300 hover:scale-105 group shrink-0 border-2 border-accent"
                        aria-label="Browse all events"
                    >
                        Browse All Events
                        <ArrowRight 
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                            aria-hidden="true"
                        />
                    </Link>
                </div>

                {/* Events Grid */}
                <div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    role="list"
                    aria-label="Event list"
                >
                    {displayEvents.map((event, index) => (
                        <div
                            key={event.id}
                            role="listitem"
                            style={{
                                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                            }}
                        >
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>

                {/* Browse All Button - Mobile */}
                <div className="flex justify-center mt-10 lg:hidden">
                    <Link
                        href="/events"
                        className="flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all duration-300 hover:scale-105 group border-2 border-accent w-full sm:w-auto justify-center"
                        aria-label="Browse all events"
                    >
                        Browse All Events
                        <ArrowRight 
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>

            {/* Animation Keyframes */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default HomeEvents;