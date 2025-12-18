"use client";

import { Sparkles } from 'lucide-react';
import { EventDetails, RecurringEventDetails } from '@/types/events.types';
import {SimilarEventCard} from '@/components';

interface SimilarEventsSectionProps {
    event: EventDetails | RecurringEventDetails;
}

const SimilarEventsSection = ({ event }: SimilarEventsSectionProps) => {
    // Return null if no similar events
    if (!event.similar_events || event.similar_events.length === 0) {
        return null;
    }

    return (
        <section className="relative py-8 sm:y-12 bg-primary">
            <div className="inner-wrapper">
                {/* Section Header */}
                <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent">
                            <Sparkles className="w-6 h-6 text-accent-50" aria-hidden="true" />
                        </div>
                        <h2 className="big-text-1 font-bold text-white">
                            You Might Also Like
                        </h2>
                    </div>
                    <p className="big-text-5 text-slate-200 max-w-3xl">
                        Check out these similar events that might interest you. More amazing experiences await!
                    </p>
                </div>

                {/* Similar Events Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {event.similar_events.slice(0, 6).map((similarEvent, index) => (
                        <div
                            key={similarEvent.id}
                            style={{
                                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                            }}
                        >
                            <SimilarEventCard event={similarEvent} />
                        </div>
                    ))}
                </div>

                {/* View All Events CTA */}
                <div className="text-center mt-10">
                    <a
                        href="/events"
                        className="inline-block px-8 py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all duration-300 hover:scale-105 border-2 border-accent"
                    >
                        Explore All Events
                    </a>
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

export default SimilarEventsSection;