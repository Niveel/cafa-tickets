import React from 'react';
import Link from 'next/link';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { RevenueSummary } from '@/types/payments.types';

type Props = {
    revenueByEvent: RevenueSummary['revenue_by_event'];
};

const RevenueByEventTable = ({ revenueByEvent }: Props) => {
    return (
        <div role="region" aria-label="Revenue by event" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-purple-400" aria-hidden="true" />
                    </div>
                    <h2 className="big-text-3 font-bold text-white">
                        Revenue by Event
                    </h2>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-accent/20">
                            <th className="text-left py-3 px-2 small-text text-slate-400 font-semibold">
                                Event
                            </th>
                            <th className="text-right py-3 px-2 small-text text-slate-400 font-semibold">
                                Tickets Sold
                            </th>
                            <th className="text-right py-3 px-2 small-text text-slate-400 font-semibold">
                                Gross Revenue
                            </th>
                            <th className="text-right py-3 px-2 small-text text-slate-400 font-semibold">
                                Platform Fee
                            </th>
                            <th className="text-right py-3 px-2 small-text text-slate-400 font-semibold">
                                Net Revenue
                            </th>
                            <th className="text-right py-3 px-2 small-text text-slate-400 font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {revenueByEvent.map((event, index) => (
                            <tr 
                                key={index}
                                className="border-b border-accent/10 hover:bg-primary-200 transition-colors duration-200"
                            >
                                <td className="py-4 px-2">
                                    <p className="normal-text-2 font-semibold text-white">
                                        {event.event_title}
                                    </p>
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <p className="normal-text-2 text-slate-200">
                                        {event.tickets_sold}
                                    </p>
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <p className="normal-text-2 font-semibold text-white">
                                        GH₵ {parseFloat(event.gross_revenue).toLocaleString('en-GH')}
                                    </p>
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <p className="normal-text-2 text-accent-50">
                                        -GH₵ {parseFloat(event.platform_fee).toLocaleString('en-GH')}
                                    </p>
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <p className="normal-text-2 font-bold text-emerald-400">
                                        GH₵ {parseFloat(event.net_revenue).toLocaleString('en-GH')}
                                    </p>
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <Link
                                        href={`/dashboard/events/${event.event_id}`}
                                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors small-text font-semibold"
                                    >
                                        View
                                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {revenueByEvent.length === 0 && (
                <div className="text-center py-12">
                    <p className="normal-text text-slate-400">No revenue data yet</p>
                    <Link
                        href="/dashboard/events/create"
                        className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-colors"
                    >
                        Create Your First Event
                    </Link>
                </div>
            )}
        </div>
    );
};

export default RevenueByEventTable;