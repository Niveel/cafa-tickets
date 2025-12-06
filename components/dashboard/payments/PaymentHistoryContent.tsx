"use client";

import React from 'react';
import { paymentsData } from "@/data/dummy.payments";
import { 
    PaymentHistoryFilters,
    PaymentHistoryList
} from "@/components";

const PaymentHistoryContent = () => {
    const [filteredPayments, setFilteredPayments] = React.useState(paymentsData.results);

    const handleFilterChange = React.useCallback((filters: { status: string; date_from: string; date_to: string }) => {
        let filtered = [...paymentsData.results];

        // Filter by status
        if (filters.status !== 'all') {
            filtered = filtered.filter(payment => payment.status === filters.status);
        }

        // Filter by date range
        if (filters.date_from) {
            const fromDate = new Date(filters.date_from);
            filtered = filtered.filter(payment => new Date(payment.created_at) >= fromDate);
        }

        if (filters.date_to) {
            const toDate = new Date(filters.date_to);
            toDate.setHours(23, 59, 59, 999);
            filtered = filtered.filter(payment => new Date(payment.created_at) <= toDate);
        }

        setFilteredPayments(filtered);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
                <PaymentHistoryFilters onFilterChange={handleFilterChange} />
            </div>

            {/* Payment List */}
            <div className="lg:col-span-3">
                <PaymentHistoryList payments={filteredPayments} />
            </div>
        </div>
    );
};

export default PaymentHistoryContent;