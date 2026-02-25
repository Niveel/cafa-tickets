"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

import { PaymentHistory } from "@/types/payments.types";
import { 
    PaymentHistoryFilters,
    PaymentHistoryList
} from "@/components";

const PaymentHistoryContent = () => {
    const [payments, setPayments] = React.useState<PaymentHistory | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [filters, setFilters] = React.useState({
        status: 'all',
        date_from: '',
        date_to: ''
    });

    const fetchPayments = React.useCallback(async (page: number, filterParams: typeof filters) => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: page.toString(),
                page_size: '10'
            });

            if (filterParams.status !== 'all') {
                params.append('status', filterParams.status);
            }

            if (filterParams.date_from) {
                params.append('date_from', filterParams.date_from);
            }

            if (filterParams.date_to) {
                params.append('date_to', filterParams.date_to);
            }

            const response = await fetch(`/api/dashboard/payment/history?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch payment history');
            }

            const data: PaymentHistory = await response.json();
            setPayments(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    React.useEffect(() => {
        fetchPayments(currentPage, filters);
    }, [currentPage, fetchPayments, filters]);

    const handleFilterChange = React.useCallback((newFilters: typeof filters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to page 1 when filters change
    }, []);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // Scroll to top of payment list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading && !payments) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-accent-50 animate-spin" />
                    <p className="big-text-5 text-slate-300">Loading payment history...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 rounded-xl p-8 border-2 border-red-500/30 text-center">
                <p className="big-text-4 text-red-400 mb-2">Error loading payments</p>
                <p className="normal-text text-red-300">{error}</p>
                <button
                    onClick={() => fetchPayments(currentPage, filters)}
                    className="mt-4 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-100 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!payments) {
        return null;
    }

    const totalPages = Math.ceil(payments.count / 10);
    const hasNextPage = !!payments.next;
    const hasPreviousPage = !!payments.previous;

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <PaymentHistoryFilters onFilterChange={handleFilterChange} />
                    
                </div>

                {/* Payment List */}
                <div className="lg:col-span-3 space-y-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-accent-50 animate-spin" />
                        </div>
                    ) : (
                        <>
                            <PaymentHistoryList payments={payments.results} />

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between bg-primary rounded-xl p-4 border-2 border-accent/30">
                                    <p className="normal-text-2 text-slate-300">
                                        Page {currentPage} of {totalPages}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={!hasPreviousPage}
                                            className="px-4 py-2 bg-accent/20 text-accent-50 rounded-lg font-semibold normal-text-2 hover:bg-accent/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-accent/30"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={!hasNextPage}
                                            className="px-4 py-2 bg-accent text-white rounded-lg font-semibold normal-text-2 hover:bg-accent-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default PaymentHistoryContent;