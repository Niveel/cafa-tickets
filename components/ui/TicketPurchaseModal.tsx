"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Ticket, User, AlertCircle, Loader2, ShoppingCart } from 'lucide-react';
import { TicketType, EventDetails, RecurringEventDetails } from '@/types/events.types';
import { CurrentUser } from '@/types/general.types';

interface TicketPurchaseModalProps {
    ticket: TicketType;
    event: EventDetails | RecurringEventDetails;
    quantity: number;
    currentUser: CurrentUser | null;
    onClose: () => void;
}

const TicketPurchaseModal = ({ ticket, event, quantity, currentUser, onClose }: TicketPurchaseModalProps) => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const subtotal = parseFloat(ticket.price) * quantity;
    const serviceFee = subtotal * 0.05; // 5% service fee
    const total = subtotal + serviceFee;

    // Check if user is logged in
    if (!currentUser) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                <div className="relative w-full max-w-md bg-primary-100 rounded-2xl border-2 border-accent p-6 animate-slide-up">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-primary-200 hover:bg-primary-300 flex items-center justify-center transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-amber-400" />
                    </div>

                    {/* Message */}
                    <h3 className="big-text-3 font-bold text-white text-center mb-3">
                        Login Required
                    </h3>
                    <p className="normal-text text-slate-300 text-center mb-6">
                        You need to be logged in to purchase tickets. Please login or create an account to continue.
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.push(`/login?redirect=/events/${event.slug}`)}
                            className="flex-1 py-3 px-4 bg-accent hover:bg-accent-100 text-white rounded-xl font-bold normal-text transition-all"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => router.push(`/signup?redirect=/events/${event.slug}`)}
                            className="flex-1 py-3 px-4 bg-primary-200 hover:bg-primary-300 text-white rounded-xl font-bold normal-text transition-all"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Check if phone number is missing
    if (!currentUser.phone_number) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                <div className="relative w-full max-w-md bg-primary-100 rounded-2xl border-2 border-accent p-6 animate-slide-up">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-primary-200 hover:bg-primary-300 flex items-center justify-center transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <User className="w-8 h-8 text-amber-400" />
                    </div>

                    {/* Message */}
                    <h3 className="big-text-3 font-bold text-white text-center mb-3">
                        Complete Your Profile
                    </h3>
                    <p className="normal-text text-slate-300 text-center mb-6">
                        Please add your phone number to your profile before purchasing tickets. This is required for ticket delivery and event updates.
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-primary-200 hover:bg-primary-300 text-white rounded-xl font-bold normal-text transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => router.push('/dashboard/profile/edit')}
                            className="flex-1 py-3 px-4 bg-accent hover:bg-accent-100 text-white rounded-xl font-bold normal-text transition-all"
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main purchase confirmation modal
    const handlePurchase = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            const response = await fetch('/api/payments/initiate', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event_slug: event.slug,
                    ticket_type_id: ticket.id,
                    quantity: quantity,
                    attendee_info: {
                        name: currentUser.full_name,
                        email: currentUser.email,
                        phone: currentUser.phone_number,
                    },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to initiate purchase');
            }

            // Redirect to Paystack payment URL
            if (data.payment && data.payment.payment_url) {
                window.location.href = data.payment.payment_url;
            } else {
                throw new Error('Payment URL not received');
            }

        } catch (err) {
            console.error('Purchase error:', err);
            setError(err instanceof Error ? err.message : 'Failed to process purchase');
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
            {/* ✅ Added max-h-[90vh] and flex flex-col for proper height constraint */}
            <div className="relative w-full max-w-lg bg-primary-100 rounded-2xl border-2 border-accent my-auto flex flex-col max-h-[90vh] animate-slide-up">
                {/* Header - Fixed */}
                <div className="p-6 pb-4 border-b border-accent/30 shrink-0">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        disabled={isProcessing}
                        className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-primary-200 hover:bg-primary-300 flex items-center justify-center transition-colors disabled:opacity-50 z-10"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-accent-50" />
                        </div>
                        <div>
                            <h2 className="big-text-3 font-bold text-white">
                                Confirm Purchase
                            </h2>
                            <p className="small-text text-slate-400">
                                {event.title}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ✅ Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-4 space-y-4">
                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <p className="small-text text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Ticket Details */}
                    <div className="space-y-2">
                        <h3 className="normal-text font-bold text-white">Ticket Details</h3>
                        <div className="p-4 bg-primary-200 rounded-xl space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="small-text text-slate-400">Ticket Type</span>
                                <span className="normal-text-2 font-semibold text-white">{ticket.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="small-text text-slate-400">Quantity</span>
                                <span className="normal-text-2 font-semibold text-white">{quantity}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="small-text text-slate-400">Price per ticket</span>
                                <span className="normal-text-2 font-semibold text-white">GH₵ {parseFloat(ticket.price).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Attendee Info */}
                    <div className="space-y-2">
                        <h3 className="normal-text font-bold text-white">Attendee Information</h3>
                        <div className="p-4 bg-primary-200 rounded-xl space-y-2">
                            <div className="flex items-start justify-between gap-4">
                                <span className="small-text text-slate-400">Name</span>
                                <span className="normal-text-2 font-semibold text-white text-right">{currentUser.full_name}</span>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                                <span className="small-text text-slate-400">Email</span>
                                <span className="normal-text-2 font-semibold text-white text-right break-all">{currentUser.email}</span>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                                <span className="small-text text-slate-400">Phone</span>
                                <span className="normal-text-2 font-semibold text-white text-right">{currentUser.phone_number}</span>
                            </div>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                        <h3 className="normal-text font-bold text-white">Price Breakdown</h3>
                        <div className="p-4 bg-primary-200 rounded-xl space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="small-text text-slate-400">Subtotal</span>
                                <span className="normal-text-2 text-white">GH₵ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="small-text text-slate-400">Service Fee (5%)</span>
                                <span className="normal-text-2 text-white">GH₵ {serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 border-t border-accent/30 flex items-center justify-between">
                                <span className="normal-text font-bold text-white">Total</span>
                                <span className="big-text-4 font-bold text-accent-50">GH₵ {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="small-text text-blue-300 mb-1">
                                    <strong>Important:</strong> You will be redirected to Paystack to complete your payment securely.
                                </p>
                                <p className="small-text text-blue-300">
                                    Your tickets will be reserved for 10 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer - Fixed */}
                <div className="p-6 pt-4 border-t border-accent/30 bg-primary-200 shrink-0">
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={isProcessing}
                            className="flex-1 py-2 px-4 bg-primary-100 hover:bg-primary-300 text-white rounded-xl font-bold small-text transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePurchase}
                            disabled={isProcessing}
                            className="flex-1 py-2 px-4 bg-accent hover:bg-accent-100 text-white rounded-xl font-bold small-text transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Ticket className="w-4 h-4" />
                                    Proceed to Payment
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketPurchaseModal