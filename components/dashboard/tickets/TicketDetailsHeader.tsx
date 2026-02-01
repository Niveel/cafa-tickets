import React from 'react';
import { Ticket, CheckCircle, XCircle, Clock } from 'lucide-react';

import { TicketDetails } from '@/types/tickets.types';

type Props = {
    ticket: TicketDetails;
};

const TicketDetailsHeader = ({ ticket }: Props) => {
    const getStatusConfig = (status: string, isCheckedIn: boolean) => {
        if (isCheckedIn) {
            return {
                icon: CheckCircle,
                color: 'emerald',
                bgColor: 'bg-emerald-500/20',
                textColor: 'text-emerald-400',
                borderColor: 'border-emerald-500/30',
                label: 'Checked In'
            };
        }

        const configs = {
            active: {
                icon: Clock,
                color: 'blue',
                bgColor: 'bg-blue-500/20',
                textColor: 'text-blue-400',
                borderColor: 'border-blue-500/30',
                label: 'Active'
            },
            used: {
                icon: CheckCircle,
                color: 'slate',
                bgColor: 'bg-slate-500/20',
                textColor: 'text-slate-400',
                borderColor: 'border-slate-500/30',
                label: 'Used'
            },
            cancelled: {
                icon: XCircle,
                color: 'red',
                bgColor: 'bg-red-500/20',
                textColor: 'text-red-400',
                borderColor: 'border-red-500/30',
                label: 'Cancelled'
            }
        };

        return configs[status as keyof typeof configs] || configs.active;
    };

    const statusConfig = getStatusConfig(ticket.status, ticket.is_checked_in);
    const StatusIcon = statusConfig.icon;

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Ticket className="w-7 h-7 text-purple-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                        <h1 className="big-text-2 font-bold text-white mb-2">
                            Ticket Details
                        </h1>
                        <p className="normal-text text-slate-300 mb-3">
                            {ticket.event.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold normal-text-2 border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                                <StatusIcon className="w-4 h-4" aria-hidden="true" />
                                {statusConfig.label}
                            </span>
                            <span className="px-4 py-2 bg-primary-200 text-slate-300 rounded-lg font-mono small-text border border-accent/30">
                                {ticket.ticket_id}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Price Badge */}
                <div className="text-right shrink-0">
                    <p className="small-text text-slate-400 mb-1">Amount Paid</p>
                    <p className="big-text-2 font-bold text-emerald-400">
                        GH₵ {parseFloat(ticket.purchase_info.amount_paid).toLocaleString('en-GH')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TicketDetailsHeader;