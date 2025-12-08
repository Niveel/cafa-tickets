"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Search, X, ArrowUpDown } from 'lucide-react';

type Props = {
    eventSlug: string;
    ticketTypes: Array<{ id: number; name: string }>;
    onFilterChange: (filters: {
        search: string;
        ticket_type_id: string;
        payment_status: string;
        check_in_status: string;
        sort_by: string;
    }) => void;
};

const EventAttendeesFilters = ({ eventSlug, ticketTypes, onFilterChange }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = React.useState(searchParams.get('search') || '');
    const [ticketTypeId, setTicketTypeId] = React.useState(searchParams.get('ticket_type_id') || '');
    const [paymentStatus, setPaymentStatus] = React.useState(searchParams.get('payment_status') || 'paid');
    const [checkInStatus, setCheckInStatus] = React.useState(searchParams.get('check_in_status') || 'all');
    const [sortBy, setSortBy] = React.useState(searchParams.get('sort_by') || '-purchase_date');

    const updateURL = React.useCallback((
        newSearch: string,
        newTicketTypeId: string,
        newPaymentStatus: string,
        newCheckInStatus: string,
        newSortBy: string
    ) => {
        const params = new URLSearchParams();

        if (newSearch) params.set('search', newSearch);
        if (newTicketTypeId) params.set('ticket_type_id', newTicketTypeId);
        if (newPaymentStatus !== 'paid') params.set('payment_status', newPaymentStatus);
        if (newCheckInStatus !== 'all') params.set('check_in_status', newCheckInStatus);
        if (newSortBy !== '-purchase_date') params.set('sort_by', newSortBy);

        const queryString = params.toString();
        router.push(`/dashboard/events/${eventSlug}/attendees${queryString ? `?${queryString}` : ''}`, { scroll: false });

        onFilterChange({
            search: newSearch,
            ticket_type_id: newTicketTypeId,
            payment_status: newPaymentStatus,
            check_in_status: newCheckInStatus,
            sort_by: newSortBy
        });
    }, [router, eventSlug, onFilterChange]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
        // Debounce search updates
        const timeoutId = setTimeout(() => {
            updateURL(newSearch, ticketTypeId, paymentStatus, checkInStatus, sortBy);
        }, 500);
        return () => clearTimeout(timeoutId);
    };

    const handleTicketTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTicketTypeId = e.target.value;
        setTicketTypeId(newTicketTypeId);
        updateURL(search, newTicketTypeId, paymentStatus, checkInStatus, sortBy);
    };

    const handlePaymentStatusChange = (newStatus: string) => {
        setPaymentStatus(newStatus);
        updateURL(search, ticketTypeId, newStatus, checkInStatus, sortBy);
    };

    const handleCheckInStatusChange = (newStatus: string) => {
        setCheckInStatus(newStatus);
        updateURL(search, ticketTypeId, paymentStatus, newStatus, sortBy);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
        updateURL(search, ticketTypeId, paymentStatus, checkInStatus, newSortBy);
    };

    const clearFilters = () => {
        setSearch('');
        setTicketTypeId('');
        setPaymentStatus('paid');
        setCheckInStatus('all');
        setSortBy('-purchase_date');
        updateURL('', '', 'paid', 'all', '-purchase_date');
    };

    const hasActiveFilters = search || ticketTypeId || paymentStatus !== 'paid' || checkInStatus !== 'all' || sortBy !== '-purchase_date';

    const paymentStatusOptions = [
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' }
    ];

    const checkInStatusOptions = [
        { value: 'all', label: 'All Attendees' },
        { value: 'checked_in', label: 'Checked In' },
        { value: 'not_checked_in', label: 'Not Checked In' }
    ];

    const sortOptions = [
        { value: '-purchase_date', label: 'Purchase Date (Newest)' },
        { value: 'purchase_date', label: 'Purchase Date (Oldest)' },
        { value: 'attendee_name', label: 'Name (A-Z)' },
        { value: '-attendee_name', label: 'Name (Z-A)' },
        { value: 'ticket_type', label: 'Ticket Type (A-Z)' },
        { value: '-check_in_time', label: 'Check-in Time (Recent)' },
        { value: 'check_in_time', label: 'Check-in Time (Oldest)' }
    ];

    return (
        <div role="region" aria-label="Attendees filters" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
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
                        Search Attendees
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Name, email, phone, ticket ID..."
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    />
                </div>

                {/* Ticket Type Filter */}
                <div>
                    <label htmlFor="ticket-type-filter" className="block normal-text-2 text-slate-300 font-medium mb-2">
                        Ticket Type
                    </label>
                    <select
                        id="ticket-type-filter"
                        value={ticketTypeId}
                        onChange={handleTicketTypeChange}
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    >
                        <option value="">All Ticket Types</option>
                        {ticketTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Payment Status Filter */}
                <div>
                    <label htmlFor="payment-status-filter" className="block normal-text-2 text-slate-300 font-medium mb-2">
                        Payment Status
                    </label>
                    <select
                        id="payment-status-filter"
                        value={paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(e.target.value)}
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    >
                        {paymentStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Check-in Status Filter */}
                <div>
                    <label htmlFor="checkin-status-filter" className="block normal-text-2 text-slate-300 font-medium mb-2">
                        Check-in Status
                    </label>
                    <select
                        id="checkin-status-filter"
                        value={checkInStatus}
                        onChange={(e) => handleCheckInStatusChange(e.target.value)}
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    >
                        {checkInStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

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

export default EventAttendeesFilters;