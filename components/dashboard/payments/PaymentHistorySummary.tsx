import React from 'react';
import { DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

import { PaymentHistory } from '@/types/payments.types';

type Props = {
    summary: PaymentHistory['summary'];
};

const PaymentHistorySummary = ({ summary }: Props) => {
    const cards = [
        {
            title: 'Total Spent',
            value: `GH₵ ${parseFloat(summary.total_spent).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            iconBg: 'bg-accent/20',
            iconColor: 'text-accent-50',
            subtitle: 'All time spending'
        },
        {
            title: 'Total Transactions',
            value: summary.total_transactions,
            icon: DollarSign,
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            subtitle: 'All payments'
        },
        {
            title: 'Completed',
            value: summary.completed_transactions,
            icon: CheckCircle,
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
            subtitle: 'Successful payments'
        },
        {
            title: 'Pending',
            value: summary.pending_transactions,
            icon: Clock,
            iconBg: 'bg-amber-500/20',
            iconColor: 'text-amber-400',
            subtitle: 'Processing'
        }
    ];

    const failedTransactions = summary.total_transactions - summary.completed_transactions - summary.pending_transactions;
    
    if (failedTransactions > 0) {
        cards.push({
            title: 'Failed',
            value: failedTransactions,
            icon: XCircle,
            iconBg: 'bg-red-500/20',
            iconColor: 'text-red-400',
            subtitle: 'Failed payments'
        });
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                
                return (
                    <div 
                        key={index}
                        className="bg-primary rounded-xl p-6 border-2 border-accent/30 hover:border-accent transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="normal-text-2 text-slate-300 font-medium mb-2">
                                    {card.title}
                                </p>
                                <h3 className="big-text-2 font-bold text-white mb-1">
                                    {card.value}
                                </h3>
                                <p className="small-text text-slate-400">
                                    {card.subtitle}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className={`w-6 h-6 ${card.iconColor}`} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PaymentHistorySummary;