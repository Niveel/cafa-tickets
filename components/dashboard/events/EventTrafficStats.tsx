import React from 'react';
import { Eye, Users, TrendingUp } from 'lucide-react';

import { MyEventAnalytics } from '@/types/dash-events.types';

type Props = {
    traffic: MyEventAnalytics['traffic'];
    ticketsSold: number;
};

const EventTrafficStats = ({ traffic, ticketsSold }: Props) => {
    return (
        <div role="region" aria-label="Traffic statistics" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </div>
                <h2 className="big-text-3 font-bold text-white">
                    Traffic & Conversion
                </h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-primary-200 rounded-xl border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-blue-400" aria-hidden="true" />
                        <p className="small-text text-slate-400">Page Views</p>
                    </div>
                    <p className="big-text-3 font-bold text-blue-400">
                        {traffic.page_views.toLocaleString()}
                    </p>
                </div>

                <div className="p-4 bg-primary-200 rounded-xl border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-purple-400" aria-hidden="true" />
                        <p className="small-text text-slate-400">Unique Visitors</p>
                    </div>
                    <p className="big-text-3 font-bold text-purple-400">
                        {traffic.unique_visitors.toLocaleString()}
                    </p>
                </div>

                <div className="p-4 bg-primary-200 rounded-xl border border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        <p className="small-text text-slate-400">Conversion Rate</p>
                    </div>
                    <p className="big-text-3 font-bold text-emerald-400">
                        {traffic.conversion_rate.toFixed(2)}%
                    </p>
                </div>
            </div>

            {/* Conversion Funnel */}
            <div className="space-y-3">
                <p className="normal-text-2 font-semibold text-white mb-4">
                    Conversion Funnel
                </p>

                {/* Page Views */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="small-text text-slate-400">Page Views</p>
                        <p className="small-text font-semibold text-white">
                            {traffic.page_views.toLocaleString()} (100%)
                        </p>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-3 overflow-hidden">
                        <div 
                            className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {/* Unique Visitors */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="small-text text-slate-400">Unique Visitors</p>
                        <p className="small-text font-semibold text-white">
                            {traffic.unique_visitors.toLocaleString()} ({((traffic.unique_visitors / traffic.page_views) * 100).toFixed(1)}%)
                        </p>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-3 overflow-hidden">
                        <div 
                            className="h-full bg-linear-to-r from-purple-500 to-purple-400 rounded-full"
                            style={{ width: `${(traffic.unique_visitors / traffic.page_views) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Tickets Sold */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="small-text text-slate-400">Tickets Sold (Conversions)</p>
                        <p className="small-text font-semibold text-emerald-400">
                            {ticketsSold.toLocaleString()} ({traffic.conversion_rate.toFixed(2)}%)
                        </p>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-3 overflow-hidden">
                        <div 
                            className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full"
                            style={{ width: `${traffic.conversion_rate}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="small-text text-blue-300">
                    💡 Conversion rate = (Tickets Sold ÷ Unique Visitors) × 100
                </p>
            </div>
        </div>
    );
};

export default EventTrafficStats;