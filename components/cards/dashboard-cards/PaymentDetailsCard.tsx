import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Smartphone, Calendar, MapPin, User, Mail, Phone, Download, CheckCircle, Clock, XCircle } from 'lucide-react';

import { PaymentDetails } from '@/types/payments.types';

type Props = {
    payment: PaymentDetails;
};

const PaymentDetailsCard = ({ payment }: Props) => {
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

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const PaymentMethodIcon = getPaymentMethodIcon(payment.payment_method);
    const statusBadge = getStatusBadge(payment.status);
    const StatusIcon = statusBadge.icon;

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link
                href="/dashboard/payments/history"
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Payment History
            </Link>

            {/* Payment Header */}
            <div role="region" aria-label="Payment overview" className="bg-primary rounded-xl p-6 border-2 border-accent">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="big-text-2 font-bold text-white mb-2">
                            Payment Details
                        </h1>
                        <p className="normal-text-2 text-slate-300">
                            Reference: <span className="font-mono text-accent-50">{payment.reference}</span>
                        </p>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold big-text-5 border ${statusBadge.className}`}>
                        <StatusIcon className="w-5 h-5" aria-hidden="true" />
                        {statusBadge.text}
                    </div>
                </div>

                {/* Amount Card */}
                <div className="p-6 bg-primary-200 rounded-xl border border-accent/30">
                    <p className="normal-text text-slate-400 mb-2">Total Amount Paid</p>
                    <p className="massive-text font-bold text-white">
                        GH₵ {parseFloat(payment.amount).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            {/* Event Details */}
            <div role="region" aria-label="Event details" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <h2 className="big-text-3 font-bold text-white mb-6">Event Information</h2>
                
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="relative w-full lg:w-64 h-48 rounded-xl overflow-hidden shrink-0 ring-2 ring-accent/30">
                        <Image
                            src={payment.event.featured_image}
                            alt={payment.event.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <Link
                            href={`/events/${payment.event.slug}`}
                            className="big-text-3 font-bold text-white hover:text-accent-50 transition-colors block"
                        >
                            {payment.event.title}
                        </Link>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-3 bg-primary-200 rounded-lg border border-accent/20">
                                <Calendar className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
                                <div>
                                    <p className="small-text text-slate-400 mb-1">Date & Time</p>
                                    <p className="normal-text-2 text-white font-semibold">
                                        {new Date(payment.event.start_date).toLocaleDateString('en-GH', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="small-text text-slate-300">
                                        {payment.event.start_time}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-primary-200 rounded-lg border border-accent/20">
                                <MapPin className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" aria-hidden="true" />
                                <div>
                                    <p className="small-text text-slate-400 mb-1">Venue</p>
                                    <p className="normal-text-2 text-white font-semibold">
                                        {payment.event.venue_name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-primary-200 rounded-lg border border-accent/20">
                                <User className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                                <div>
                                    <p className="small-text text-slate-400 mb-1">Organizer</p>
                                    <p className="normal-text-2 text-white font-semibold">
                                        {payment.event.organizer.full_name}
                                    </p>
                                    <p className="small-text text-slate-300">
                                        @{payment.event.organizer.username}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div role="region" aria-label="Payment method" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <h2 className="big-text-3 font-bold text-white mb-6">Payment Method</h2>
                
                <div className="flex items-start gap-4 p-4 bg-primary-200 rounded-xl border border-accent/20">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <PaymentMethodIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                        <p className="big-text-5 font-bold text-white mb-1 capitalize">
                            {payment.payment_method.replace('_', ' ')}
                        </p>
                        <p className="normal-text-2 text-slate-300">
                            Provider: <span className="font-semibold capitalize">{payment.provider}</span>
                        </p>
                        {payment.card_details && (
                            <div className="mt-2 pt-2 border-t border-accent/20">
                                <p className="small-text text-slate-400">
                                    {payment.card_details.brand} •••• {payment.card_details.last4}
                                </p>
                                <p className="small-text text-slate-400">
                                    Expires: {payment.card_details.exp_month}/{payment.card_details.exp_year}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="small-text text-slate-400 mb-1">Created</p>
                        <p className="normal-text-2 text-slate-300">
                            {formatDateTime(payment.created_at)}
                        </p>
                        {payment.completed_at && (
                            <>
                                <p className="small-text text-slate-400 mt-2 mb-1">Completed</p>
                                <p className="normal-text-2 text-emerald-400">
                                    {formatDateTime(payment.completed_at)}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Tickets */}
            <div role="region" aria-label="Tickets" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="big-text-3 font-bold text-white">
                        Tickets ({payment.tickets.length})
                    </h2>
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold normal-text-2 hover:bg-accent-100 transition-colors"
                    >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        Download All
                    </button>
                </div>

                <div className="space-y-4">
                    {payment.tickets.map((ticket, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-primary-200 rounded-xl border border-accent/20">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 ring-2 ring-accent/30">
                                <Image
                                    src={ticket.qr_code}
                                    alt={`QR Code for ticket ${ticket.ticket_id}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="big-text-5 font-bold text-white mb-1">
                                    {ticket.ticket_type.name}
                                </p>
                                <p className="normal-text-2 text-slate-300">
                                    {ticket.attendee_name}
                                </p>
                                <p className="small-text text-slate-400 font-mono">
                                    {ticket.ticket_id}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="big-text-5 font-bold text-accent-50">
                                    GH₵ {parseFloat(ticket.ticket_type.price).toLocaleString('en-GH')}
                                </p>
                                <span className={`inline-block px-2 py-1 rounded-md font-semibold small-text mt-1 ${
                                    ticket.status === 'active' 
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                                }`}>
                                    {ticket.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Billing Info */}
            <div role="region" aria-label="Billing information" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <h2 className="big-text-3 font-bold text-white mb-6">Billing Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-primary-200 rounded-lg border border-accent/20">
                        <User className="w-5 h-5 text-blue-400 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400 mb-1">Name</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {payment.billing_info.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-primary-200 rounded-lg border border-accent/20">
                        <Mail className="w-5 h-5 text-emerald-400 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400 mb-1">Email</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {payment.billing_info.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-primary-200 rounded-lg border border-accent/20">
                        <Phone className="w-5 h-5 text-purple-400 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400 mb-1">Phone</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {payment.billing_info.phone}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Breakdown */}
            <div role="region" aria-label="Price breakdown" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <h2 className="big-text-3 font-bold text-white mb-6">Price Breakdown</h2>
                
                <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-accent/20">
                        <p className="normal-text text-slate-300">Subtotal</p>
                        <p className="big-text-5 font-semibold text-white">
                            GH₵ {parseFloat(payment.breakdown.subtotal).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-accent/20">
                        <p className="normal-text text-slate-300">Service Fee</p>
                        <p className="big-text-5 font-semibold text-slate-300">
                            GH₵ {parseFloat(payment.breakdown.service_fee).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                        <p className="big-text-4 font-bold text-white">Total</p>
                        <p className="big-text-2 font-bold text-accent-50">
                            GH₵ {parseFloat(payment.breakdown.total).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsCard;