"use client";

import React, { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Search, X, ArrowUpDown } from 'lucide-react';
import { CategorySelect } from '@/components';

type Props = {
    onFilterChange: (filters: {
        status: string;
        is_published: string;
        category: string;
        search: string;
        sort_by: string;
    }) => void;
};

const MyEventsFilters = ({ onFilterChange }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // ✅ Use ref to store timeout ID for proper cleanup
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [status, setStatus] = React.useState(searchParams.get('status') || 'all');
    const [isPublished, setIsPublished] = React.useState(searchParams.get('is_published') || 'true');
    const [category, setCategory] = React.useState(searchParams.get('category') || '');
    const [search, setSearch] = React.useState(searchParams.get('search') || '');
    const [sortBy, setSortBy] = React.useState(searchParams.get('sort_by') || '-start_date');

    const updateURL = React.useCallback((
        newStatus: string,
        newIsPublished: string,
        newCategory: string,
        newSearch: string,
        newSortBy: string
    ) => {
        const params = new URLSearchParams();

        if (newStatus !== 'all') params.set('status', newStatus);
        if (newIsPublished !== 'true') params.set('is_published', newIsPublished);
        if (newCategory) params.set('category', newCategory);
        if (newSearch) params.set('search', newSearch);
        if (newSortBy !== '-start_date') params.set('sort_by', newSortBy);

        const queryString = params.toString();
        router.push(`/dashboard/events${queryString ? `?${queryString}` : ''}`, { scroll: false });

        onFilterChange({
            status: newStatus,
            is_published: newIsPublished,
            category: newCategory,
            search: newSearch,
            sort_by: newSortBy
        });
    }, [router, onFilterChange]);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        updateURL(newStatus, isPublished, category, search, sortBy);
    };

    const handlePublishedChange = (newIsPublished: string) => {
        setIsPublished(newIsPublished);
        updateURL(status, newIsPublished, category, search, sortBy);
    };

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
        updateURL(status, isPublished, newCategory, search, sortBy);
    };

    // ✅ FIXED: Proper debounce with ref cleanup
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
        
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Set new timeout
        searchTimeoutRef.current = setTimeout(() => {
            updateURL(status, isPublished, category, newSearch, sortBy);
        }, 500);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
        updateURL(status, isPublished, category, search, newSortBy);
    };

    const clearFilters = () => {
        setStatus('all');
        setIsPublished('true');
        setCategory('');
        setSearch('');
        setSortBy('-start_date');
        updateURL('all', 'true', '', '', '-start_date');
    };

    const hasActiveFilters = status !== 'all' || isPublished !== 'true' || category || search || sortBy !== '-start_date';

    const statusOptions = [
        { value: 'all', label: 'All Events' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'past', label: 'Past' }
    ];

    const publishedOptions = [
        { value: 'true', label: 'Published Only' },
        { value: 'false', label: 'Unpublished Only' },
        { value: 'all', label: 'All' }
    ];

    const sortOptions = [
        { value: '-start_date', label: 'Start Date (Newest)' },
        { value: 'start_date', label: 'Start Date (Oldest)' },
        { value: '-created_at', label: 'Created (Newest)' },
        { value: 'created_at', label: 'Created (Oldest)' },
        { value: '-tickets_sold', label: 'Tickets Sold (Most)' },
        { value: 'tickets_sold', label: 'Tickets Sold (Least)' },
        { value: '-revenue', label: 'Revenue (Highest)' },
        { value: 'revenue', label: 'Revenue (Lowest)' }
    ];

    return (
        <div role="region" aria-label="Event filters" className="bg-primary rounded-xl p-2 border-2 border-accent/30">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-accent-50" aria-hidden="true" />
                </div>
                <h2 className="big-text-4 font-bold text-white">
                    Filters
                </h2>
            </div>

            <div className="space-y-4">
                {/* Search */}
                <div>
                    <label htmlFor="search" className="flex items-center gap-2 normal-text-2 text-slate-300 font-medium mb-2">
                        <Search className="w-4 h-4" aria-hidden="true" />
                        Search Events
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search by title..."
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    />
                </div>

                {/* Status Filter */}
                <div>
                    <label htmlFor="status-filter" className="block normal-text-2 text-slate-300 font-medium mb-2">
                        Status
                    </label>
                    <select
                        id="status-filter"
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Published Filter */}
                <div>
                    <label htmlFor="published-filter" className="block normal-text-2 text-slate-300 font-medium mb-2">
                        Published Status
                    </label>
                    <select
                        id="published-filter"
                        value={isPublished}
                        onChange={(e) => handlePublishedChange(e.target.value)}
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    >
                        {publishedOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <CategorySelect
                    id="category-filter"
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                    placeholder="All Categories"
                    includeAllOption={true}
                />

                {/* Sort By */}
                <div>
                    <label htmlFor="sort-filter" className="flex items-center gap-2 normal-text-2 text-slate-300 font-medium mb-2">
                        <ArrowUpDown className="w-4 h-4" aria-hidden="true" />
                        Sort By
                    </label>
                    <select
                        id="sort-filter"
                        value={sortBy}
                        onChange={handleSortChange}
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent/20 text-accent-50 rounded-xl font-semibold normal-text-2 hover:bg-accent/30 transition-all duration-300 border border-accent/30"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                        Clear All Filters
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyEventsFilters;