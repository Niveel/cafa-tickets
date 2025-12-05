"use client";

import React, { useState } from 'react';
import { Filter, X, MapPin, Calendar, DollarSign, ChevronDown } from 'lucide-react';
import { cities } from '@/data/static.general';

interface FilterOptions {
    city: string | null;
    status: 'upcoming' | 'ongoing' | 'all';
    date_from: string;
    date_to: string;
    price_min: string;
    price_max: string;
}

interface EventsFilterProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    onClearFilters: () => void;
    activeFiltersCount: number;
}

const EventsFilter = ({ filters, onFilterChange, onClearFilters, activeFiltersCount }: EventsFilterProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleFilterUpdate = (key: keyof FilterOptions, value: string | null) => {
        onFilterChange({
            ...filters,
            [key]: value
        });
    };

    return (
        <div className="relative">
            {/* Filter Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-6 py-3 bg-primary-100 text-white rounded-xl font-bold normal-text border-2 border-accent hover:bg-primary-200 transition-all duration-300"
                type="button"
                aria-label="Toggle filters"
                aria-expanded={isOpen}
            >
                <Filter className="w-5 h-5 text-accent-50" aria-hidden="true" />
                Filters
                {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 bg-accent text-white rounded-full small-text font-bold">
                        {activeFiltersCount}
                    </span>
                )}
                <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {/* Filter Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    ></div>

                    {/* Filter Content */}
                    <div className="absolute top-full left-0 right-0 lg:right-auto lg:w-[600px] mt-2 p-6 bg-primary rounded-2xl border-2 border-accent shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-accent">
                            <div>
                                <h3 className="big-text-4 font-bold text-white mb-1">
                                    Filter Events
                                </h3>
                                <p className="small-text text-slate-300">
                                    Refine your search to find the perfect event
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-lg bg-primary-100 border border-accent hover:bg-accent transition-all duration-300 flex items-center justify-center lg:hidden"
                                type="button"
                                aria-label="Close filters"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* City Filter */}
                            <div>
                                <label className="flex items-center gap-2 normal-text font-bold text-white mb-3">
                                    <MapPin className="w-4 h-4 text-accent-50" aria-hidden="true" />
                                    City
                                </label>
                                <select
                                    value={filters.city || ''}
                                    onChange={(e) => handleFilterUpdate('city', e.target.value || null)}
                                    className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
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

                            {/* Status Filter */}
                            <div>
                                <label className="flex items-center gap-2 normal-text font-bold text-white mb-3">
                                    <Calendar className="w-4 h-4 text-accent-50" aria-hidden="true" />
                                    Event Status
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'upcoming', label: 'Upcoming' },
                                        { value: 'ongoing', label: 'Ongoing' },
                                        { value: 'all', label: 'All' }
                                    ].map((status) => (
                                        <button
                                            key={status.value}
                                            onClick={() => handleFilterUpdate('status', status.value as any)}
                                            className={`py-3 px-4 rounded-xl font-bold normal-text-2 transition-all duration-300 border-2 ${
                                                filters.status === status.value
                                                    ? 'bg-accent text-white border-accent'
                                                    : 'bg-primary-100 text-slate-200 border-accent/30 hover:border-accent'
                                            }`}
                                            type="button"
                                        >
                                            {status.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Date Range */}
                            <div>
                                <label className="flex items-center gap-2 normal-text font-bold text-white mb-3">
                                    <Calendar className="w-4 h-4 text-accent-50" aria-hidden="true" />
                                    Date Range
                                </label>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="small-text text-slate-300 mb-2 block">From</label>
                                        <input
                                            type="date"
                                            value={filters.date_from}
                                            onChange={(e) => handleFilterUpdate('date_from', e.target.value)}
                                            className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent"
                                            aria-label="Filter from date"
                                        />
                                    </div>
                                    <div>
                                        <label className="small-text text-slate-300 mb-2 block">To</label>
                                        <input
                                            type="date"
                                            value={filters.date_to}
                                            onChange={(e) => handleFilterUpdate('date_to', e.target.value)}
                                            className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent"
                                            aria-label="Filter to date"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="flex items-center gap-2 normal-text font-bold text-white mb-3">
                                    <DollarSign className="w-4 h-4 text-accent-50" aria-hidden="true" />
                                    Price Range (GHS)
                                </label>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="small-text text-slate-300 mb-2 block">Minimum</label>
                                        <input
                                            type="number"
                                            value={filters.price_min}
                                            onChange={(e) => handleFilterUpdate('price_min', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent"
                                            aria-label="Minimum price"
                                        />
                                    </div>
                                    <div>
                                        <label className="small-text text-slate-300 mb-2 block">Maximum</label>
                                        <input
                                            type="number"
                                            value={filters.price_max}
                                            onChange={(e) => handleFilterUpdate('price_max', e.target.value)}
                                            placeholder="1000"
                                            min="0"
                                            className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent"
                                            aria-label="Maximum price"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6 pt-6 border-t border-accent">
                            <button
                                onClick={onClearFilters}
                                className="flex-1 py-3 px-4 bg-primary-100 text-white rounded-xl font-bold normal-text border-2 border-accent/30 hover:border-accent hover:bg-primary-200 transition-all duration-300"
                                type="button"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex-1 py-3 px-4 bg-accent text-white rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300 border-2 border-accent"
                                type="button"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventsFilter;