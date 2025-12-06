"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Calendar, X } from 'lucide-react';

type Props = {
    onFilterChange: (filters: { status: string; date_from: string; date_to: string }) => void;
};

const PaymentHistoryFilters = ({ onFilterChange }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [status, setStatus] = React.useState(searchParams.get('status') || 'all');
    const [dateFrom, setDateFrom] = React.useState(searchParams.get('date_from') || '');
    const [dateTo, setDateTo] = React.useState(searchParams.get('date_to') || '');

    const statusOptions = [
        { value: 'all', label: 'All Payments' },
        { value: 'completed', label: 'Completed' },
        { value: 'pending', label: 'Pending' },
        { value: 'failed', label: 'Failed' }
    ];

    const updateURL = React.useCallback((newStatus: string, newDateFrom: string, newDateTo: string) => {
        const params = new URLSearchParams();
        
        if (newStatus !== 'all') params.set('status', newStatus);
        if (newDateFrom) params.set('date_from', newDateFrom);
        if (newDateTo) params.set('date_to', newDateTo);

        const queryString = params.toString();
        router.push(`/dashboard/payments/history${queryString ? `?${queryString}` : ''}`, { scroll: false });

        onFilterChange({
            status: newStatus,
            date_from: newDateFrom,
            date_to: newDateTo
        });
    }, [router, onFilterChange]);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        updateURL(newStatus, dateFrom, dateTo);
    };

    const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDateFrom = e.target.value;
        setDateFrom(newDateFrom);
        updateURL(status, newDateFrom, dateTo);
    };

    const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDateTo = e.target.value;
        setDateTo(newDateTo);
        updateURL(status, dateFrom, newDateTo);
    };

    const clearFilters = () => {
        setStatus('all');
        setDateFrom('');
        setDateTo('');
        updateURL('all', '', '');
    };

    const hasActiveFilters = status !== 'all' || dateFrom || dateTo;

    return (
        <div role="region" aria-label="Payment filters" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-accent-50" aria-hidden="true" />
                </div>
                <h2 className="big-text-4 font-bold text-white">
                    Filters
                </h2>
            </div>

            <div className="space-y-4">
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

                {/* Date From */}
                <div>
                    <label htmlFor="date-from" className="flex items-center gap-2 normal-text-2 text-slate-300 font-medium mb-2">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        From Date
                    </label>
                    <input
                        type="date"
                        id="date-from"
                        value={dateFrom}
                        onChange={handleDateFromChange}
                        max={dateTo || undefined}
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 scheme-dark"
                    />
                </div>

                {/* Date To */}
                <div>
                    <label htmlFor="date-to" className="flex items-center gap-2 normal-text-2 text-slate-300 font-medium mb-2">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        To Date
                    </label>
                    <input
                        type="date"
                        id="date-to"
                        value={dateTo}
                        onChange={handleDateToChange}
                        min={dateFrom || undefined}
                        className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 scheme-dark"
                    />
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

export default PaymentHistoryFilters;