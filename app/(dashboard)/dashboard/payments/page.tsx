import Link from 'next/link';
import { Receipt, Wallet } from 'lucide-react';

import {
    PayoutStatusCard,
    RevenueByEventTable,
    RevenueByMonthChart
} from "@/components";
import { getMyRevenueSummary } from '@/app/lib/dashboard';

const PaymentsPage = async () => {
    const revenueSummary = await getMyRevenueSummary();

    console.log("Revenue Summary:", revenueSummary);

    if (!revenueSummary) {
        return (
            <main className='dash-page space-y-8'>
                <div className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                    <p className="big-text-3 text-white">Unable to load revenue data</p>
                </div>
            </main>
        );
    }

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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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