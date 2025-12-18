import { PaymentDetailsCard } from "@/components";
import { getPaymentDetailsById } from "@/app/lib/dashboard";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

type PaymentDetailsPageProps = {
    params: Promise<{ payment_id: string }>;
};

const PaymentDetailsPage = async ({ params }: PaymentDetailsPageProps) => {
    const { payment_id } = await params;
    const paymentDetails = await getPaymentDetailsById(payment_id);

    // ✅ Handle null case - payment not found
    if (!paymentDetails) {
        return (
            <main className='dash-page'>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center max-w-md">
                        {/* Icon */}
                        <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-10 h-10 text-red-400" aria-hidden="true" />
                        </div>

                        {/* Title */}
                        <h1 className="big-text-2 font-bold text-white mb-3">
                            Payment Details Not Found
                        </h1>

                        {/* Description */}
                        <p className="normal-text text-slate-300 mb-8">
                            The payment details you&apos;re looking for don&apos;t exist or may have been removed.
                        </p>

                        {/* Actions */}
                        <div className="flex items-center justify-center gap-4">
                            <Link
                                href="/dashboard/payments"
                                className="px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                            >
                                View All Payments
                            </Link>
                            <Link
                                href="/dashboard"
                                className="px-6 py-3 bg-primary-100 text-white rounded-xl font-semibold normal-text-2 hover:bg-primary-200 transition-all duration-300 border-2 border-accent/30"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='dash-page'>
            <PaymentDetailsCard payment={paymentDetails} />
        </main>
    );
};

export default PaymentDetailsPage;