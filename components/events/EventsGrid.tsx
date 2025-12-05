"use client";

import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Event } from '@/types/events.types';
import { EventCard } from '@/components';

interface EventsGridProps {
    events: Event[];
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
}

const EventsGrid = ({ events, isLoading, hasMore, onLoadMore }: EventsGridProps) => {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasMore, isLoading, onLoadMore]);

    return (
        <div>
            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <div key={event.id}>
                        <EventCard event={event} />
                    </div>
                ))}
            </div>

            {/* Loading Indicator */}
            {isLoading && (
                <div className="flex justify-center items-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-accent-50 animate-spin" aria-hidden="true" />
                        <p className="normal-text text-slate-300 font-semibold">
                            Loading more events...
                        </p>
                    </div>
                </div>
            )}

            {/* Intersection Observer Target */}
            {hasMore && !isLoading && (
                <div ref={loadMoreRef} className="h-20" aria-hidden="true"></div>
            )}

            {/* End of Results */}
            {!hasMore && events.length > 0 && (
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 border-2 border-accent mb-4">
                        <span className="text-2xl">🎉</span>
                    </div>
                    <p className="big-text-5 font-bold text-white mb-2">
                        You&apos;ve reached the end!
                    </p>
                    <p className="normal-text text-slate-300">
                        That&apos;s all the events we have for now. Check back later for more!
                    </p>
                </div>
            )}
        </div>
    );
};

export default EventsGrid;