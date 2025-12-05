"use client";

import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

interface EventsEmptyStateProps {
    hasFilters: boolean;
    onClearFilters: () => void;
}

const EventsEmptyState = ({ hasFilters, onClearFilters }: EventsEmptyStateProps) => {
    return (
        <div className="text-center py-16">
            <div className="max-w-md mx-auto">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/20 border-2 border-accent mb-6">
                    <SearchX className="w-12 h-12 text-accent-50" aria-hidden="true" />
                </div>

                {/* Message */}
                <h3 className="big-text-2 font-bold text-white mb-3">
                    {hasFilters ? 'No Events Found' : 'No Events Available'}
                </h3>
                
                <p className="normal-text text-slate-300 mb-6 leading-relaxed">
                    {hasFilters 
                        ? "We couldn't find any events matching your filters. Try adjusting your search criteria or browse all events."
                        : "There are no events available at the moment. Check back later for upcoming events!"
                    }
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {hasFilters && (
                        <button
                            onClick={onClearFilters}
                            className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300 hover:scale-105 border-2 border-accent"
                            type="button"
                        >
                            <RefreshCw className="w-5 h-5" aria-hidden="true" />
                            Clear All Filters
                        </button>
                    )}
                    
                    <a
                        href="/"
                        className="flex items-center gap-2 px-8 py-3 bg-primary-100 text-white rounded-xl font-bold normal-text hover:bg-primary-200 transition-all duration-300 border-2 border-accent"
                    >
                        Back to Home
                    </a>
                </div>

                {/* Suggestions */}
                {hasFilters && (
                    <div className="mt-8 p-6 bg-primary-100 rounded-xl border border-accent text-left">
                        <p className="normal-text font-bold text-white mb-3">
                            Try these suggestions:
                        </p>
                        <ul className="space-y-2 text-slate-200 normal-text-2">
                            <li className="flex items-start gap-2">
                                <span className="text-accent-50 mt-1">•</span>
                                <span>Check your spelling and try again</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent-50 mt-1">•</span>
                                <span>Use broader search terms</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent-50 mt-1">•</span>
                                <span>Try a different city or date range</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent-50 mt-1">•</span>
                                <span>Browse all categories instead</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsEmptyState;