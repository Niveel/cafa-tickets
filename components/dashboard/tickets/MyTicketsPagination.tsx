"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
    currentPage: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
};

const MyTicketsPagination = ({ currentPage, totalCount, hasNext, hasPrevious }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageSize = 10;
    const totalPages = Math.ceil(totalCount / pageSize);

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/dashboard/tickets?${params.toString()}`);
    };

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    return (
        <div className="flex items-center justify-between py-6 border-t border-accent/30">
            {/* Results Info */}
            <p className="normal-text text-slate-400">
                Showing <span className="font-semibold text-white">{startItem}-{endItem}</span> of{' '}
                <span className="font-semibold text-white">{totalCount}</span> tickets
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={!hasPrevious}
                    className="w-10 h-10 rounded-lg bg-primary-200 hover:bg-primary-100 text-white flex items-center justify-center transition-colors border-2 border-accent/30 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-200 disabled:hover:border-accent/30"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`w-10 h-10 rounded-lg font-semibold normal-text-2 transition-colors border-2 ${
                                    currentPage === pageNum
                                        ? 'bg-accent text-white border-accent'
                                        : 'bg-primary-200 hover:bg-primary-100 text-white border-accent/30 hover:border-accent'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={!hasNext}
                    className="w-10 h-10 rounded-lg bg-primary-200 hover:bg-primary-100 text-white flex items-center justify-center transition-colors border-2 border-accent/30 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-200 disabled:hover:border-accent/30"
                    aria-label="Next page"
                >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default MyTicketsPagination;