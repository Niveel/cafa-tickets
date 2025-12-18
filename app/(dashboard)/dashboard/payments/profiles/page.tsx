import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { PaymentProfilesContent } from "@/components";
import { getMyPaymentProfiles } from '@/app/lib/dashboard';

const PaymentProfilesPage = async () => {
    const paymentProfiles = await getMyPaymentProfiles();
    
    return (
        <main className='dash-page space-y-6'>
            {/* Back Button */}
            <Link
                href="/dashboard/payments"
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Revenue Dashboard
            </Link>

            {/* Page Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="massive-text font-bold text-white mb-2">
                        Payment Profiles
                    </h1>
                    <p className="big-text-5 text-slate-200">
                        Manage how you receive payments from event sales
                    </p>
                </div>
                <Link
                    href="/dashboard/payments/profiles/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300 hover:scale-[1.02]"
                >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                    Add Payment Profile
                </Link>
            </div>

            {/* Info Card */}
            <div role="region" aria-label="Payment profiles info" className="bg-primary rounded-xl p-6 border-2 border-blue-500/30">
                <h2 className="big-text-4 font-bold text-white mb-3">
                    How Payment Profiles Work
                </h2>
                <div className="space-y-2">
                    <p className="normal-text text-slate-200">
                        • Add your <strong>Mobile Money</strong> (MTN, Vodafone, AirtelTigo) or <strong>Bank Account</strong> to receive payments
                    </p>
                    <p className="normal-text text-slate-200">
                        • A <strong>1 GHS verification fee</strong> will be deducted to verify your account (non-refundable)
                    </p>
                    <p className="normal-text text-slate-200">
                        • Set one profile as <strong>default</strong> for automatic payouts
                    </p>
                    <p className="normal-text text-slate-200">
                        • Transaction fees: <strong>Mobile Money 1.5%</strong> | <strong>Bank Transfer 2.0%</strong>
                    </p>
                </div>
            </div>

            {/* Payment Profiles List */}
            <PaymentProfilesContent initialProfiles={paymentProfiles?.results || []} />
        </main>
    );
};

export default PaymentProfilesPage;