"use client";

import React from 'react';
import { Search, Calendar, MapPin, Sparkles } from 'lucide-react';

interface EventsHeroProps {
    totalEvents: number;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSearchSubmit: () => void;
}

const EventsHero = ({ totalEvents, searchQuery, onSearchChange, onSearchSubmit }: EventsHeroProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchSubmit();
    };

    return (
        <section className="relative bg-primary pt-24 sm:pt-28 pb-8 sm:pb-12">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-50 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="inner-wrapper relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-xl border border-accent mb-4">
                        <Sparkles className="w-4 h-4 text-accent-50" aria-hidden="true" />
                        <span className="small-text text-accent-50 font-bold">
                            Discover Events
                        </span>
                    </div>
                    <h1 className="massive-text font-bold text-white mb-4">
                        Explore Amazing Events
                    </h1>
                    <p className="big-text-5 text-slate-200 max-w-2xl mx-auto">
                        Find the perfect event for you. From concerts to conferences, discover unforgettable experiences.
                    </p>

                </div>

                {/* Search Bar */}
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-8">
                    <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Search className="w-6 h-6 text-accent-50" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search events by name, venue, city..."
                            className="w-full h-16 pl-16 pr-6 bg-primary-100 border-2 border-accent text-white placeholder:text-slate-400 rounded-2xl big-text-5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                            aria-label="Search events"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-accent text-white rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent">
                            <Calendar className="w-6 h-6 text-accent-50" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="big-text-4 font-bold text-white">
                                {totalEvents}+
                            </p>
                            <p className="small-text text-slate-300">
                                Events Available
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsHero;