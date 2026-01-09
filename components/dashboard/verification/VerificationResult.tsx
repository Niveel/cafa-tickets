'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Loader2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import type { VerificationStatus } from '@/types/verification.types';

interface VerificationResultProps {
    status: VerificationStatus;
    idImage: File | null;
    selfieImage: File | null;
    rejectionReason: string | null;
    onRetry: () => void;
}

const VerificationResult = ({ status, rejectionReason, onRetry }: VerificationResultProps) => {
    const router = useRouter();

    if (status === 'pending') {
        return (
            <div className="bg-primary-100 rounded-2xl border-2 border-accent/30 p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-accent-50 animate-spin" />
                </div>
                <h2 className="big-text-2 font-bold text-white mb-3">
                    Verifying Your Identity...
                </h2>
                <p className="normal-text text-slate-300">
                    Please wait while we verify your ID and selfie. This usually takes a few seconds.
                </p>
            </div>
        );
    }

    if (status === 'verified') {
        return (
            <div className="bg-primary-100 rounded-2xl border-2 border-green-500 p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="big-text-2 font-bold text-white mb-3">
                    Verification Successful! 🎉
                </h2>
                <p className="normal-text text-slate-300 mb-8">
                    Your identity has been verified. You can now create events on Cafa Tickets.
                </p>

                <button
                    onClick={() => router.push('/dashboard/events/create')}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all hover:scale-105"
                >
                    Create Your First Event
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        );
    }

    if (status === 'rejected') {
        return (
            <div className="bg-primary-100 rounded-2xl border-2 border-red-500 p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-red-400" />
                </div>
                <h2 className="big-text-2 font-bold text-white mb-3">
                    Verification Failed
                </h2>
                <p className="normal-text text-slate-300 mb-4">
                    {rejectionReason || 'We couldn\'t verify your identity. Please make sure your ID and selfie are clear and try again.'}
                </p>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 mb-8">
                    <p className="small-text text-blue-300">
                        <strong>Tips for successful verification:</strong>
                        <br />• Ensure your ID is clearly visible and not blurry
                        <br />• Make sure your face is well-lit in the selfie
                        <br />• Your face should match the photo on your ID
                    </p>
                </div>

                <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all"
                >
                    <RefreshCw className="w-5 h-5" />
                    Try Again
                </button>
            </div>
        );
    }

    // Default/unknown state
    return (
        <div className="bg-primary-100 rounded-2xl border-2 border-accent/30 p-12 text-center">
            <p className="normal-text text-slate-300">
                Unknown verification status. Please refresh the page.
            </p>
        </div>
    );
};

export default VerificationResult;