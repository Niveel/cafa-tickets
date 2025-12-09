"use client";

import React, { Suspense } from 'react';
import { MyTicketsResponse } from '@/types/tickets.types';
import { Loader2 } from 'lucide-react';
import {
    MyTicketsHeader,
    MyTicketsFilters,
    MyTicketsGrid,
    MyTicketsEmptyState,
    MyTicketsPagination
} from '@/components';

type Props = {
    tickets: MyTicketsResponse;
    searchParams: {
        status?: string;
        search?: string;
        category?: string;
        page?: string;
    };
};

const MyTicketsContent = ({ tickets, searchParams }: Props) => {
    const status = searchParams.status || 'all';
    const search = searchParams.search || '';
    const category = searchParams.category || '';
    const page = parseInt(searchParams.page || '1');

    const hasTickets = tickets.results.length > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <MyTicketsHeader totalCount={tickets.count} />

            {/* Filters */}
            <Suspense fallback={
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-accent animate-spin" />
                </div>
            }>
                <MyTicketsFilters 
                    currentStatus={status}
                    currentCategory={category}
                    currentSearch={search}
                />
            </Suspense>

            {/* Tickets Grid or Empty State */}
            <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            }>
                {hasTickets ? (
                    <>
                        <MyTicketsGrid tickets={tickets.results} />
                        
                        {/* Pagination */}
                        {tickets.count > 10 && (
                            <MyTicketsPagination 
                                currentPage={page}
                                totalCount={tickets.count}
                                hasNext={!!tickets.next}
                                hasPrevious={!!tickets.previous}
                            />
                        )}
                    </>
                ) : (
                    <MyTicketsEmptyState 
                        hasFilters={!!(status !== 'all' || search || category)}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default MyTicketsContent;