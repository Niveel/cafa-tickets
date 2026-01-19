"use client";
import { Ticket, Calendar, TrendingUp, Wallet, Users, Award } from 'lucide-react';

import { DashboardMetricCard } from '@/components';
import { UserStats } from '@/types/dashboard.types';
import { useCurrency } from '@/contexts/CurrencyContext';

type Props = {
    stats: UserStats;
};

const DashboardOverview = ({ stats }: Props) => {
    const { overview } = stats;
    const { convertFromGHS, formatCurrency, displayCurrency } = useCurrency();

    const getAccountAge = (days: number, display: string) => {
        if (days === 0) return display; // "5h" or "Just now"
        if (days < 30) return `${days} day${days > 1 ? 's' : ''}`;
        if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''}`;
        return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''}`;
    };

    // Helper function to format monetary values
    const formatMoney = (ghsAmount: string | number) => {
        const amount = parseFloat(ghsAmount.toString());
        const localAmount = convertFromGHS(amount);
        return formatCurrency(localAmount);
    };

    return (
        <div role='region' className="space-y-2 p-2">
            {/* Page Header */}
            <div>
                <h1 className="massive-text font-bold text-white mb-2">
                    Dashboard Overview
                </h1>
                <p className="big-text-5 text-slate-200">
                    Welcome back, {stats.username}! Here&apos;s your activity summary.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardMetricCard
                    title="Tickets Purchased"
                    value={overview.tickets_purchased}
                    icon={Ticket}
                    subtitle={`${stats.purchasing_stats.active_tickets} active tickets`}
                    iconBgColor="bg-blue-500/20"
                    iconColor="text-blue-400"
                />

                <DashboardMetricCard
                    title="Events Organized"
                    value={overview.events_organized}
                    icon={Calendar}
                    subtitle={`${stats.organizing_stats.active_events} currently active`}
                    iconBgColor="bg-purple-500/20"
                    iconColor="text-purple-400"
                />

                <DashboardMetricCard
                    title="Events Attended"
                    value={overview.events_attended}
                    icon={Users}
                    subtitle={`${stats.purchasing_stats.upcoming_events} upcoming`}
                    iconBgColor="bg-green-500/20"
                    iconColor="text-green-400"
                />

                <DashboardMetricCard
                    title="Total Spent"
                    value={formatMoney(overview.total_spent)}
                    icon={Wallet}
                    subtitle="On ticket purchases"
                    iconBgColor="bg-accent/20"
                    iconColor="text-accent-50"
                />

                <DashboardMetricCard
                    title="Total Revenue"
                    value={formatMoney(overview.total_revenue)}
                    icon={TrendingUp}
                    subtitle="From event sales"
                    iconBgColor="bg-emerald-500/20"
                    iconColor="text-emerald-400"
                />

                <DashboardMetricCard
                    title="Account Age"
                    value={getAccountAge(overview.account_age_days, overview.account_age_display)}
                    icon={Award}
                    subtitle={`${overview.account_age_days} days total`}
                    iconBgColor="bg-amber-500/20"
                    iconColor="text-amber-400"
                />
            </div>
        </div>
    );
};

export default DashboardOverview;