import Link from 'next/link';
import { ShoppingCart, Plus, DollarSign, Clock } from 'lucide-react';

import { UserStats } from '@/types/dashboard.types';

type Props = {
    activities: UserStats['recent_activity'];
};

const DashboardRecentActivity = ({ activities }: Props) => {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'ticket_purchase':
                return ShoppingCart;
            case 'event_created':
                return Plus;
            case 'ticket_sale':
                return DollarSign;
            default:
                return Clock;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'ticket_purchase':
                return 'bg-blue-500/20 text-blue-400';
            case 'event_created':
                return 'bg-purple-500/20 text-purple-400';
            case 'ticket_sale':
                return 'bg-emerald-500/20 text-emerald-400';
            default:
                return 'bg-slate-500/20 text-slate-400';
        }
    };

    const getActivityLabel = (type: string) => {
        switch (type) {
            case 'ticket_purchase':
                return 'Ticket Purchased';
            case 'event_created':
                return 'Event Created';
            case 'ticket_sale':
                return 'Ticket Sold';
            default:
                return 'Activity';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString('en-GH', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    return (
        <div role='region' className="bg-primary rounded-xl p-6 border-2 border-accent/70">
            <div className="flex items-center justify-between mb-6">
                <h2 className="big-text-3 font-bold text-white">
                    Recent Activity
                </h2>
                <Clock className="w-5 h-5 text-slate-400" aria-hidden="true" />
            </div>

            <div className="space-y-4">
                {activities.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="normal-text text-slate-400">No recent activity</p>
                    </div>
                ) : (
                    activities.map((activity, index) => {
                        const Icon = getActivityIcon(activity.type);
                        const colorClass = getActivityColor(activity.type);

                        return (
                            <div 
                                key={index}
                                className="flex items-start gap-4 p-4 bg-primary-100 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300"
                            >
                                <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center shrink-0`}>
                                    <Icon className="w-5 h-5" aria-hidden="true" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className="normal-text-2 font-semibold text-white">
                                            {getActivityLabel(activity.type)}
                                        </p>
                                        <span className="small-text text-slate-400 shrink-0">
                                            {formatDate(activity.date)}
                                        </span>
                                    </div>
                                    <p className="normal-text-2 text-slate-300 truncate">
                                        {activity.event_title}
                                    </p>
                                    {activity.amount && (
                                        <p className="small-text text-accent-50 font-semibold mt-1">
                                            GH₵ {parseFloat(activity.amount).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* {activities.length > 0 && (
                <div className="mt-4 text-center">
                    <Link
                        href="/dashboard/activities" 
                        className="normal-text-2 text-accent-50 hover:text-accent-100 font-semibold transition-colors"
                        type="button"
                    >
                        View All Activities →
                    </Link>
                </div>
            )} */}
        </div>
    );
};

export default DashboardRecentActivity;