import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { RevenueSummary } from '@/types/payments.types';

type Props = {
    revenueByMonth: RevenueSummary['revenue_by_month'];
};

const RevenueByMonthChart = ({ revenueByMonth }: Props) => {
    if (!revenueByMonth || revenueByMonth.length === 0) {
        return (
            <div role="region" aria-label="Monthly revenue" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <div className="text-center py-12">
                    <p className="normal-text text-slate-400">No monthly revenue data yet</p>
                </div>
            </div>
        );
    }

    const maxRevenue = Math.max(...revenueByMonth.map(item => parseFloat(item.gross_revenue)));
    const maxTickets = Math.max(...revenueByMonth.map(item => item.tickets_sold));

    const formatMonth = (monthString: string) => {
        const date = new Date(monthString + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div role="region" aria-label="Monthly revenue" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="big-text-3 font-bold text-white">
                            Monthly Revenue
                        </h2>
                        <p className="small-text text-slate-300">
                            Last {revenueByMonth.length} months
                        </p>
                    </div>
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            </div>

            {/* Chart */}
            <div className="space-y-6">
                {revenueByMonth.map((month, index) => {
                    const revenuePercentage = (parseFloat(month.gross_revenue) / maxRevenue) * 100;
                    const ticketsPercentage = (month.tickets_sold / maxTickets) * 100;

                    return (
                        <div key={index} className="space-y-3">
                            {/* Month Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                                        <span className="small-text font-bold text-accent-50">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="big-text-5 font-bold text-white">
                                            {formatMonth(month.month)}
                                        </p>
                                        <p className="small-text text-slate-400">
                                            {month.tickets_sold} tickets sold
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="big-text-5 font-bold text-emerald-400">
                                        GH₵ {parseFloat(month.gross_revenue).toLocaleString('en-GH')}
                                    </p>
                                    <p className="small-text text-slate-400">
                                        Net: GH₵ {parseFloat(month.net_revenue).toLocaleString('en-GH')}
                                    </p>
                                </div>
                            </div>

                            {/* Revenue Bar */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="small-text text-slate-400">Gross Revenue</p>
                                    <p className="small-text text-emerald-400 font-semibold">
                                        {revenuePercentage.toFixed(0)}%
                                    </p>
                                </div>
                                <div className="w-full bg-primary-100 rounded-full h-3 overflow-hidden">
                                    <div 
                                        className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                                        style={{ width: `${revenuePercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Tickets Bar */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="small-text text-slate-400">Tickets Sold</p>
                                    <p className="small-text text-blue-400 font-semibold">
                                        {ticketsPercentage.toFixed(0)}%
                                    </p>
                                </div>
                                <div className="w-full bg-primary-100 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                                        style={{ width: `${ticketsPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Platform Fee Info */}
                            <div className="flex items-center justify-between pt-2 border-t border-accent/10">
                                <p className="small-text text-slate-400">Platform Fee (5%)</p>
                                <p className="small-text text-accent-50 font-semibold">
                                    -GH₵ {parseFloat(month.platform_fee).toLocaleString('en-GH')}
                                </p>
                            </div>

                            {/* Divider */}
                            {index < revenueByMonth.length - 1 && (
                                <div className="border-t border-accent/20 pt-6"></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RevenueByMonthChart;