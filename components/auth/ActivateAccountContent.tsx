"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { useAlertModal } from '@/contexts/AlertModalContext';

type Props = {
    uid: string;
    token: string;
};

type ActivationState = 'loading' | 'success' | 'error';

const ActivateAccountContent = ({ uid, token }: Props) => {
    const router = useRouter();
    const { showAlert } = useAlertModal();
    const [status, setStatus] = useState<ActivationState>('loading');
    const [error, setError] = useState('');
    const [errorDetails, setErrorDetails] = useState<unknown>(null);
    const [countdown, setCountdown] = useState(3);
    const [showResendOption, setShowResendOption] = useState(false);
    const [resendEmail, setResendEmail] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    
    // Prevent duplicate requests
    const hasActivated = useRef(false);

    useEffect(() => {
        // Only activate once
        if (!hasActivated.current) {
            hasActivated.current = true;
            activateAccount();
        }
    }, []);

    useEffect(() => {
        if (status === 'success' && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (status === 'success' && countdown === 0) {
            router.push('/login?activated=true');
        }
    }, [status, countdown, router]);

    const activateAccount = async () => {
        try {
            console.log('Activating account with:', { uid, token });

            const response = await fetch('/api/auth/activate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, token }),
            });

            const data = await response.json();
            console.log('Activation response:', data);

            if (!response.ok) {
                // Store error details for debugging
                setErrorDetails(data);

                // Parse specific error messages
                let errorMessage = 'Failed to activate account.';

                if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.uid && Array.isArray(data.uid)) {
                    errorMessage = data.uid[0];
                } else if (data.token && Array.isArray(data.token)) {
                    errorMessage = data.token[0];
                } else if (data.error) {
                    errorMessage = data.error;
                }

                // Show resend option for certain errors
                if (
                    errorMessage.toLowerCase().includes('stale') ||
                    errorMessage.toLowerCase().includes('expired') ||
                    errorMessage.toLowerCase().includes('invalid')
                ) {
                    setShowResendOption(true);
                }

                throw new Error(errorMessage);
            }

            setStatus('success');

        } catch (err: unknown) {
            console.error('Activation error:', err);
            const message = err instanceof Error
                ? err.message
                : 'Failed to activate account. The link may be invalid or expired.';
            setError(message);
            setStatus('error');
        }
    };

    const handleResendActivation = async () => {
        if (!resendEmail.trim()) {
            showAlert({
                title: 'Email Required',
                message: 'Please enter your email address',
                variant: 'error',
            });
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(resendEmail)) {
            showAlert({
                title: 'Invalid Email',
                message: 'Please enter a valid email address',
                variant: 'error',
            });
            return;
        }

        setResendLoading(true);

        try {
            const response = await fetch('/api/auth/resend-activation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: resendEmail }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific backend errors
                let errorMessage = 'Failed to resend activation email.';
                
                if (data.email && Array.isArray(data.email)) {
                    errorMessage = data.email[0];
                } else if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.error) {
                    errorMessage = data.error;
                }

                throw new Error(errorMessage);
            }

            setResendSuccess(true);

        } catch (err: unknown) {
            console.error('Resend error:', err);
            
            // Show user-friendly error
            let displayError = err instanceof Error
                ? err.message
                : 'Failed to resend activation email. Please try again.';
            
            // Add helpful hints for common errors
            if (displayError.toLowerCase().includes('not found') || displayError.toLowerCase().includes('does not exist')) {
                displayError += '\n\nMake sure you entered the exact email address you used to sign up.';
            }
            
            showAlert({
                title: 'Resend Failed',
                message: displayError,
                variant: 'error',
            });
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Loading State */}
            {status === 'loading' && (
                <>
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-accent animate-spin" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="big-text-1 font-bold text-white mb-3">
                            Activating Your Account
                        </h1>
                        <p className="normal-text text-slate-400">
                            Please wait while we verify your email...
                        </p>
                    </div>
                </>
            )}

            {/* Success State */}
            {status === 'success' && (
                <>
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-emerald-400" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="big-text-1 font-bold text-white mb-3">
                            Account Activated!
                        </h1>
                        <p className="big-text-5 text-slate-200">
                            Your email has been verified successfully
                        </p>
                    </div>

                    <div className="bg-primary-100 rounded-2xl p-6 shadow-2xl border-2 border-accent/30">
                        <div className="text-center">
                            <p className="normal-text-2 text-slate-300 mb-4">
                                You&apos;re all set! Redirecting you to login page in...
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <span className="big-text-1 font-bold text-accent">
                                    {countdown}
                                </span>
                                <span className="normal-text text-slate-400">
                                    {countdown === 1 ? 'second' : 'seconds'}
                                </span>
                            </div>

                            <button
                                onClick={() => router.push('/login?activated=true')}
                                className="mt-6 px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text transition-all"
                            >
                                Go to Login Now
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Error State */}
            {status === 'error' && (
                <>
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                            <XCircle className="w-10 h-10 text-red-400" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="big-text-1 font-bold text-white mb-3">
                            Activation Failed
                        </h1>
                        <p className="big-text-5 text-slate-200">
                            We couldn&apos;t activate your account
                        </p>
                    </div>

                    <div className="bg-primary-100 rounded-2xl p-6 shadow-2xl border-2 border-red-500/30">
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 mb-6">
                            <p className="normal-text-2 text-red-400 mb-2">
                                {error}
                            </p>
                            {!!errorDetails && (
                                <details className="mt-3">
                                    <summary className="small-text text-red-300 cursor-pointer hover:text-red-200">
                                        Show technical details
                                    </summary>
                                    <pre className="mt-2 p-2 bg-primary-200 rounded text-xs text-slate-300 overflow-auto">
                                        {JSON.stringify(errorDetails, null, 2)}
                                    </pre>
                                </details>
                            )}
                        </div>

                        {/* Resend Activation Option */}
                        {showResendOption && !resendSuccess && (
                            <div className="mb-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <div className="flex items-start gap-3 mb-4">
                                    <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text-2 font-semibold text-blue-300 mb-1">
                                            Need a new activation link?
                                        </p>
                                        <p className="small-text text-blue-300">
                                            Enter the email address you used to sign up
                                        </p>
                                    </div>
                                </div>

                                {/* Warning */}
                                <div className="mb-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                    <p className="small-text text-amber-300">
                                        ⚠️ <strong>Important:</strong> Use the exact email you registered with. If you enter a different email, you won&apos;t receive the activation link.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor="resend-email" className="block small-text text-slate-400 mb-2">
                                            Your Email Address
                                        </label>
                                        <input
                                            id="resend-email"
                                            type="email"
                                            value={resendEmail}
                                            onChange={(e) => setResendEmail(e.target.value)}
                                            placeholder="your-email@example.com"
                                            className="w-full h-11 px-4 bg-primary-200 border-2 border-blue-500/30 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors small-text"
                                            required
                                        />
                                    </div>
                                    <button
                                        onClick={handleResendActivation}
                                        disabled={resendLoading}
                                        className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold normal-text-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {resendLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="w-4 h-4" aria-hidden="true" />
                                                Resend Activation Email
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Resend Success Message */}
                        {resendSuccess && (
                            <div className="mb-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                                    <p className="small-text text-emerald-400">
                                        Activation email sent! Please check your inbox.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="text-center">
                            <p className="small-text text-slate-400 mb-4">
                                Possible reasons:
                            </p>
                            <ul className="small-text text-slate-400 text-left space-y-2 mb-6">
                                <li>• The activation link has expired</li>
                                <li>• The link has already been used</li>
                                <li>• The link is invalid or corrupted</li>
                            </ul>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => router.push('/signup')}
                                    className="flex-1 px-4 py-3 bg-primary-200 hover:bg-primary-300 text-white rounded-xl font-semibold normal-text-2 transition-all"
                                >
                                    Sign Up Again
                                </button>
                                <button
                                    onClick={() => router.push('/login')}
                                    className="flex-1 px-4 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text-2 transition-all"
                                >
                                    Try Login
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ActivateAccountContent;
