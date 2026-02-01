"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';

import { EventAttendees, EventAttendee } from '@/types/dash-events.types';
import { EventAttendeesFilters, EventAttendeesTable } from '@/components';
import { useInfiniteScroll, useDebounce } from '@/hooks';

type Props = {
    eventSlug: string;
    ticketTypes: Array<{ id: number; name: string }>;
    initialData: EventAttendees;
};

const EventAttendeesContent = ({ eventSlug, ticketTypes, initialData }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [attendees, setAttendees] = useState<EventAttendee[]>(initialData.results);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(!!initialData.next);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [ticketTypeId, setTicketTypeId] = useState(searchParams.get('ticket_type_id') || '');
    const [paymentStatus, setPaymentStatus] = useState(searchParams.get('payment_status') || 'paid');
    const [checkInStatus, setCheckInStatus] = useState(searchParams.get('check_in_status') || 'all');
    const [sortBy, setSortBy] = useState(searchParams.get('sort_by') || '-purchase_date');

    // Debounce search
    const debouncedSearch = useDebounce(search, 500);

    // Fetch attendees
    const fetchAttendees = useCallback(async (pageNum: number, isLoadMore: boolean = false) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: pageNum.toString(),
                page_size: '20',
            });

            if (debouncedSearch) params.set('search', debouncedSearch);
            if (ticketTypeId) params.set('ticket_type_id', ticketTypeId);
            if (paymentStatus !== 'paid') params.set('payment_status', paymentStatus);
            if (checkInStatus !== 'all') params.set('check_in_status', checkInStatus);
            if (sortBy !== '-purchase_date') params.set('sort_by', sortBy);

            const response = await fetch(`/api/dashboard/events/${eventSlug}/attendees?${params}`);

            if (!response.ok) {
                throw new Error('Failed to fetch attendees');
            }

            const data: EventAttendees = await response.json();

            if (isLoadMore) {
                setAttendees(prev => [...prev, ...data.results]);
            } else {
                setAttendees(data.results);
            }

            setHasMore(!!data.next);
            setPage(pageNum);

        } catch (err) {
            console.error('Error fetching attendees:', err);
            setError(err instanceof Error ? err.message : 'Failed to load attendees');
        } finally {
            setIsLoading(false);
        }
    }, [eventSlug, debouncedSearch, ticketTypeId, paymentStatus, checkInStatus, sortBy, isLoading]);

    // Load more for infinite scroll
    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            fetchAttendees(page + 1, true);
        }
    }, [fetchAttendees, page, isLoading, hasMore]);

    // Infinite scroll sentinel
    const sentinelRef = useInfiniteScroll(loadMore, {
        threshold: 200,
        hasMore,
        isLoading
    });

    // Update URL when filters change
    const updateURL = useCallback(() => {
        const params = new URLSearchParams();

        if (debouncedSearch) params.set('search', debouncedSearch);
        if (ticketTypeId) params.set('ticket_type_id', ticketTypeId);
        if (paymentStatus !== 'paid') params.set('payment_status', paymentStatus);
        if (checkInStatus !== 'all') params.set('check_in_status', checkInStatus);
        if (sortBy !== '-purchase_date') params.set('sort_by', sortBy);

        const queryString = params.toString();
        router.push(`/dashboard/events/${eventSlug}/attendees${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }, [router, eventSlug, debouncedSearch, ticketTypeId, paymentStatus, checkInStatus, sortBy]);

    // Refetch when filters change
    useEffect(() => {
        updateURL();
        fetchAttendees(1, false);
    }, [debouncedSearch, ticketTypeId, paymentStatus, checkInStatus, sortBy]);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters: {
        search: string;
        ticket_type_id: string;
        payment_status: string;
        check_in_status: string;
        sort_by: string;
    }) => {
        setSearch(newFilters.search);
        setTicketTypeId(newFilters.ticket_type_id);
        setPaymentStatus(newFilters.payment_status);
        setCheckInStatus(newFilters.check_in_status);
        setSortBy(newFilters.sort_by);
    }, []);

    const clearFilters = useCallback(() => {
        setSearch('');
        setTicketTypeId('');
        setPaymentStatus('paid');
        setCheckInStatus('all');
        setSortBy('-purchase_date');
    }, []);

    const hasActiveFilters = !!(search || ticketTypeId || paymentStatus !== 'paid' || checkInStatus !== 'all' || sortBy !== '-purchase_date');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
                <EventAttendeesFilters 
                    eventSlug={eventSlug}
                    ticketTypes={ticketTypes}
                    search={search}
                    ticketTypeId={ticketTypeId}
                    paymentStatus={paymentStatus}
                    checkInStatus={checkInStatus}
                    sortBy={sortBy}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                />
            </div>

            {/* Attendees List */}
            <div className="lg:col-span-3">
                {error && (
                    <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-6 mb-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
                            <div>
                                <p className="big-text-4 font-bold text-red-400 mb-1">Error Loading Attendees</p>
                                <p className="normal-text text-red-300">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <EventAttendeesTable 
                    attendees={attendees} 
                    hasActiveFilters={hasActiveFilters}
                    onClearFilters={clearFilters}
                />

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-accent animate-spin" />
                        <span className="ml-3 normal-text text-slate-400">Loading attendees...</span>
                    </div>
                )}

                {/* Infinite scroll sentinel */}
                {hasMore && !isLoading && (
                    <div ref={sentinelRef} className="h-20" />
                )}

                {/* No more results */}
                {!hasMore && attendees.length > 0 && (
                    <div className="text-center py-8">
                        <p className="normal-text text-slate-400">No more attendees to load</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventAttendeesContent;