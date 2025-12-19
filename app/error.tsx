'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertTriangle, Home, ArrowLeft, Mail, Bug } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to console for debugging
        console.error('Application Error:', error);
        
        // Send error to your error reporting service
        // Example: Sentry.captureException(error);
    }, [error]);

    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const copyErrorToClipboard = () => {
        const errorText = `Error: ${error.message}\nDigest: ${error.digest || 'N/A'}\nStack: ${error.stack || 'N/A'}`;
        navigator.clipboard.writeText(errorText);
        
        // Show temporary success message (you could add a toast here)
        alert('Error details copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
            <div className="max-w-2xl w-full animate-fade-in">
                {/* Main Error Card */}
                <div className="bg-primary-100 rounded-2xl shadow-2xl border-2 border-accent/30 overflow-hidden">
                    {/* Header with Icon */}
                    <div className="relative bg-linear-to-br from-accent to-accent-100 p-8 text-center overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
                        </div>

                        {/* Icon */}
                        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm border-2 border-white/30">
                            <AlertTriangle className="w-10 h-10 text-white animate-pulse" aria-hidden="true" />
                        </div>

                        {/* Title */}
                        <h1 className="relative big-text-1 font-bold text-white mb-2">
                            Oops! Something Went Wrong
                        </h1>
                        <p className="relative normal-text text-white/90">
                            We encountered an unexpected error while loading this page
                        </p>
                    </div>

                    {/* Error Details Section */}
                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Error Message */}
                        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Bug className="w-4 h-4 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="big-text-5 font-bold text-red-400 mb-2">
                                        Error Details
                                    </h3>
                                    <p className="normal-text-2 text-red-300 wrap-break-word leading-relaxed">
                                        {error.message || 'An unexpected error occurred'}
                                    </p>
                                </div>
                            </div>
                            
                            {error.digest && (
                                <div className="mt-3 pt-3 border-t border-red-500/20">
                                    <p className="small-text text-red-400 font-mono">
                                        Error ID: {error.digest}
                                    </p>
                                    <button
                                        onClick={copyErrorToClipboard}
                                        className="mt-2 small-text text-red-300 hover:text-red-200 underline transition-colors"
                                    >
                                        Copy error details
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* What You Can Do Section */}
                        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-5">
                            <h3 className="big-text-5 font-bold text-blue-300 mb-3">
                                What You Can Do:
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    'Check your internet connection',
                                    'Try refreshing the page using the button below',
                                    'Go back to the previous page',
                                    'Clear your browser cache and cookies',
                                    'Contact support if the problem persists'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-0.5">•</span>
                                        <span className="normal-text-2 text-blue-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            {/* Primary Action - Retry */}
                            <button
                                onClick={reset}
                                className="group w-full bg-accent hover:bg-accent-100 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary-100"
                            >
                                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
                                <span className="big-text-5">Try Again</span>
                            </button>

                            {/* Secondary Actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={handleGoBack}
                                    className="bg-primary-200 hover:bg-primary border-2 border-accent/30 hover:border-accent text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent"
                                >
                                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                                    <span className="normal-text-2">Go Back</span>
                                </button>

                                <button
                                    onClick={handleGoHome}
                                    className="bg-primary-200 hover:bg-primary border-2 border-accent/30 hover:border-accent text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent"
                                >
                                    <Home className="w-4 h-4" aria-hidden="true" />
                                    <span className="normal-text-2">Home</span>
                                </button>
                            </div>
                        </div>

                        {/* Support Contact */}
                        <div className="text-center pt-6 border-t-2 border-accent/30">
                            <p className="normal-text text-slate-300 mb-3">
                                Need help? Our support team is here for you
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 rounded-lg font-semibold normal-text-2 transition-all duration-300 border border-emerald-500/30"
                                >
                                    <Mail className="w-4 h-4" aria-hidden="true" />
                                    Contact Support
                                </Link>
                                
                                
                                <Link    href="mailto:support@cafatickets.com"
                                    className="small-text text-slate-400 hover:text-white transition-colors underline"
                                >
                                    support@cafatickets.com
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center space-y-2">
                    <p className="normal-text-2 text-slate-400">
                        If this error continues, please report it to our technical team
                    </p>
                    <p className="small-text text-slate-500">
                        Cafa Tickets • Always here to help
                    </p>
                </div>
            </div>
        </div>
    );
}