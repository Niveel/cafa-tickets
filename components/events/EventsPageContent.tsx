"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { events } from '@/data/dummy.events';
import { Event } from '@/types/events.types';
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

interface FilterOptions {
    city: string | null;
    status: 'upcoming' | 'ongoing' | 'all';
    date_from: string;
    date_to: string;
    price_min: string;
    price_max: string;
}

const EventsPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get only non-past events
    const activeEvents = useMemo(() => 
        events.filter(event => event.status !== 'past'),
        []
    );

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
    const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pageSize = 20;

    // Update URL with current filters
    const updateURL = useCallback(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set('search', searchQuery);
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
    }, [searchQuery, selectedCategory, filters, sortBy, router]);

    // Filter and sort events
    const filteredAndSortedEvents = useMemo(() => {
        let result = [...activeEvents];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(event =>
                event.title.toLowerCase().includes(query) ||
                event.short_description.toLowerCase().includes(query) ||
                event.venue_name.toLowerCase().includes(query) ||
                event.venue_city.toLowerCase().includes(query)
            );
        }

        // Filter by category
        if (selectedCategory) {
            result = result.filter(event => event.category.slug === selectedCategory);
        }

        // Filter by city
        if (filters.city) {
            result = result.filter(event => event.venue_city === filters.city);
        }

        // Filter by status
        if (filters.status !== 'all') {
            result = result.filter(event => event.status === filters.status);
        }

        // Filter by date range
        if (filters.date_from) {
            result = result.filter(event => new Date(event.start_date) >= new Date(filters.date_from));
        }
        if (filters.date_to) {
            result = result.filter(event => new Date(event.start_date) <= new Date(filters.date_to));
        }

        // Filter by price range
        if (filters.price_min) {
            result = result.filter(event => parseFloat(event.lowest_price) >= parseFloat(filters.price_min));
        }
        if (filters.price_max) {
            result = result.filter(event => parseFloat(event.lowest_price) <= parseFloat(filters.price_max));
        }

        // Sort events
        result.sort((a, b) => {
            switch (sortBy) {
                case 'start_date':
                    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
                case '-start_date':
                    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
                case 'created_at':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case '-created_at':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'price':
                    return parseFloat(a.lowest_price) - parseFloat(b.lowest_price);
                case '-price':
                    return parseFloat(b.lowest_price) - parseFloat(a.lowest_price);
                case 'popularity':
                    return b.tickets_sold - a.tickets_sold;
                default:
                    return 0;
            }
        });

        return result;
    }, [activeEvents, searchQuery, selectedCategory, filters, sortBy]);

    // Update displayed events when filters change
    React.useEffect(() => {
        setDisplayedEvents(filteredAndSortedEvents.slice(0, pageSize));
        setPage(1);
    }, [filteredAndSortedEvents]);

    // Update URL when filters/sort change
    React.useEffect(() => {
        updateURL();
    }, [updateURL]);

    // Load more events (infinite scroll)
    const handleLoadMore = useCallback(() => {
        if (isLoading) return;

        setIsLoading(true);
        
        setTimeout(() => {
            const nextPage = page + 1;
            const startIndex = page * pageSize;
            const endIndex = startIndex + pageSize;
            const moreEvents = filteredAndSortedEvents.slice(startIndex, endIndex);
            
            setDisplayedEvents(prev => [...prev, ...moreEvents]);
            setPage(nextPage);
            setIsLoading(false);
        }, 500);
    }, [page, filteredAndSortedEvents, isLoading]);

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

    // Get active filters
    const activeFilters = useMemo(() => {
        const active: Array<{ key: string; label: string; value: string }> = [];

        if (searchQuery) active.push({ key: 'search', label: 'Search', value: searchQuery });
        if (selectedCategory) {
            const category = activeEvents.find(e => e.category.slug === selectedCategory)?.category;
            if (category) active.push({ key: 'category', label: 'Category', value: category.name });
        }
        if (filters.city) active.push({ key: 'city', label: 'City', value: filters.city });
        if (filters.status !== 'all') active.push({ key: 'status', label: 'Status', value: filters.status });
        if (filters.date_from) active.push({ key: 'date_from', label: 'From', value: filters.date_from });
        if (filters.date_to) active.push({ key: 'date_to', label: 'To', value: filters.date_to });
        if (filters.price_min) active.push({ key: 'price_min', label: 'Min Price', value: `GHS ${filters.price_min}` });
        if (filters.price_max) active.push({ key: 'price_max', label: 'Max Price', value: `GHS ${filters.price_max}` });

        return active;
    }, [searchQuery, selectedCategory, filters, activeEvents]);

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

    const hasMore = displayedEvents.length < filteredAndSortedEvents.length;
    const hasActiveFilters = activeFilters.length > 0;

    return (
        <main className="min-h-screen bg-primary">
            {/* Hero Section */}
            <EventsHero
                totalEvents={activeEvents.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={updateURL}
            />

            {/* Category Tabs */}
            <EventsCategoryTabs
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
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

                    {/* Results Header */}
                    {filteredAndSortedEvents.length > 0 && (
                        <EventsResultsHeader
                            totalCount={activeEvents.length}
                            currentCount={filteredAndSortedEvents.length}
                            isFiltered={hasActiveFilters}
                        />
                    )}

                    {/* Events Grid or Empty State */}
                    {filteredAndSortedEvents.length > 0 ? (
                        <EventsGrid
                            events={displayedEvents}
                            isLoading={isLoading}
                            hasMore={hasMore}
                            onLoadMore={handleLoadMore}
                        />
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