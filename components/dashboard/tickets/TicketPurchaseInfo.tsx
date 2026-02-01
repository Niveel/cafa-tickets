import React from 'react';
import { Receipt, Calendar, CreditCard, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react';

import { TicketPurchaseInfo as PurchaseInfoType } from '@/types/tickets.types';

type Props = {
    purchaseInfo: PurchaseInfoType;
};

const TicketPurchaseInfo = ({ purchaseInfo }: Props) => {
    const formatDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleString('en-GH', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPaymentStatusConfig = (status: string) => {
        const configs = {
            completed: {
                icon: CheckCircle,
                color: 'emerald',
                bgColor: 'bg-emerald-500/20',
                textColor: 'text-emerald-400',
                borderColor: 'border-emerald-500/30',
                label: 'Completed'
            },
            pending: {
                icon: Clock,
                color: 'amber',
                bgColor: 'bg-amber-500/20',
                textColor: 'text-amber-400',
                borderColor: 'border-amber-500/30',
                label: 'Pending'
            },
            failed: {
                icon: XCircle,
                color: 'red',
                bgColor: 'bg-red-500/20',
                textColor: 'text-red-400',
                borderColor: 'border-red-500/30',
                label: 'Failed'
            },
            refunded: {
                icon: RotateCcw,
                color: 'blue',
                bgColor: 'bg-blue-500/20',
                textColor: 'text-blue-400',
                borderColor: 'border-blue-500/30',
                label: 'Refunded'
            }
        };

        return configs[status as keyof typeof configs] || configs.completed;
    };

    const getPaymentMethodLabel = (method: string) => {
        const labels = {
            card: 'Credit/Debit Card',
            mobile_money: 'Mobile Money',
            bank_transfer: 'Bank Transfer'
        };
        return labels[method as keyof typeof labels] || method;
    };

    const statusConfig = getPaymentStatusConfig(purchaseInfo.payment_status);
    const StatusIcon = statusConfig.icon;

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-white">
                        Purchase Information
                    </h2>
                    <p className="small-text text-slate-400">
                        Payment and transaction details
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {/* Purchase Date */}
                <div className="flex items-center gap-3 p-4 bg-primary-200 rounded-lg">
                    <Calendar className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-400 mb-1">Purchase Date</p>
                        <p className="normal-text-2 font-semibold text-white">
                            {formatDateTime(purchaseInfo.purchase_date)}
                        </p>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center gap-3 p-4 bg-primary-200 rounded-lg">
                    <CreditCard className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-400 mb-1">Payment Method</p>
                        <p className="normal-text-2 font-semibold text-white">
                            {getPaymentMethodLabel(purchaseInfo.payment_method)}
                        </p>
                    </div>
                </div>

                {/* Payment Reference */}
                <div className="flex items-center gap-3 p-4 bg-primary-200 rounded-lg">
                    <Receipt className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-400 mb-1">Payment Reference</p>
                        <p className="normal-text-2 font-semibold text-white font-mono">
                            {purchaseInfo.payment_reference}
                        </p>
                    </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center gap-3 p-4 bg-primary-200 rounded-lg">
                    <StatusIcon className={`w-5 h-5 shrink-0 ${statusConfig.textColor}`} aria-hidden="true" />
                    <div className="flex-1">
                        <p className="small-text text-slate-400 mb-1">Payment Status</p>
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg font-semibold small-text border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                            {statusConfig.label}
                        </span>
                    </div>
                </div>

                {/* Amount Breakdown */}
                <div className="p-4 bg-primary-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="normal-text-2 text-slate-400">Amount Paid</p>
                        <p className="big-text-4 font-bold text-white">
                            {purchaseInfo.currency} {parseFloat(purchaseInfo.amount_paid).toLocaleString('en-GH')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketPurchaseInfo;