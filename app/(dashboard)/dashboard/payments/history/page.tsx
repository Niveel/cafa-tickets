import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { paymentsData } from "@/data/dummy.payments";
import { 
    PaymentHistorySummary,
    PaymentHistoryContent
} from "@/components";

const PaymentHistoryPage = () => {
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