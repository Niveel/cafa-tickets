import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Smartphone, CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react';
import { PaymentHistory } from '@/types/payments.types';

type Props = {
    payments: PaymentHistory['results'];
};

const PaymentHistoryList = ({ payments }: Props) => {
    const getPaymentMethodIcon = (method: string) => {
        if (method === 'card') return CreditCard;
        if (method === 'mobile_money') return Smartphone;
        return CreditCard;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return {
                    icon: CheckCircle,
                    text: 'Completed',
                    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                };
            case 'pending':
                return {
                    icon: Clock,
                    text: 'Pending',
                    className: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                };
            case 'failed':
                return {
                    icon: XCircle,
                    text: 'Failed',
                    className: 'bg-red-500/20 text-red-400 border-red-500/30'
                };
            default:
                return {
                    icon: Clock,
                    text: status,
                    className: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                };
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (payments.length === 0) {
        return (
            <div role="region" aria-label="Payment history" className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                <p className="big-text-4 text-slate-400 mb-4">No payments found</p>
                <p className="normal-text text-slate-500">
                    Try adjusting your filters or browse events to purchase tickets.
                </p>
                <Link
                    href="/events"
                    className="inline-block mt-6 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-colors"
                >
                    Browse Events
                </Link>
            </div>
        );
    }

    return (
        <div role="region" aria-label="Payment history" className="space-y-4">
            {payments.map((payment, index) => {
                const PaymentMethodIcon = getPaymentMethodIcon(payment.payment_method);
                const statusBadge = getStatusBadge(payment.status);
                const StatusIcon = statusBadge.icon;

                return (
                    <div 
                        key={index}
                        className="bg-primary rounded-xl p-6 border-2 border-accent/30 hover:border-accent transition-all duration-300 group"
                    >
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Event Image */}
                            <div className="relative w-full lg:w-32 h-32 rounded-xl overflow-hidden shrink-0 ring-2 ring-accent/30 group-hover:ring-accent transition-all duration-300">
                                <Image
                                    src={payment.event.featured_image}
                                    alt={payment.event.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Payment Info */}
                            <div className="flex-1 space-y-4">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <Link 
                                            href={`/events/${payment.event.slug}`}
                                            className="big-text-4 font-bold text-white hover:text-accent-50 transition-colors"
                                        >
                                            {payment.event.title}
                                        </Link>
                                        <p className="small-text text-slate-400 mt-1">
                                            {formatDate(payment.created_at)}
                                        </p>
                                    </div>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold small-text border ${statusBadge.className}`}>
                                        <StatusIcon className="w-4 h-4" aria-hidden="true" />
                                        {statusBadge.text}
                                    </div>
                                </div>

                                {/* Payment Details Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                        <p className="small-text text-slate-400 mb-1">Amount</p>
                                        <p className="big-text-5 font-bold text-white">
                                            GH₵ {parseFloat(payment.amount).toLocaleString('en-GH')}
                                        </p>
                                    </div>

                                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                        <p className="small-text text-slate-400 mb-1">Tickets</p>
                                        <p className="big-text-5 font-bold text-white">
                                            {payment.tickets.length}
                                        </p>
                                    </div>

                                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <PaymentMethodIcon className="w-3 h-3 text-slate-400" aria-hidden="true" />
                                            <p className="small-text text-slate-400">Method</p>
                                        </div>
                                        <p className="normal-text-2 font-semibold text-white capitalize">
                                            {payment.payment_method.replace('_', ' ')}
                                        </p>
                                    </div>

                                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                        <p className="small-text text-slate-400 mb-1">Reference</p>
                                        <p className="normal-text-2 font-mono text-accent-50">
                                            {payment.reference}
                                        </p>
                                    </div>
                                </div>

                                {/* Tickets Info */}
                                <div className="pt-4 border-t border-accent/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="small-text text-slate-400 mb-1">
                                                Ticket Types
                                            </p>
                                            <p className="normal-text-2 text-slate-200">
                                                {payment.tickets.map(t => t.ticket_type).join(', ')}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/dashboard/payments/history/${payment.payment_id}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent-50 rounded-lg font-semibold normal-text-2 hover:bg-accent/30 transition-all duration-300 border border-accent/30"
                                        >
                                            View Details
                                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PaymentHistoryList;