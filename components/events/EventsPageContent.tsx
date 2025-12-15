"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Event, EventFilters } from '@/types/events.types';
import { useDebounce, useInfiniteScroll } from '@/hooks';
import { EventCategory } from '@/types/general.types';

import {
    EventsHero,
    EventsCategoryTabs,
    EventsFilter,
    EventsSortTab,
    ActiveFiltersDisplay,
    EventsResultsHeader,
    EventsGrid,
    EventsEmptyState
} from "@/components";

type Props = {
    categories: EventCategory[];
};

interface FilterOptions {
    city: string | null;
    status: 'upcoming' | 'ongoing' | 'all';
    date_from: string;
    date_to: string;
    price_min: string;
    price_max: string;
}

const EventsPageContent = ({ categories }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category') || null);
    const [filters, setFilters] = useState<FilterOptions>({
        city: searchParams.get('city') || null,
        status: (searchParams.get('status') as 'upcoming' | 'ongoing' | 'all') || 'all',
        date_from: searchParams.get('date_from') || '',
        date_to: searchParams.get('date_to') || '',
        price_min: searchParams.get('price_min') || '',
        price_max: searchParams.get('price_max') || ''
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
        if (filters.status !== 'all') params.set('status', filters.status);
        if (filters.date_from) params.set('date_from', filters.date_from);
        if (filters.date_to) params.set('date_to', filters.date_to);
        if (filters.price_min) params.set('price_min', filters.price_min);
        if (filters.price_max) params.set('price_max', filters.price_max);
        if (sortBy !== '-start_date') params.set('ordering', sortBy);

        const queryString = params.toString();
        router.push(`/events${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }, [debouncedSearchQuery, selectedCategory, filters, sortBy, router]);

    // Fetch events from backend
    const fetchEvents = useCallback(async (page: number, resetEvents: boolean = false) => {
        setIsLoading(true);
        setError(null);

        try {
            const filterParams: EventFilters = {
                page,
                ordering: sortBy,
            };

            if (debouncedSearchQuery) filterParams.search = debouncedSearchQuery;
            if (selectedCategory) filterParams.category = selectedCategory;
            if (filters.city) filterParams.city = filters.city;
            if (filters.status !== 'all') filterParams.status = filters.status;
            if (filters.date_from) filterParams.date_from = filters.date_from;
            if (filters.date_to) filterParams.date_to = filters.date_to;
            if (filters.price_min) filterParams.price_min = filters.price_min;
            if (filters.price_max) filterParams.price_max = filters.price_max;

            const response = await fetch(`/api/events?${new URLSearchParams(filterParams as Record<string, string>)}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const data = await response.json();

            if (resetEvents) {
                setEvents(data.results);
            } else {
                setEvents(prev => [...prev, ...data.results]);
            }

            setTotalCount(data.count);
            setCurrentPage(data.current_page);
            setTotalPages(data.total_pages);

        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load events. Please try again.');
        } finally {
            setIsLoading(false);
            setIsInitialLoad(false);
        }
    }, [debouncedSearchQuery, selectedCategory, filters, sortBy]);

    // Load more events (for infinite scroll)
    const handleLoadMore = useCallback(() => {
        if (currentPage < totalPages && !isLoading) {
            fetchEvents(currentPage + 1, false);
        }
    }, [currentPage, totalPages, isLoading, fetchEvents]);

    // Set up infinite scroll
    const scrollRef = useInfiniteScroll(handleLoadMore, {
        threshold: 300,
        hasMore: currentPage < totalPages,
        isLoading,
    });

    // Reset and fetch when filters change
    useEffect(() => {
        setCurrentPage(1);
        fetchEvents(1, true);
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
            status: 'all',
            date_from: '',
            date_to: '',
            price_min: '',
            price_max: ''
        });
        setSortBy('-start_date');
    };

    // Get active filters for display
    const activeFilters = React.useMemo(() => {
        const active: Array<{ key: string; label: string; value: string }> = [];

        if (debouncedSearchQuery) active.push({ key: 'search', label: 'Search', value: debouncedSearchQuery });
        if (selectedCategory) active.push({ key: 'category', label: 'Category', value: selectedCategory });
        if (filters.city) active.push({ key: 'city', label: 'City', value: filters.city });
        if (filters.status !== 'all') active.push({ key: 'status', label: 'Status', value: filters.status });
        if (filters.date_from) active.push({ key: 'date_from', label: 'From', value: filters.date_from });
        if (filters.date_to) active.push({ key: 'date_to', label: 'To', value: filters.date_to });
        if (filters.price_min) active.push({ key: 'price_min', label: 'Min Price', value: `GHS ${filters.price_min}` });
        if (filters.price_max) active.push({ key: 'price_max', label: 'Max Price', value: `GHS ${filters.price_max}` });

        return active;
    }, [debouncedSearchQuery, selectedCategory, filters]);

    // Remove single filter
    const handleRemoveFilter = (key: string) => {
        if (key === 'search') setSearchQuery('');
        else if (key === 'category') setSelectedCategory(null);
        else if (key === 'city') setFilters({ ...filters, city: null });
        else if (key === 'status') setFilters({ ...filters, status: 'all' });
        else if (key === 'date_from') setFilters({ ...filters, date_from: '' });
        else if (key === 'date_to') setFilters({ ...filters, date_to: '' });
        else if (key === 'price_min') setFilters({ ...filters, price_min: '' });
        else if (key === 'price_max') setFilters({ ...filters, price_max: '' });
    };

    const hasActiveFilters = activeFilters.length > 0;

    return (
        <main className="min-h-screen bg-primary">
            {/* Hero Section */}
            <EventsHero
                totalEvents={totalCount}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={updateURL}
            />

            {/* Category Tabs */}
            <EventsCategoryTabs
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                categories={categories}
            />

            {/* Main Content */}
            <section className="relative py-8 sm:py-12 bg-primary">
                <div className="inner-wrapper">
                    {/* Filters & Sort Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <EventsFilter
                                filters={filters}
                                onFilterChange={setFilters}
                                onClearFilters={handleClearAllFilters}
                                activeFiltersCount={activeFilters.length}
                            />
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
                                onClick={() => fetchEvents(1, true)}
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
                            <p className="mt-4 normal-text text-slate-400">Loading events...</p>
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

export default EventsPageContent;