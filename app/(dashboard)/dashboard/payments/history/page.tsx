import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { 
    PaymentHistorySummary,
    PaymentHistoryContent
} from "@/components";
import { getMyPaymentHistory } from '@/app/lib/dashboard';

const PaymentHistoryPage = async () => {
    const paymentsData = await getMyPaymentHistory();

    if (!paymentsData) {
    return (
        <main className='dash-page space-y-8'>
            {/* Back Button */}
            <Link
                href="/dashboard/payments"
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Revenue Dashboard
            </Link>

            <div className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                <p className="big-text-3 text-white">Unable to load payment history</p>
            </div>
        </main>
    );
}


    return (
        <main className='dash-page space-y-8'>
            {/* Back Button */}
            <Link
                href="/dashboard/payments"
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Revenue Dashboard
            </Link>

            {/* Page Header */}
            <div>
                <h1 className="massive-text font-bold text-white mb-2">
                    Payment History
                </h1>
                <p className="big-text-5 text-slate-200">
                    View all your ticket purchases and transactions
                </p>
            </div>

            {/* Summary Cards */}
            <PaymentHistorySummary summary={paymentsData.summary} />

            {/* Filters & List */}
            <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            }>
                <PaymentHistoryContent />
            </Suspense>
        </main>
    );
};

export default PaymentHistoryPage;