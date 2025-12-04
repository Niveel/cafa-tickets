"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, MapPin, TrendingUp, Users, Sparkles } from 'lucide-react';
import { AppButton } from '@/components';
import { cities } from '@/data/static.general';
import { events } from '@/data/dummy.events';

const Landing = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    // Get live or upcoming event for hero card
    const heroEvent = useMemo(() => {
        const now = new Date();
        
        // Check for live events (current date/time between start and end)
        const liveEvent = events.find(event => {
            const eventStart = new Date(`${event.start_date}T${event.start_time}`);
            const eventEnd = new Date(`${event.end_date}T${event.end_time}`);
            return now >= eventStart && now <= eventEnd && event.status === 'upcoming';
        });

        if (liveEvent) {
            return { event: liveEvent, isLive: true };
        }

        // Get first upcoming event
        const upcomingEvent = events.find(event => event.status === 'upcoming');
        return upcomingEvent ? { event: upcomingEvent, isLive: false } : null;
    }, []);

    // Get 2 additional upcoming events (excluding hero event)
    const sideEvents = useMemo(() => {
        const heroEventId = heroEvent?.event.id;
        return events
            .filter(event => event.status === 'upcoming' && event.id !== heroEventId)
            .slice(0, 2);
    }, [heroEvent]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (selectedCity) params.append('city', selectedCity);
        
        window.location.href = `/events?${params.toString()}`;
    };

    return (
        <div className="relative min-h-screen bg-primary overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-50 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-100 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Dot Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle, #DC0000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
                aria-hidden="true"
            ></div>

            {/* Content Container */}
            <div className="relative z-10 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-white space-y-8">
                            {/* Main Headline */}
                            <div>
                                <h1 className="massive-text font-bold leading-tight mb-4">
                                    Discover & Book
                                    <span className="block text-accent-50">
                                        Amazing Events
                                    </span>
                                </h1>
                                <p className="big-text-5 text-slate-200 leading-relaxed max-w-xl">
                                    From electrifying concerts to inspiring conferences, find and book tickets to Ghana&apos;s hottest events. 
                                    Your next unforgettable experience starts here.
                                </p>
                            </div>

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="bg-white rounded-2xl p-2 shadow-2xl max-w-2xl">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                                        <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search events, artists, venues..."
                                            className="w-full bg-transparent outline-none normal-text text-slate-900 placeholder:text-slate-400"
                                            aria-label="Search events, artists, or venues"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl shrink-0">
                                            <MapPin className="w-5 h-5 text-slate-400" aria-hidden="true" />
                                            <select 
                                                value={selectedCity}
                                                onChange={(e) => setSelectedCity(e.target.value)}
                                                className="bg-transparent outline-none normal-text text-slate-900 cursor-pointer"
                                                aria-label="Filter by city"
                                            >
                                                <option value="">All Cities</option>
                                                {cities.map((city) => (
                                                    <option key={city} value={city}>
                                                        {city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-8 py-3.5 bg-linear-to-r from-accent to-accent-100 text-white font-semibold rounded-xl hover:from-accent-100 hover:to-accent transition-all duration-300 hover:scale-105 hover:shadow-2xl shrink-0 normal-text"
                                            aria-label="Search for events"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-8 pt-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                        <p className="big-text-3 font-bold text-white">5,000+</p>
                                    </div>
                                    <p className="normal-text-2 text-slate-300">Events Listed</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                        <p className="big-text-3 font-bold text-white">50K+</p>
                                    </div>
                                    <p className="normal-text-2 text-slate-300">Happy Attendees</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingUp className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                        <p className="big-text-3 font-bold text-white">200+</p>
                                    </div>
                                    <p className="normal-text-2 text-slate-300">Event Organizers</p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <AppButton
                                    title="Browse Events"
                                    url="/events"
                                    variant="primary"
                                    size="lg"
                                    icon={<Calendar className="w-5 h-5" />}
                                    iconPosition="left"
                                />
                                <AppButton
                                    title="Create Event"
                                    url="/events/create"
                                    variant="outline"
                                    size="lg"
                                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary"
                                />
                            </div>
                        </div>

                        {/* Right Content - Event Cards Grid */}
                        <div className="relative hidden lg:block">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" aria-hidden="true"></div>
                            
                            {/* Floating Event Cards */}
                            <div className="relative grid grid-cols-2 gap-4">
                                {heroEvent ? (
                                    <>
                                        {/* Hero Event Card - Large */}
                                        <Link
                                            href={`/events/${heroEvent.event.slug}`}
                                            className="col-span-2 group cursor-pointer"
                                            aria-label={`View ${heroEvent.event.title} event details in ${heroEvent.event.venue_city}`}
                                        >
                                            <article className="relative h-64 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:border-accent">
                                                <Image
                                                    src={heroEvent.event.featured_image}
                                                    alt={`${heroEvent.event.title} - ${heroEvent.event.category.name} event at ${heroEvent.event.venue_name}`}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <div 
                                                        className="inline-flex items-center gap-2 px-3 py-1 bg-accent rounded-full mb-3"
                                                        role="status"
                                                        aria-live="polite"
                                                    >
                                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true"></span>
                                                        <span className="small-text font-bold text-white">
                                                            {heroEvent.isLive ? 'LIVE NOW' : 'COMING SOON'}
                                                        </span>
                                                    </div>
                                                    <h2 className="big-text-4 font-bold text-white mb-2">
                                                        {heroEvent.event.title}
                                                    </h2>
                                                    <div className="flex items-center gap-4 text-slate-200">
                                                        <time 
                                                            className="flex items-center gap-1 normal-text-2"
                                                            dateTime={heroEvent.event.start_date}
                                                        >
                                                            <Calendar className="w-4 h-4" aria-hidden="true" />
                                                            {new Date(heroEvent.event.start_date).toLocaleDateString('en-GB', { 
                                                                month: 'short', 
                                                                day: 'numeric' 
                                                            })}
                                                        </time>
                                                        <span className="flex items-center gap-1 normal-text-2">
                                                            <MapPin className="w-4 h-4" aria-hidden="true" />
                                                            {heroEvent.event.venue_city}
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>

                                        {/* Side Event Cards - Small */}
                                        {sideEvents.length > 0 ? sideEvents.map((event) => (
                                            <Link
                                                key={event.id}
                                                href={`/events/${event.slug}`}
                                                className="group cursor-pointer"
                                                aria-label={`View ${event.title} - Starting at ${event.lowest_price} Ghana Cedis`}
                                            >
                                                <article className="relative h-48 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-xl transform transition-all duration-500 hover:scale-105 hover:border-accent">
                                                    <Image
                                                        src={event.featured_image}
                                                        alt={`${event.title} - ${event.category.name} event in ${event.venue_city}`}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-transparent"></div>
                                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                                        <span 
                                                            className="inline-block px-2 py-1 bg-accent/80 rounded-lg normal-text-2 font-bold text-white mb-2"
                                                            aria-label={`Starting price: ${event.lowest_price} Ghana Cedis`}
                                                        >
                                                            GHS {event.lowest_price}
                                                        </span>
                                                        <h3 className="normal-text font-bold text-white line-clamp-2">
                                                            {event.title}
                                                        </h3>
                                                    </div>
                                                </article>
                                            </Link>
                                        )) : (
                                            <>
                                                {/* Fallback Card 1 - More Events Coming */}
                                                <div 
                                                    className="group"
                                                    role="status"
                                                    aria-label="More events coming soon"
                                                >
                                                    <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-xl bg-primary-100">
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                                            <Sparkles className="w-12 h-12 text-accent-50 mb-3" aria-hidden="true" />
                                                            <h3 className="normal-text font-bold text-white mb-1">
                                                                More Events Coming
                                                            </h3>
                                                            <p className="small-text text-slate-300">
                                                                Check back soon for amazing experiences
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Fallback Card 2 - Create Event CTA */}
                                                <div className="group">
                                                    <Link
                                                        href="/events/create"
                                                        className="block relative h-48 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-xl bg-primary-100 hover:border-accent transition-all duration-300"
                                                        aria-label="Create your own event on Cafa Tickets"
                                                    >
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                                            <Calendar className="w-12 h-12 text-accent-50 mb-3" aria-hidden="true" />
                                                            <h3 className="normal-text font-bold text-white mb-1">
                                                                Create Your Event
                                                            </h3>
                                                            <span className="small-text text-accent-50 hover:text-accent-100 underline">
                                                                Get Started →
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    /* No events at all - Full fallback */
                                    <div 
                                        className="col-span-2"
                                        role="status"
                                        aria-live="polite"
                                        aria-label="No events currently available"
                                    >
                                        <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl bg-primary-100">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                                <Sparkles className="w-16 h-16 text-accent-50 mb-4 animate-pulse" aria-hidden="true" />
                                                <h2 className="big-text-4 font-bold text-white mb-3">
                                                    Events Loading Soon
                                                </h2>
                                                <p className="normal-text text-slate-200 mb-4 max-w-md">
                                                    Ghana&apos;s biggest events are coming. Be the first to know!
                                                </p>
                                                <Link 
                                                    href="/events"
                                                    className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-100 transition-colors font-semibold normal-text"
                                                    aria-label="Explore all events on Cafa Tickets"
                                                >
                                                    Explore Events
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-primary-200 to-transparent" aria-hidden="true"></div>
        </div>
    );
};

export default Landing;