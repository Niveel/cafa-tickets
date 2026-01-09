import Link from 'next/link';
import { Receipt, Wallet } from 'lucide-react';

import {
    PayoutStatusCard,
    RevenueByEventTable,
    RevenueByMonthChart,
    RequestPayoutButton
} from "@/components";
import { getMyRevenueSummary, getMyPaymentProfiles } from '@/app/lib/dashboard';

const PaymentsPage = async () => {
    const [revenueSummary, paymentProfiles] = await Promise.all([
        getMyRevenueSummary(),
        getMyPaymentProfiles()
    ]);

    if (!revenueSummary) {
        return (
            <main className='dash-page space-y-8'>
                <div className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                    <p className="big-text-3 text-white">Unable to load revenue data</p>
                </div>
            </main>
        );
    }

    // Check if user has verified payment profile
    const hasVerifiedProfile = paymentProfiles?.results?.some(
        profile => profile.is_default && profile.is_verified
    ) ?? false;

    return (
        <main className='dash-page space-y-8'>
            {/* Page Header */}
            <div>
                <h1 className="massive-text font-bold text-white mb-2">
                    Revenue Dashboard
                </h1>
                <p className="big-text-5 text-slate-200">
                    Track your earnings and manage payouts
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <RequestPayoutButton
                    availableBalance={revenueSummary.payout_status.available_balance}
                    pendingBalance={revenueSummary.payout_status.pending_balance}
                    hasVerifiedProfile={hasVerifiedProfile}
                />

                <Link
                    href="/dashboard/payments/history"
                    className="group p-6 bg-primary rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300 hover:scale-[1.02]"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Receipt className="w-6 h-6 text-blue-400" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="big-text-5 font-bold text-white">Payment History</p>
                            <p className="small-text text-slate-300">View ticket purchases</p>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/dashboard/payments/profiles"
                    className="group p-6 bg-primary rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300 hover:scale-[1.02]"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Wallet className="w-6 h-6 text-purple-400" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="big-text-5 font-bold text-white">Payment Profiles</p>
                            <p className="small-text text-slate-300">Manage payout methods</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Payout Status */}
            <PayoutStatusCard
                payoutStatus={revenueSummary.payout_status}
                summary={revenueSummary.summary}
                revenueByMonth={revenueSummary.revenue_by_month}
            />

            {/* Two Column Layout - Revenue by Event & Monthly Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RevenueByEventTable revenueByEvent={revenueSummary.revenue_by_event} />
                <RevenueByMonthChart revenueByMonth={revenueSummary.revenue_by_month} />
            </div>
        </main>
    );
};

export default PaymentsPage;