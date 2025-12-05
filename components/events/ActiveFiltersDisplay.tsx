"use client";

import React from 'react';
import { X } from 'lucide-react';

interface ActiveFilter {
    key: string;
    label: string;
    value: string;
}

interface ActiveFiltersDisplayProps {
    activeFilters: ActiveFilter[];
    onRemoveFilter: (key: string) => void;
    onClearAll: () => void;
}

const ActiveFiltersDisplay = ({ activeFilters, onRemoveFilter, onClearAll }: ActiveFiltersDisplayProps) => {
    if (activeFilters.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="small-text text-slate-300 font-semibold">
                Active Filters:
            </span>

            {/* Filter Chips */}
            {activeFilters.map((filter) => (
                <div
                    key={filter.key}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/20 border border-accent rounded-lg group hover:bg-accent/30 transition-all duration-300"
                >
                    <span className="small-text text-accent-50 font-semibold">
                        {filter.label}: {filter.value}
                    </span>
                    <button
                        onClick={() => onRemoveFilter(filter.key)}
                        className="w-4 h-4 rounded-full bg-accent/30 hover:bg-accent flex items-center justify-center transition-all duration-300"
                        type="button"
                        aria-label={`Remove ${filter.label} filter`}
                    >
                        <X className="w-3 h-3 text-white" />
                    </button>
                </div>
            ))}

            {/* Clear All Button */}
            {activeFilters.length > 1 && (
                <button
                    onClick={onClearAll}
                    className="px-3 py-1.5 bg-primary-100 text-white border border-accent rounded-lg small-text font-bold hover:bg-accent transition-all duration-300"
                    type="button"
                >
                    Clear All
                </button>
            )}
        </div>
    );
};

export default ActiveFiltersDisplay;