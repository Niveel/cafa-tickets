"use client";

import { Calendar } from 'lucide-react';

interface EventsResultsHeaderProps {
    totalCount: number;
    currentCount: number;
    isFiltered: boolean;
}

const EventsResultsHeader = ({ totalCount, currentCount, isFiltered }: EventsResultsHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            {/* Results Count */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center border border-accent">
                    <Calendar className="w-5 h-5 text-accent-50" aria-hidden="true" />
                </div>
                <div>
                    <p className="big-text-5 font-bold text-white">
                        {currentCount.toLocaleString()} {currentCount === 1 ? 'Event' : 'Events'}
                    </p>
                    {isFiltered && totalCount !== currentCount && (
                        <p className="small-text text-slate-300">
                            Filtered from {totalCount.toLocaleString()} total events
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsResultsHeader;