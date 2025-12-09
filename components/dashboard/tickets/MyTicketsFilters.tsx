"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { eventCategories } from '@/data/dummy.general';

type Props = {
    currentStatus: string;
    currentCategory: string;
    currentSearch: string;
};

const MyTicketsFilters = ({ currentStatus, currentCategory, currentSearch }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchInput, setSearchInput] = useState(currentSearch);

    const statusOptions = [
        { value: 'all', label: 'All Tickets' },
        { value: 'active', label: 'Active' },
        { value: 'used', label: 'Used' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value && value !== 'all' && value !== '') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        // Reset to page 1 when filters change
        params.delete('page');
        
        router.push(`/dashboard/tickets?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters('search', searchInput);
    };

    const clearSearch = () => {
        setSearchInput('');
        updateFilters('search', '');
    };

    const hasActiveFilters = currentStatus !== 'all' || currentCategory || currentSearch;

    const clearAllFilters = () => {
        setSearchInput('');
        router.push('/dashboard/tickets');
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search by event name or ticket ID..."
                    className="w-full h-12 pl-12 pr-24 bg-primary-100 border-2 border-accent/30 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-accent transition-colors normal-text"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                
                {searchInput && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-16 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4 text-white" aria-hidden="true" />
                    </button>
                )}
                
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-accent hover:bg-accent-100 text-white rounded-lg font-semibold small-text transition-colors"
                >
                    Search
                </button>
            </form>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-slate-400" aria-hidden="true" />
                    <span className="normal-text-2 text-slate-400 font-semibold">Filters:</span>
                </div>

                {/* Status Filter */}
                <select
                    value={currentStatus}
                    onChange={(e) => updateFilters('status', e.target.value)}
                    className="px-4 py-2 bg-primary-100 border-2 border-accent/30 rounded-xl text-white focus:outline-none focus:border-accent transition-colors normal-text-2 cursor-pointer"
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Category Filter */}
                <select
                    value={currentCategory}
                    onChange={(e) => updateFilters('category', e.target.value)}
                    className="px-4 py-2 bg-primary-100 border-2 border-accent/30 rounded-xl text-white focus:outline-none focus:border-accent transition-colors normal-text-2 cursor-pointer"
                >
                    <option value="">All Categories</option>
                    {eventCategories.map(category => (
                        <option key={category.id} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold small-text transition-colors border border-red-500/30"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="small-text text-slate-400">Active filters:</span>
                    
                    {currentStatus !== 'all' && (
                        <span className="px-3 py-1 bg-accent/20 text-accent-50 rounded-lg small-text font-semibold border border-accent/30">
                            Status: {statusOptions.find(s => s.value === currentStatus)?.label}
                        </span>
                    )}
                    
                    {currentCategory && (
                        <span className="px-3 py-1 bg-accent/20 text-accent-50 rounded-lg small-text font-semibold border border-accent/30">
                            Category: {eventCategories.find(c => c.slug === currentCategory)?.name}
                        </span>
                    )}
                    
                    {currentSearch && (
                        <span className="px-3 py-1 bg-accent/20 text-accent-50 rounded-lg small-text font-semibold border border-accent/30">
                            Search: &quot;{currentSearch}&quot;
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyTicketsFilters;