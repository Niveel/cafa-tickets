"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Event } from '@/types/events.types';
import { History, Archive } from 'lucide-react';
import { useDebounce, useInfiniteScroll } from '@/hooks';
import {
    EventsSortTab,
    ActiveFiltersDisplay,
    EventsResultsHeader,
    EventsGrid,
    EventsEmptyState
} from "@/components";

interface FilterOptions {
    city: string | null;
}

const EventsHistoryContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category') || null);
    const [filters, setFilters] = useState<FilterOptions>({
        city: searchParams.get('city') || null,
    });
    const [sortBy, setSortBy] = useState<string>(searchParams.get('ordering') || '-start_date');

    // Events state
    const [events, setEvents] = useState<Event[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Debounce search query (only trigger API call 500ms after user stops typing)
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Update URL with current filters
    const updateURL = useCallback(() => {
        const params = new URLSearchParams();

        if (debouncedSearchQuery) params.set('search', debouncedSearchQuery);
        if (selectedCategory) params.set('category', selectedCategory);
        if (filters.city) params.set('city', filters.city);
        if (sortBy !== '-start_date') params.set('ordering', sortBy);

        const queryString = params.toString();
        router.push(`/events/history${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }, [debouncedSearchQuery, selectedCategory, filters, sortBy, router]);

    // Fetch past events from backend
    const fetchPastEvents = useCallback(async (page: number, resetEvents: boolean = false) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: page.toString(),
                ordering: sortBy,
            });

            if (debouncedSearchQuery) params.set('search', debouncedSearchQuery);
            if (selectedCategory) params.set('category', selectedCategory);
            if (filters.city) params.set('city', filters.city);

            const response = await fetch(`/api/events/past?${params}`);

            if (!response.ok) {
                throw new Error('Failed to fetch past events');
            }

            const data = await response.json();
            console.log('Fetched past events data:', data);

            if (resetEvents) {
                setEvents(data.results);
            } else {
                setEvents(prev => [...prev, ...data.results]);
            }

            setTotalCount(data.count);
            setCurrentPage(data.current_page);
            setTotalPages(data.total_pages);

        } catch (err) {
            console.error('Error fetching past events:', err);
            setError('Failed to load past events. Please try again.');
        } finally {
            setIsLoading(false);
            setIsInitialLoad(false);
        }
    }, [debouncedSearchQuery, selectedCategory, filters, sortBy]);

    // Load more events (for infinite scroll)
    const handleLoadMore = useCallback(() => {
        if (currentPage < totalPages && !isLoading) {
            fetchPastEvents(currentPage + 1, false);
        }
    }, [currentPage, totalPages, isLoading, fetchPastEvents]);

    // Set up infinite scroll
    const scrollRef = useInfiniteScroll(handleLoadMore, {
        threshold: 300,
        hasMore: currentPage < totalPages,
        isLoading,
    });

    // Reset and fetch when filters change
    useEffect(() => {
        setCurrentPage(1);
        fetchPastEvents(1, true);
    }, [debouncedSearchQuery, selectedCategory, filters, sortBy]);

    // Update URL when filters change
    useEffect(() => {
        if (!isInitialLoad) {
            updateURL();
        }
    }, [debouncedSearchQuery, selectedCategory, filters, sortBy, updateURL, isInitialLoad]);

    // Clear all filters
    const handleClearAllFilters = () => {
        setSearchQuery('');
        setSelectedCategory(null);
        setFilters({
            city: null,
        });
        setSortBy('-start_date');
    };

    // Get active filters for display
    const activeFilters = React.useMemo(() => {
        const active: Array<{ key: string; label: string; value: string }> = [];

        if (debouncedSearchQuery) active.push({ key: 'search', label: 'Search', value: debouncedSearchQuery });
        if (selectedCategory) active.push({ key: 'category', label: 'Category', value: selectedCategory });
        if (filters.city) active.push({ key: 'city', label: 'City', value: filters.city });

        return active;
    }, [debouncedSearchQuery, selectedCategory, filters]);

    // Remove single filter
    const handleRemoveFilter = (key: string) => {
        if (key === 'search') setSearchQuery('');
        else if (key === 'category') setSelectedCategory(null);
        else if (key === 'city') setFilters({ ...filters, city: null });
    };

    const hasActiveFilters = activeFilters.length > 0;

    return (
        <main className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-primary pt-24 sm:pt-28 pb-8 sm:pb-12">

                <div className="inner-wrapper relative z-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600/20 backdrop-blur-sm rounded-xl border border-slate-500 mb-4">
                            <History className="w-4 h-4 text-slate-400" aria-hidden="true" />
                            <span className="small-text text-slate-300 font-bold">
                                Past Events
                            </span>
                        </div>
                        <h1 className="massive-text font-bold text-white mb-4">
                            Events History
                        </h1>
                        <p className="big-text-5 text-slate-200 max-w-2xl mx-auto">
                            Browse through our archive of past events. Relive the memories and see what you missed!
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto mb-8">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search past events..."
                            className="w-full h-16 px-6 bg-primary-100 border-2 border-accent text-white placeholder:text-slate-400 rounded-2xl big-text-5 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                            aria-label="Search past events"
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-600/20 flex items-center justify-center border border-slate-500">
                            <Archive className="w-6 h-6 text-slate-400" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="big-text-4 font-bold text-white">
                                {totalCount.toLocaleString()}
                            </p>
                            <p className="small-text text-slate-300">
                                Past Events
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative py-8 sm:py-12 bg-primary">
                <div className="inner-wrapper">
                    {/* Sort Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <EventsSortTab
                                selectedSort={sortBy}
                                onSortChange={setSortBy}
                            />
                        </div>
                    </div>

                    {/* Active Filters */}
                    {hasActiveFilters && (
                        <div className="mb-6">
                            <ActiveFiltersDisplay
                                activeFilters={activeFilters}
                                onRemoveFilter={handleRemoveFilter}
                                onClearAll={handleClearAllFilters}
                            />
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="normal-text text-red-400">{error}</p>
                            <button
                                onClick={() => fetchPastEvents(1, true)}
                                className="mt-2 text-accent-50 hover:text-accent-100 font-semibold small-text"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Results Header */}
                    {!isInitialLoad && events.length > 0 && (
                        <EventsResultsHeader
                            totalCount={totalCount}
                            currentCount={events.length}
                            isFiltered={hasActiveFilters}
                        />
                    )}

                    {/* Events Grid or Empty State */}
                    {isInitialLoad ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full mx-auto"></div>
                            <p className="mt-4 normal-text text-slate-400">Loading past events...</p>
                        </div>
                    ) : events.length > 0 ? (
                        <>
                            <EventsGrid
                                events={events}
                                isLoading={isLoading}
                                hasMore={currentPage < totalPages}
                                onLoadMore={handleLoadMore}
                            />
                            {/* Infinite Scroll Sentinel */}
                            <div ref={scrollRef} className="h-10" />
                        </>
                    ) : (
                        <EventsEmptyState
                            hasFilters={hasActiveFilters}
                            onClearFilters={handleClearAllFilters}
                        />
                    )}
                </div>
            </section>
        </main>
    );
};

export default EventsHistoryContent;