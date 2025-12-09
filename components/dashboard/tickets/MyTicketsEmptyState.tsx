import React from 'react';
import Link from 'next/link';
import { Ticket, Search } from 'lucide-react';

type Props = {
    hasFilters: boolean;
};

const MyTicketsEmptyState = ({ hasFilters }: Props) => {
    if (hasFilters) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-slate-500/20 flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-slate-400" aria-hidden="true" />
                </div>
                <h2 className="big-text-2 font-bold text-white mb-3 text-center">
                    No Tickets Found
                </h2>
                <p className="normal-text text-slate-400 text-center max-w-md mb-6">
                    We couldn&apos;t find any tickets matching your filters. Try adjusting your search criteria or clear all filters.
                </p>
                <Link
                    href="/dashboard/tickets"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text-2 transition-colors"
                >
                    Clear Filters
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                <Ticket className="w-10 h-10 text-purple-400" aria-hidden="true" />
            </div>
            <h2 className="big-text-2 font-bold text-white mb-3 text-center">
                No Tickets Yet
            </h2>
            <p className="normal-text text-slate-400 text-center max-w-md mb-6">
                You haven&apos;t purchased any tickets yet. Browse events and get your tickets to amazing experiences across Ghana!
            </p>
            <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text-2 transition-colors"
            >
                <Ticket className="w-5 h-5" aria-hidden="true" />
                Browse Events
            </Link>
        </div>
    );
};

export default MyTicketsEmptyState;