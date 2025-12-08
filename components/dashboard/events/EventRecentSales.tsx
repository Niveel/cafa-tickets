import React from 'react';
import { Clock } from 'lucide-react';
import { MyEventAnalytics } from '@/types/dash-events.types';

type Props = {
    recentSales: MyEventAnalytics['recent_sales'];
};

const EventRecentSales = ({ recentSales }: Props) => {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString('en-GH', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (recentSales.length === 0) {
        return (
            <div role="region" aria-label="Recent sales" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                    </div>
                    <h2 className="big-text-3 font-bold text-white">
                        Recent Sales
                    </h2>
                </div>
                <p className="normal-text text-slate-400 text-center py-8">
                    No sales yet for this event
                </p>
            </div>
        );
    }

    return (
        <div role="region" aria-label="Recent sales" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                </div>
                <h2 className="big-text-3 font-bold text-white">
                    Recent Sales
                </h2>
            </div>

            {/* Sales List */}
            <div className="space-y-3">
                {recentSales.map((sale, index) => (
                    <div 
                        key={index}
                        className="p-4 bg-primary-200 rounded-xl border border-accent/20 hover:border-accent transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                                <p className="big-text-5 font-bold text-white mb-1">
                                    {sale.buyer_name}
                                </p>
                                <p className="small-text text-slate-400">
                                    {sale.ticket_type}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="big-text-5 font-bold text-emerald-400">
                                    GH₵ {parseFloat(sale.amount).toLocaleString('en-GH')}
                                </p>
                                <p className="small-text text-slate-400">
                                    {formatDateTime(sale.purchase_date)}
                                </p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-accent/10">
                            <p className="small-text text-slate-500 font-mono">
                                {sale.ticket_id}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventRecentSales;