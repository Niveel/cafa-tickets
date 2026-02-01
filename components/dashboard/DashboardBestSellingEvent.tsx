import React from 'react';
import Link from 'next/link';
import { Trophy, TrendingUp, Users, ArrowRight } from 'lucide-react';

import { UserStats } from '@/types/dashboard.types';

type Props = {
    bestSellingEvent: UserStats['organizing_stats']['best_selling_event'];
    totalTicketsSold: number;
};

const DashboardBestSellingEvent = ({ bestSellingEvent, totalTicketsSold }: Props) => {
    if (!bestSellingEvent) {
        return (
            <section className="bg-primary rounded-xl p-4 border-2 border-accent/70">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-amber-400" aria-hidden="true" />
                    </div>
                    <h2 className="big-text-3 font-bold text-white">
                        Best Selling Event
                    </h2>
                </div>
                <div className="text-center py-6">
                    <p className="normal-text text-slate-400">No events created yet</p>
                    <Link 
                        href="/dashboard/events/create"
                        className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-100 transition-colors"
                    >
                        Create Your First Event
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        );
    }

    const percentage = (bestSellingEvent.tickets_sold / totalTicketsSold) * 100;

    return (
        <div role='region' className="bg-linear-to-br from-amber-500/10 via-primary-100 to-primary-100 rounded-xl p-4 border-2 border-amber-500 hover:border-amber-500/50 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-amber-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-white">
                        Best Selling Event
                    </h2>
                    <p className="small-text text-slate-300">
                        Your top performer
                    </p>
                </div>
            </div>

            {/* Event Info */}
            <div className="bg-primary rounded-xl p-5 mb-4 border border-amber-500/20">
                <h3 className="big-text-4 font-bold text-white mb-4">
                    {bestSellingEvent.title}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="small-text text-slate-400">Tickets Sold</p>
                        <div className="flex items-baseline gap-2">
                            <p className="big-text-3 font-bold text-amber-400">
                                {bestSellingEvent.tickets_sold.toLocaleString()}
                            </p>
                            <span className="small-text text-slate-400">tickets</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="small-text text-slate-400">Share of Total</p>
                        <div className="flex items-baseline gap-2">
                            <p className="big-text-3 font-bold text-emerald-400">
                                {percentage.toFixed(1)}%
                            </p>
                            <span className="small-text text-slate-400">of sales</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="w-full bg-primary-100 rounded-full h-2 overflow-hidden">
                        <div 
                            className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/50 rounded-lg p-3 border border-accent/20">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        <p className="small-text text-slate-400">Performance</p>
                    </div>
                    <p className="normal-text font-bold text-white">Excellent</p>
                </div>

                <div className="bg-primary/50 rounded-lg p-3 border border-accent/20">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-blue-400" aria-hidden="true" />
                        <p className="small-text text-slate-400">Total Sales</p>
                    </div>
                    <p className="normal-text font-bold text-white">{totalTicketsSold}</p>
                </div>
            </div>

            {/* View Event Link */}
            <Link 
                href={`/events/${bestSellingEvent.id}`}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl font-semibold normal-text-2 transition-all duration-300 border border-amber-500/30 hover:border-amber-500/50"
            >
                View Event Details
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
};

export default DashboardBestSellingEvent;