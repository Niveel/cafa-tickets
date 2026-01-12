'use client';

import { useState } from 'react';
import { DollarSign, X, AlertCircle, CheckCircle, Wallet, ArrowRight } from 'lucide-react';
import FaceVerificationModal from './FaceVerificationModal';

interface RequestPayoutButtonProps {
    availableBalance: string;
    pendingBalance: string;
    hasVerifiedProfile: boolean;
}

const RequestPayoutButton = ({ 
    availableBalance, 
    pendingBalance,
    hasVerifiedProfile 
}: RequestPayoutButtonProps) => {
    const [isFaceVerificationOpen, setIsFaceVerificationOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState<'amount' | 'confirm'>('amount');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const balance = parseFloat(availableBalance);
    const pending = parseFloat(pendingBalance);
    const hasBalance = balance > 0;
    const isDisabled = !hasBalance || !hasVerifiedProfile || pending > 0;

    const minPayoutAmount = 50; // GHS 50 minimum
    const parsedAmount = parseFloat(amount);

    const getDisabledReason = () => {
        if (!hasBalance) return 'No available balance to withdraw';
        if (!hasVerifiedProfile) return 'Please add and verify a payment profile first';
        if (pending > 0) return 'You have a pending payout. Please wait for it to complete.';
        return '';
    };

    const handleOpenModal = () => {
        // Open face verification first
        setIsFaceVerificationOpen(true);
    };

    const handleFaceVerificationSuccess = () => {
        // Face verified, now open withdrawal modal
        setIsFaceVerificationOpen(false);
        setIsModalOpen(true);
        setStep('amount');
        setAmount('');
        setError(null);
        setSuccess(false);
    };

    const handleFaceVerificationClose = () => {
        setIsFaceVerificationOpen(false);
    };

    const handleCloseModal = () => {
        if (isLoading) return;
        setIsModalOpen(false);
        setStep('amount');
        setAmount('');
        setError(null);
        setSuccess(false);
    };

    const validateAmount = (): boolean => {
        if (!amount || amount.trim() === '') {
            setError('Please enter an amount');
            return false;
        }

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid amount');
            return false;
        }

        if (parsedAmount < minPayoutAmount) {
            setError(`Minimum payout amount is GHS ${minPayoutAmount.toFixed(2)}`);
            return false;
        }

        if (parsedAmount > balance) {
            setError(`Amount cannot exceed available balance (GHS ${balance.toFixed(2)})`);
            return false;
        }

        return true;
    };

    const handleContinue = () => {
        setError(null);
        
        if (!validateAmount()) {
            return;
        }

        setStep('confirm');
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/dashboard/payment/request-payout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parsedAmount
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to request payout');
            }

            setSuccess(true);
            
            // Close modal after 2 seconds and refresh page
            setTimeout(() => {
                handleCloseModal();
                window.location.reload();
            }, 2000);

        } catch (err) {
            console.error('Payout request error:', err);
            setError(err instanceof Error ? err.message : 'Failed to request payout. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setStep('amount');
        setError(null);
    };

    const handleMaxAmount = () => {
        setAmount(balance.toString());
        setError(null);
    };

    return (
        <>
            {/* Request Payout Button */}
            <button
                onClick={handleOpenModal}
                disabled={isDisabled}
                className="group p-6 bg-emerald-600 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Request payout"
                title={isDisabled ? getDisabledReason() : 'Request payout'}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <DollarSign className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                        <p className="big-text-5 font-bold text-white">Request Payout</p>
                        <p className="small-text text-white/80">
                            {isDisabled ? getDisabledReason() : 'Withdraw your earnings'}
                        </p>
                    </div>
                </div>
            </button>

            {/* Face Verification Modal - Security Check */}
            <FaceVerificationModal
                isOpen={isFaceVerificationOpen}
                onClose={handleFaceVerificationClose}
                onSuccess={handleFaceVerificationSuccess}
                title="Verify Identity for Withdrawal"
                description="For your security, please verify your identity before requesting a payout."
            />

            {/* Withdrawal Modal - After Verification */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div 
                        className="bg-primary-100 rounded-2xl border-2 border-accent/30 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        role="dialog"
                        aria-labelledby="payout-modal-title"
                        aria-modal="true"
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-primary-100 border-b-2 border-accent/30 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                </div>
                                <h2 id="payout-modal-title" className="big-text-3 font-bold text-white">
                                    {step === 'amount' ? 'Request Payout' : 'Confirm Payout'}
                                </h2>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                disabled={isLoading}
                                className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-colors disabled:opacity-50"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5 text-white" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Success State */}
                            {success ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-green-400" aria-hidden="true" />
                                    </div>
                                    <h3 className="big-text-3 font-bold text-white mb-2">
                                        Payout Requested! 🎉
                                    </h3>
                                    <p className="normal-text text-slate-300">
                                        Your payout request has been submitted successfully. You&apos;ll receive your funds within 1-3 business days.
                                    </p>
                                </div>
                            ) : step === 'amount' ? (
                                <>
                                    {/* Available Balance Info */}
                                    <div className="bg-primary-200 rounded-xl p-4">
                                        <p className="small-text text-slate-400 mb-1">Available Balance</p>
                                        <p className="big-text-2 font-bold text-white">
                                            GHS {balance.toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Amount Input */}
                                    <div>
                                        <label htmlFor="payout-amount" className="block normal-text text-slate-300 mb-2">
                                            Withdrawal Amount <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 big-text-4 text-slate-400">
                                                GHS
                                            </span>
                                            <input
                                                id="payout-amount"
                                                type="number"
                                                value={amount}
                                                onChange={(e) => {
                                                    setAmount(e.target.value);
                                                    setError(null);
                                                }}
                                                placeholder="0.00"
                                                min={minPayoutAmount}
                                                max={balance}
                                                step="0.01"
                                                disabled={isLoading}
                                                className="w-full pl-20 pr-24 py-4 bg-primary-200 border-2 border-accent/30 rounded-xl text-white big-text-4 placeholder:text-slate-500 focus:border-accent focus:outline-none disabled:opacity-50"
                                                aria-describedby={error ? "amount-error" : undefined}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleMaxAmount}
                                                disabled={isLoading}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-accent/20 hover:bg-accent/30 text-accent-50 rounded-lg small-text font-semibold transition-colors disabled:opacity-50"
                                            >
                                                MAX
                                            </button>
                                        </div>
                                        <p className="small-text text-slate-400 mt-2">
                                            Minimum: GHS {minPayoutAmount.toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div id="amount-error" className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl" role="alert">
                                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                                            <p className="normal-text-2 text-red-400">{error}</p>
                                        </div>
                                    )}

                                    {/* Info Box */}
                                    <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                                        <Wallet className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                                        <div className="small-text text-slate-300">
                                            <p className="font-semibold text-blue-400 mb-1">Payout Information</p>
                                            <ul className="space-y-1 list-disc list-inside">
                                                <li>Funds will be sent to your default payment profile</li>
                                                <li>Processing time: 1-3 business days</li>
                                                <li>No additional fees</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Continue Button */}
                                    <button
                                        onClick={handleContinue}
                                        disabled={isLoading || !amount}
                                        className="w-full py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        Continue
                                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Confirmation Step */}
                                    <div className="space-y-4">
                                        <div className="bg-primary-200 rounded-xl p-6 space-y-4">
                                            <div className="flex items-center justify-between pb-4 border-b border-accent/30">
                                                <span className="normal-text text-slate-400">Withdrawal Amount</span>
                                                <span className="big-text-3 font-bold text-white">
                                                    GHS {parsedAmount.toFixed(2)}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <span className="normal-text text-slate-400">Processing Fee</span>
                                                <span className="normal-text font-semibold text-white">
                                                    GHS 0.00
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t-2 border-accent/30">
                                                <span className="big-text-4 font-bold text-white">You&apos;ll Receive</span>
                                                <span className="big-text-2 font-bold text-accent-50">
                                                    GHS {parsedAmount.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-primary-200 rounded-xl p-4">
                                            <p className="small-text text-slate-400 mb-2">Payout Method</p>
                                            <p className="normal-text text-white font-semibold">
                                                Default Payment Profile
                                            </p>
                                            <p className="small-text text-slate-400 mt-1">
                                                Funds will be sent to your default payment method
                                            </p>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl" role="alert">
                                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                                            <p className="normal-text-2 text-red-400">{error}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleBack}
                                            disabled={isLoading}
                                            className="flex-1 py-4 bg-slate-700 text-white rounded-xl font-bold big-text-5 hover:bg-slate-600 transition-all disabled:opacity-50"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleConfirm}
                                            disabled={isLoading}
                                            className="flex-1 py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-5 h-5" aria-hidden="true" />
                                                    Confirm Payout
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RequestPayoutButton;