import React from 'react';
import { Ticket, DollarSign, Eye, TrendingUp, Users, CheckCircle } from 'lucide-react';

import { MyEventAnalytics } from '@/types/dash-events.types';

type Props = {
    analytics: MyEventAnalytics['overview'];
};

const EventAnalyticsOverview = ({ analytics }: Props) => {
    const cards = [
        {
            title: 'Tickets Sold',
            value: `${analytics.tickets_sold}/${analytics.total_tickets}`,
            icon: Ticket,
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            subtitle: `${analytics.sales_percentage.toFixed(1)}% sold`,
            progress: analytics.sales_percentage
        },
        {
            title: 'Gross Revenue',
            value: `GH₵ ${parseFloat(analytics.gross_revenue).toLocaleString('en-GH')}`,
            icon: DollarSign,
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
            subtitle: `Net: GH₵ ${parseFloat(analytics.net_revenue).toLocaleString('en-GH')}`,
            progress: null
        },
        {
            title: 'Avg. Ticket Price',
            value: `GH₵ ${parseFloat(analytics.average_ticket_price).toLocaleString('en-GH')}`,
            icon: TrendingUp,
            iconBg: 'bg-purple-500/20',
            iconColor: 'text-purple-400',
            subtitle: 'Per ticket',
            progress: null
        },
        {
            title: 'Checked In',
            value: `${analytics.tickets_checked_in}/${analytics.tickets_sold}`,
            icon: CheckCircle,
            iconBg: 'bg-accent/20',
            iconColor: 'text-accent-50',
            subtitle: `${analytics.check_in_percentage.toFixed(1)}% attendance`,
            progress: analytics.check_in_percentage
        },
        {
            title: 'Tickets Remaining',
            value: analytics.tickets_remaining.toLocaleString(),
            icon: Users,
            iconBg: 'bg-amber-500/20',
            iconColor: 'text-amber-400',
            subtitle: 'Still available',
            progress: null
        },
        {
            title: 'Projected Revenue',
            value: `GH₵ ${parseFloat(analytics.projected_revenue).toLocaleString('en-GH')}`,
            icon: Eye,
            iconBg: 'bg-pink-500/20',
            iconColor: 'text-pink-400',
            subtitle: 'If sold out',
            progress: null
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                
                return (
                    <div 
                        key={index}
                        className="bg-primary rounded-xl p-6 border-2 border-accent/30 hover:border-accent transition-all duration-300"
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
                            <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                                <Icon className={`w-6 h-6 ${card.iconColor}`} aria-hidden="true" />
                            </div>
                        </div>

                        {/* Progress Bar */}
                        {card.progress !== null && (
                            <div className="w-full bg-primary-100 rounded-full h-2 overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ${
                                        card.iconColor.replace('text-', 'bg-')
                                    }`}
                                    style={{ width: `${card.progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default EventAnalyticsOverview;