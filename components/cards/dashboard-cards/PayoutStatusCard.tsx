import { TrendingUp, Calendar, DollarSign, BarChart3, Wallet, Clock } from 'lucide-react';

import { RevenueSummary } from '@/types/payments.types';

type Props = {
    payoutStatus: RevenueSummary['payout_status'];
    summary?: RevenueSummary['summary'];
    revenueByMonth?: RevenueSummary['revenue_by_month'];
};

const PayoutStatusCard = ({ payoutStatus, summary, revenueByMonth }: Props) => {
    // Calculate actual monthly growth
    const calculateMonthlyGrowth = () => {
        if (!revenueByMonth || revenueByMonth.length < 2) {
            return 0;
        }

        // revenueByMonth is sorted desc (most recent first)
        const thisMonth = parseFloat(revenueByMonth[0].gross_revenue);
        const lastMonth = parseFloat(revenueByMonth[1].gross_revenue);

        if (lastMonth === 0) {
            return thisMonth > 0 ? 100 : 0;
        }

        return ((thisMonth - lastMonth) / lastMonth) * 100;
    };

    const monthlyGrowth = calculateMonthlyGrowth();
    const isPositiveGrowth = monthlyGrowth >= 0;
    
    const topPerformingCategory = 'Music Events'; // Mock data - would come from backend
    const averageTicketPrice = summary ? parseFloat(summary.average_ticket_price) : 0;
    const totalEvents = summary?.total_events || 0;
    const totalTicketsSold = summary?.total_tickets_sold || 0;
    const currentBalance = parseFloat(payoutStatus.available_balance);
    const totalRevenue = parseFloat(payoutStatus.total_paid_out);

    return (
        <div role="region" aria-label="Revenue insights" className="bg-primary rounded-xl p-6 border-2 border-accent">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="big-text-3 font-bold text-white">
                            Revenue Insights
                        </h2>
                        <p className="small-text text-slate-300">
                            Your earnings analytics
                        </p>
                    </div>
                </div>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Total Revenue */}
                <div className="p-4 bg-primary-200 rounded-xl border border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        <p className="small-text text-slate-400">Total Revenue</p>
                    </div>
                    <p className="big-text-3 font-bold text-emerald-400">
                        GH₵ {totalRevenue.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="small-text-2 text-slate-400 mt-1">
                        All time earnings
                    </p>
                </div>

                {/* Current Balance */}
                <div className="p-4 bg-primary-200 rounded-xl border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-2">
                        <Wallet className="w-4 h-4 text-blue-400" aria-hidden="true" />
                        <p className="small-text text-slate-400">Current Balance</p>
                    </div>
                    <p className="big-text-3 font-bold text-blue-400">
                        GH₵ {currentBalance.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                    </p>
                    {revenueByMonth && revenueByMonth.length >= 2 ? (
                        <div className="flex items-center gap-1 mt-1">
                            <TrendingUp 
                                className={`w-3 h-3 ${isPositiveGrowth ? 'text-emerald-400' : 'text-red-400 rotate-180'}`} 
                                aria-hidden="true" 
                            />
                            <p className={`small-text-2 font-semibold ${isPositiveGrowth ? 'text-emerald-400' : 'text-red-400'}`}>
                                {isPositiveGrowth ? '+' : ''}{Math.abs(monthlyGrowth).toFixed(1)}% growth
                            </p>
                        </div>
                    ) : (
                        <p className="small-text-2 text-slate-400 mt-1">
                            Available to withdraw
                        </p>
                    )}
                </div>

                {/* Average Ticket Price */}
                <div className="p-4 bg-primary-200 rounded-xl border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-purple-400" aria-hidden="true" />
                        <p className="small-text text-slate-400">Avg. Ticket Price</p>
                    </div>
                    <p className="big-text-3 font-bold text-purple-400">
                        GH₵ {averageTicketPrice.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="small-text-2 text-slate-400 mt-1">
                        Per ticket
                    </p>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-primary-200 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-3">
                        <Wallet className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        <p className="normal-text-2 text-slate-200">Current Balance</p>
                    </div>
                    <p className="normal-text-2 font-bold text-emerald-400">
                        GH₵ {currentBalance.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                    </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-primary-200 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <p className="normal-text-2 text-slate-200">Top Category</p>
                    </div>
                    <p className="normal-text-2 font-bold text-white">{topPerformingCategory}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-primary-200 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <p className="normal-text-2 text-slate-200">Total Events</p>
                    </div>
                    <p className="normal-text-2 font-bold text-white">{totalEvents} events</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-primary-200 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <p className="normal-text-2 text-slate-200">Total Tickets Sold</p>
                    </div>
                    <p className="normal-text-2 font-bold text-white">{totalTicketsSold.toLocaleString()} tickets</p>
                </div>
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="small-text text-blue-300">
                    💡 Payments are sent directly to your verified payment profile after each ticket purchase. Platform fees are automatically deducted.
                </p>
            </div>
        </div>
    );
};

export default PayoutStatusCard;