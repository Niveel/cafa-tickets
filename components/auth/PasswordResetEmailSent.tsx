"use client";

import React, { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type Props = {
    email: string;
};

const PasswordResetEmailSent = ({ email }: Props) => {
    const [isResending, setIsResending] = useState(false);
    const [canResend, setCanResend] = useState(true);
    const [countdown, setCountdown] = useState(0);

    const requestNewLink = async () => {
        if (!canResend || isResending) return;

        setIsResending(true);

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.status === 204 || response.ok) {
                toast.success('New reset link sent!', {
                    description: 'Please check your email inbox.',
                });

                // Start 60 second cooldown
                setCanResend(false);
                setCountdown(60);

                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setCanResend(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                const data = await response.json();
                toast.error('Failed to resend link', {
                    description: data.message || 'Please try again later.',
                });
            }
        } catch (error) {
            console.error('Error resending reset link:', error);
            toast.error('Network error', {
                description: 'Please check your connection and try again.',
            });
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-emerald-400" aria-hidden="true" />
                </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="big-text-1 font-bold text-white mb-3">
                    Check Your Email
                </h1>
                <p className="big-text-5 text-slate-200">
                    We&apos;ve sent a password reset link to
                </p>
                <p className="big-text-4 font-semibold text-accent-50 mt-2">
                    {email}
                </p>
            </div>

            {/* Instructions Card */}
            <div className="bg-primary-100 rounded-2xl p-6 shadow-2xl border-2 border-accent/30">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="big-text-4 font-bold text-white mb-2">
                            Next Steps
                        </h2>
                        <p className="normal-text-2 text-slate-300">
                            Follow these steps to reset your password
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-primary rounded-xl border border-accent/20">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                            1
                        </span>
                        <div>
                            <p className="normal-text-2 font-semibold text-white mb-1">
                                Check your inbox
                            </p>
                            <p className="small-text text-slate-400">
                                Look for an email from Cafa Tickets with the subject &quot;Password Reset Request&quot;
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-primary rounded-xl border border-accent/20">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                            2
                        </span>
                        <div>
                            <p className="normal-text-2 font-semibold text-white mb-1">
                                Click the reset link
                            </p>
                            <p className="small-text text-slate-400">
                                The link will take you to a secure page to set your new password
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-primary rounded-xl border border-accent/20">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                            3
                        </span>
                        <div>
                            <p className="normal-text-2 font-semibold text-white mb-1">
                                Create a new password
                            </p>
                            <p className="small-text text-slate-400">
                                Choose a strong password and login with your new credentials
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <p className="small-text text-amber-300">
                        🔒 <strong>Security Notice:</strong> If you didn&apos;t request a password reset, please ignore this email. Your account remains secure.
                    </p>
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <p className="small-text text-blue-300">
                        💡 <strong>Didn&apos;t receive the email?</strong> Check your spam folder or{' '}
                        <button
                            onClick={requestNewLink}
                            disabled={!canResend || isResending}
                            className={`font-semibold underline inline-flex items-center gap-1 ${
                                canResend && !isResending
                                    ? 'text-blue-400 hover:text-blue-300 cursor-pointer'
                                    : 'text-blue-600 cursor-not-allowed opacity-50'
                            }`}
                        >
                            {isResending && <Loader2 className="w-3 h-3 animate-spin" />}
                            {isResending ? 'Sending...' : canResend ? 'request a new link' : `wait ${countdown}s`}
                        </button>
                    </p>
                </div>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="inline-block px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text transition-all"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetEmailSent;