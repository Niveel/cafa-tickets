"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { events } from '@/data/dummy.events';
import { Event } from '@/types/events.types';
import { History, Archive } from 'lucide-react';
import {EventsCategoryTabs, EventsSortTab, ActiveFiltersDisplay, EventsResultsHeader, EventsGrid, EventsEmptyState} from "@/components"

const EventsHistoryContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get only past events
    const pastEvents = useMemo(() => 
        events.filter(event => event.status === 'past'),
        []
    );

    // State
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category') || null);
    const [selectedCity, setSelectedCity] = useState<string | null>(searchParams.get('city') || null);
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
        if (selectedCity) params.set('city', selectedCity);
        if (sortBy !== '-start_date') params.set('ordering', sortBy);

        const queryString = params.toString();
        router.push(`/events/history${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }, [searchQuery, selectedCategory, selectedCity, sortBy, router]);

    // Filter and sort events
    const filteredAndSortedEvents = useMemo(() => {
        let result = [...pastEvents];

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
        if (selectedCity) {
            result = result.filter(event => event.venue_city === selectedCity);
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
                case 'popularity':
                    return b.tickets_sold - a.tickets_sold;
                default:
                    return 0;
            }
        });

        return result;
    }, [pastEvents, searchQuery, selectedCategory, selectedCity, sortBy]);

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
        setSelectedCity(null);
        setSortBy('-start_date');
    };

    // Get active filters
    const activeFilters = useMemo(() => {
        const active: Array<{ key: string; label: string; value: string }> = [];

        if (searchQuery) active.push({ key: 'search', label: 'Search', value: searchQuery });
        if (selectedCategory) {
            const category = pastEvents.find(e => e.category.slug === selectedCategory)?.category;
            if (category) active.push({ key: 'category', label: 'Category', value: category.name });
        }
        if (selectedCity) active.push({ key: 'city', label: 'City', value: selectedCity });

        return active;
    }, [searchQuery, selectedCategory, selectedCity, pastEvents]);

    // Remove single filter
    const handleRemoveFilter = (key: string) => {
        if (key === 'search') setSearchQuery('');
        else if (key === 'category') setSelectedCategory(null);
        else if (key === 'city') setSelectedCity(null);
    };

    const hasMore = displayedEvents.length < filteredAndSortedEvents.length;
    const hasActiveFilters = activeFilters.length > 0;

    return (
        <main className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-primary pt-24 sm:pt-28 pb-8 sm:pb-12">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
                </div>

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
                                {pastEvents.length}
                            </p>
                            <p className="small-text text-slate-300">
                                Past Events
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <EventsCategoryTabs
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
            />

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

                    {/* Results Header */}
                    {filteredAndSortedEvents.length > 0 && (
                        <EventsResultsHeader
                            totalCount={pastEvents.length}
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

export default EventsHistoryContent