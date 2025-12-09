import React from 'react';
import { Ticket } from 'lucide-react';

type Props = {
    totalCount: number;
};

const MyTicketsHeader = ({ totalCount }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-1 font-bold text-white">
                        My Tickets
                    </h1>
                    <p className="normal-text text-slate-400">
                        {totalCount} ticket{totalCount !== 1 ? 's' : ''} purchased
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyTicketsHeader;