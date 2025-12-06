import React from 'react';
import { UserStats } from '@/types/dashboard.types';
import { TrendingUp } from 'lucide-react';

type Props = {
    ticketsByCategory: UserStats['purchasing_stats']['tickets_by_category'];
    totalSpent: string;
};

const DashboardTicketsByCategory = ({ ticketsByCategory, totalSpent }: Props) => {
    const maxSpent = Math.max(...ticketsByCategory.map(cat => parseFloat(cat.total_spent)));

    return (
        <div role='region' className="bg-primary rounded-xl p-4 border-2 border-accent/70 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="big-text-3 font-bold text-white mb-1">
                        Tickets by Category
                    </h2>
                    <p className="normal-text-2 text-slate-300">
                        Total Spent: <span className="text-accent-50 font-bold">
                            GH₵ {parseFloat(totalSpent).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        </span>
                    </p>
                </div>
                <TrendingUp className="w-5 h-5 text-accent-50" aria-hidden="true" />
            </div>

            <div className="space-y-4">
                {ticketsByCategory.map((category, index) => {
                    const percentage = (parseFloat(category.total_spent) / parseFloat(totalSpent)) * 100;
                    const barWidth = (parseFloat(category.total_spent) / maxSpent) * 100;

                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                        <span className="big-text-5 font-bold text-accent-50">
                                            {category.count}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="normal-text-2 font-semibold text-white">
                                            {category.category}
                                        </p>
                                        <p className="small-text text-slate-400">
                                            {category.count} {category.count === 1 ? 'ticket' : 'tickets'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="normal-text-2 font-bold text-accent-50">
                                        GH₵ {parseFloat(category.total_spent).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="small-text text-slate-400">
                                        {percentage.toFixed(1)}%
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-primary rounded-full h-2 overflow-hidden">
                                <div 
                                    className="h-full bg-linear-to-r from-accent to-accent-100 rounded-full transition-all duration-500"
                                    style={{ width: `${barWidth}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {ticketsByCategory.length === 0 && (
                <div className="text-center py-8">
                    <p className="normal-text text-slate-400">No ticket purchases yet</p>
                </div>
            )}
        </div>
    );
};

export default DashboardTicketsByCategory;