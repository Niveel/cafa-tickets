"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Ticket as TicketIcon, Download, Home } from 'lucide-react';
import Link from 'next/link';

// Separate component for the main content
function PaymentResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'verifying' | 'success' | 'failed' | 'error'>('verifying');
    const [tickets, setTickets] = useState<any[]>([]);
    const [purchaseDetails, setPurchaseDetails] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const reference = searchParams.get('reference');
        
        if (!reference) {
            setStatus('error');
            setErrorMessage('No payment reference found');
            return;
        }

        verifyPayment(reference);
    }, [searchParams]);

    const verifyPayment = async (reference: string) => {
        try {
            const response = await fetch(`/api/payments/verify?reference=${reference}`);
            
            const data = await response.json();

            if (data.success && data.status === 'completed') {
                setStatus('success');
                setTickets(data.tickets || []);
                setPurchaseDetails({
                    purchase_id: data.purchase_id,
                    amount: data.amount,
                    ticket_count: data.ticket_count,
                });
            } else {
                setStatus('failed');
                setErrorMessage(data.message || 'Payment verification failed');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setStatus('error');
            setErrorMessage('Failed to verify payment. Please contact support.');
        }
    };

    if (status === 'verifying') {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-primary-100 rounded-2xl border-2 border-accent p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-accent-50 animate-spin" />
                    </div>
                    <h1 className="big-text-2 font-bold text-white mb-2">
                        Verifying Payment
                    </h1>
                    <p className="normal-text text-slate-300">
                        Please wait while we confirm your payment...
                    </p>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-primary py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Success Header */}
                    <div className="bg-primary-100 rounded-2xl border-2 border-green-500 p-8 mb-6 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                        <h1 className="big-text-1 font-bold text-white mb-2">
                            Payment Successful! 🎉
                        </h1>
                        <p className="big-text-4 text-slate-300 mb-4">
                            Your tickets have been confirmed and sent to your email.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-200 rounded-lg">
                            <span className="small-text text-slate-400">Purchase ID:</span>
                            <span className="normal-text font-mono text-white">{purchaseDetails?.purchase_id}</span>
                        </div>
                    </div>

                    {/* Purchase Summary */}
                    <div className="bg-primary-100 rounded-2xl border border-accent/30 p-6 mb-6">
                        <h2 className="big-text-3 font-bold text-white mb-4">Purchase Summary</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="small-text text-slate-400">Total Paid</p>
                                <p className="big-text-3 font-bold text-accent-50">
                                    GH₵ {purchaseDetails?.amount?.toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <p className="small-text text-slate-400">Tickets</p>
                                <p className="big-text-3 font-bold text-white">
                                    {purchaseDetails?.ticket_count} Ticket{purchaseDetails?.ticket_count > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tickets Display */}
                    <div className="bg-primary-100 rounded-2xl border border-accent/30 p-6 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                <TicketIcon className="w-5 h-5 text-accent-50" />
                            </div>
                            <h2 className="big-text-3 font-bold text-white">Your Tickets</h2>
                        </div>

                        <div className="space-y-4">
                            {tickets.map((ticket, index) => (
                                <div 
                                    key={ticket.ticket_id} 
                                    className="bg-primary-200 rounded-xl p-4 border border-accent/20"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <p className="small-text text-slate-400 mb-1">Ticket #{index + 1}</p>
                                            <p className="normal-text font-bold text-white mb-1">
                                                {ticket.ticket_id}
                                            </p>
                                            <p className="small-text text-slate-300">
                                                {ticket.attendee_info?.name || ticket.attendee_name}
                                            </p>
                                        </div>
                                        {ticket.qr_code && (
                                            <div className="bg-white p-2 rounded-lg">
                                                <img 
                                                    src={`${process.env.NODE_ENV === 'production' 
                                                        ? 'https://cafaticket.pythonanywhere.com' 
                                                        : 'http://localhost:8000'}${ticket.qr_code}`}
                                                    alt={`QR Code for ${ticket.ticket_id}`}
                                                    className="w-24 h-24"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            href="/dashboard/tickets"
                            className="flex-1 py-4 px-6 bg-accent hover:bg-accent-100 text-white rounded-xl font-bold normal-text text-center transition-all"
                        >
                            View All My Tickets
                        </Link>
                        <Link 
                            href="/events"
                            className="flex-1 py-4 px-6 bg-primary-200 hover:bg-primary-300 text-white rounded-xl font-bold normal-text text-center transition-all flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Browse Events
                        </Link>
                    </div>

                    {/* Important Note */}
                    <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-xl">
                        <p className="small-text text-slate-300 text-center">
                            📧 A confirmation email with your tickets has been sent to your email address.
                            Please check your inbox and spam folder.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Failed or Error State
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-primary-100 rounded-2xl border-2 border-red-500 p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="big-text-2 font-bold text-white mb-2">
                    {status === 'failed' ? 'Payment Failed' : 'Something Went Wrong'}
                </h1>
                <p className="normal-text text-slate-300 mb-6">
                    {errorMessage || 'We couldn\'t complete your payment. Please try again or contact support.'}
                </p>
                <div className="flex gap-3">
                    <Link 
                        href="/events"
                        className="flex-1 py-3 px-4 bg-accent hover:bg-accent-100 text-white rounded-xl font-bold normal-text transition-all"
                    >
                        Back to Events
                    </Link>
                    <Link 
                        href="/contact"
                        className="flex-1 py-3 px-4 bg-primary-200 hover:bg-primary-300 text-white rounded-xl font-bold normal-text transition-all"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Main page component with Suspense boundary
export default function PaymentResultsPage() {
    return (
        <Suspense 
            fallback={
                <div className="min-h-screen bg-primary flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-accent-50 animate-spin" />
                </div>
            }
        >
            <PaymentResultsContent />
        </Suspense>
    );
}