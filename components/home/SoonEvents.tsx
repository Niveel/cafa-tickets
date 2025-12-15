"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { SoonEventCard } from "@/components";
import { Event } from '@/types/events.types';

type Props = {
    events: Event[];
};

const SoonEvents = ({ events }: Props) => {
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // ✨ Optimized: Filter events within next 7 days using timestamp comparison
    const upcomingEvents = useMemo(() => {
        const nowTimestamp = Date.now(); // More efficient than new Date().getTime()
        const sevenDaysTimestamp = nowTimestamp + (7 * 24 * 60 * 60 * 1000); // 7 days in ms
        
        return events.filter(event => {
            const eventTimestamp = new Date(event.start_date).getTime();
            // Fast number comparison instead of Date object comparison
            return eventTimestamp >= nowTimestamp && eventTimestamp <= sevenDaysTimestamp;
        }).slice(0, 15); // Limit to 15 events inside useMemo for efficiency
    }, [events]);

    // Check scroll position
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    // Scroll handler
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 500;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const newPosition = direction === 'left' 
                ? currentScroll - scrollAmount 
                : currentScroll + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
        }
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, direction: 'left' | 'right') => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scroll(direction);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition();
            
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);

    // Early return if no upcoming events
    if (upcomingEvents.length === 0) {
        return null;
    }

    return (
        <section 
            className="relative py-12 sm:py-16 lg:py-20 bg-primary overflow-hidden"
            aria-label="Upcoming events this week"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-50 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="inner-wrapper relative z-10">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 sm:mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/30">
                                <Calendar className="w-6 h-6 text-accent-50" aria-hidden="true" />
                            </div>
                            <h2 className="massive-text font-bold text-white">
                                This Week&apos;s Events
                            </h2>
                        </div>
                        <p className="big-text-5 text-slate-200 max-w-2xl">
                            Don&apos;t miss out! These amazing events are happening in the next 7 days.
                        </p>
                    </div>

                    {/* Navigation Buttons - Desktop */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll('left')}
                            onKeyDown={(e) => handleKeyDown(e, 'left')}
                            disabled={!canScrollLeft}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent text-white hover:bg-accent-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center hover:scale-110 disabled:hover:scale-100 border-2 border-accent"
                            aria-label="Scroll events left"
                            type="button"
                        >
                            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            onKeyDown={(e) => handleKeyDown(e, 'right')}
                            disabled={!canScrollRight}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent text-white hover:bg-accent-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center hover:scale-110 disabled:hover:scale-100 border-2 border-accent"
                            aria-label="Scroll events right"
                            type="button"
                        >
                            <ChevronRight className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Events Carousel */}
                <div className="relative">
                    {/* Gradient Fade - Left */}
                    {canScrollLeft && (
                        <div 
                            className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-primary to-transparent z-10 pointer-events-none"
                            aria-hidden="true"
                        ></div>
                    )}

                    {/* Gradient Fade - Right */}
                    {canScrollRight && (
                        <div 
                            className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-primary to-transparent z-10 pointer-events-none"
                            aria-hidden="true"
                        ></div>
                    )}

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4"
                        role="list"
                        aria-label="Upcoming events list"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {upcomingEvents.map((event, index) => (
                            <div
                                key={event.id}
                                role="listitem"
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <SoonEventCard event={event} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Scroll Indicators */}
                    <div className="flex justify-center mt-6 lg:hidden" aria-hidden="true">
                        <div className="flex gap-2">
                            {upcomingEvents.map((_, i) => (
                                <div 
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-accent/30"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Scroll Hint */}
                <p className="lg:hidden text-center small-text text-slate-300 mt-6" role="status">
                    Swipe to explore more events
                </p>
            </div>

            {/* Animation Keyframes */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default SoonEvents;