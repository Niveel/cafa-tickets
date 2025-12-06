import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { UserStats } from '@/types/dashboard.types';

type Props = {
    revenueData: UserStats['organizing_stats']['revenue_by_month'];
    totalRevenue: string;
};

const DashboardRevenueChart = ({ revenueData, totalRevenue }: Props) => {
    if (!revenueData || revenueData.length === 0) {
        return (
            <section className="bg-primary rounded-xl p-4 border-2 border-accent/70">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                    </div>
                    <h2 className="big-text-3 font-bold text-white">
                        Revenue Overview
                    </h2>
                </div>
                <div className="text-center py-8">
                    <p className="normal-text text-slate-400">No revenue data yet</p>
                </div>
            </section>
        );
    }

    const maxRevenue = Math.max(...revenueData.map(item => parseFloat(item.revenue)));
    const maxTickets = Math.max(...revenueData.map(item => item.tickets_sold));

    const formatMonth = (monthString: string) => {
        const date = new Date(monthString + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <section className="bg-primary rounded-xl p-4 border-2 border-accent/70">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="big-text-3 font-bold text-white">
                            Revenue Overview
                        </h2>
                        <p className="normal-text-2 text-slate-300">
                            Total: <span className="text-emerald-400 font-bold">
                                GH₵ {parseFloat(totalRevenue).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                            </span>
                        </p>
                    </div>
                </div>
                <Calendar className="w-5 h-5 text-slate-400" aria-hidden="true" />
            </div>

            {/* Chart */}
            <div className="space-y-4 overflow-y-auto max-h-96 pr-2">
                {revenueData.map((item, index) => {
                    const revenuePercentage = (parseFloat(item.revenue) / maxRevenue) * 100;
                    const ticketsPercentage = (item.tickets_sold / maxTickets) * 100;

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
                                    <p className="big-text-5 font-bold text-white">
                                        {formatMonth(item.month)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="big-text-5 font-bold text-emerald-400">
                                        GH₵ {parseFloat(item.revenue).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="small-text text-slate-400">
                                        {item.tickets_sold} tickets sold
                                    </p>
                                </div>
                            </div>

                            {/* Revenue Bar */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="small-text text-slate-400">Revenue</p>
                                    <p className="small-text text-emerald-400 font-semibold">
                                        {revenuePercentage.toFixed(0)}%
                                    </p>
                                </div>
                                <div className="w-full bg-primary rounded-full h-3 overflow-hidden">
                                    <div 
                                        className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                                        style={{ width: `${revenuePercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Tickets Bar */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="small-text text-slate-400">Tickets</p>
                                    <p className="small-text text-blue-400 font-semibold">
                                        {ticketsPercentage.toFixed(0)}%
                                    </p>
                                </div>
                                <div className="w-full bg-primary rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                                        style={{ width: `${ticketsPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Divider */}
                            {index < revenueData.length - 1 && (
                                <div className="border-t border-accent/20 pt-4"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-primary rounded-xl border border-accent-50/20">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="small-text text-slate-400 mb-1">Avg. Monthly Revenue</p>
                        <p className="big-text-5 font-bold text-white">
                            GH₵ {(parseFloat(totalRevenue) / revenueData.length).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div>
                        <p className="small-text text-slate-400 mb-1">Total Tickets</p>
                        <p className="big-text-5 font-bold text-white">
                            {revenueData.reduce((sum, item) => sum + item.tickets_sold, 0).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardRevenueChart;