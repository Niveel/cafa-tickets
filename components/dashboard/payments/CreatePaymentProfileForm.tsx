"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, Building2, AlertCircle } from 'lucide-react';

import { AppForm, AppFormField, SubmitButton, FormLoader } from '@/components';
import { mobileMoneyValidation, bankTransferValidation } from '@/data/validationConstants';
import { networkOptions, bankOptions, bankCodeOptions } from '@/data/static.dashboard';

type PaymentMethod = 'mobile_money' | 'bank_transfer';

const CreatePaymentProfileForm = () => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('mobile_money');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (values: Record<string, string>) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Build request payload
            const payload = {
                method: paymentMethod,
                name: values.name,
                description: values.description || '',
                account_details: paymentMethod === 'mobile_money'
                    ? {
                        mobile_number: values.mobile_number,
                        network: values.network,
                        account_name: values.account_name
                    }
                    : {
                        account_number: values.account_number,
                        account_name: values.account_name,
                        bank_name: values.bank_name,
                        bank_code: values.bank_code,
                        branch: values.branch || ''
                    }
            };

            // Call API
            const response = await fetch('/api/dashboard/payment/create-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create payment profile');
            }

            // Success - redirect to profiles list
            router.push('/dashboard/payments/profiles');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create payment profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <FormLoader visible={isSubmitting} />

            <div role="region" aria-label="Create payment profile" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <h1 className="big-text-2 font-bold text-white mb-6">
                    Create Payment Profile
                </h1>

                {/* Payment Method Selection */}
                <div className="mb-8">
                    <label className="block normal-text-2 text-slate-300 font-medium mb-3">
                        Payment Method <span className="text-accent-50">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('mobile_money')}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${paymentMethod === 'mobile_money'
                                ? 'border-accent bg-accent/10'
                                : 'border-accent/30 hover:border-accent/50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${paymentMethod === 'mobile_money' ? 'bg-blue-500/20' : 'bg-slate-500/20'
                                    } flex items-center justify-center`}>
                                    <Smartphone className={`w-6 h-6 ${paymentMethod === 'mobile_money' ? 'text-blue-400' : 'text-slate-400'
                                        }`} aria-hidden="true" />
                                </div>
                                <div className="text-left">
                                    <p className="big-text-5 font-bold text-white">Mobile Money</p>
                                    <p className="small-text text-slate-400">MTN, Vodafone, AirtelTigo</p>
                                </div>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod('bank_transfer')}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${paymentMethod === 'bank_transfer'
                                ? 'border-accent bg-accent/10'
                                : 'border-accent/30 hover:border-accent/50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${paymentMethod === 'bank_transfer' ? 'bg-purple-500/20' : 'bg-slate-500/20'
                                    } flex items-center justify-center`}>
                                    <Building2 className={`w-6 h-6 ${paymentMethod === 'bank_transfer' ? 'text-purple-400' : 'text-slate-400'
                                        }`} aria-hidden="true" />
                                </div>
                                <div className="text-left">
                                    <p className="big-text-5 font-bold text-white">Bank Transfer</p>
                                    <p className="small-text text-slate-400">All major Ghanaian banks</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-5 h-5" aria-hidden="true" />
                            <p className="normal-text-2 font-semibold">{error}</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <AppForm
                    initialValues={{
                        method: paymentMethod,
                        name: '',
                        description: '',
                        ...(paymentMethod === 'mobile_money'
                            ? { mobile_number: '', network: '', account_name: '' }
                            : { account_number: '', account_name: '', bank_name: '', bank_code: '', branch: '' }
                        )
                    }}
                    validationSchema={paymentMethod === 'mobile_money' ? mobileMoneyValidation : bankTransferValidation}
                    onSubmit={handleSubmit}
                >
                    {/* Profile Name */}
                    <AppFormField
                        type="text"
                        name="name"
                        label="Profile Name"
                        placeholder="e.g., My MTN Mobile Money"
                    />

                    {/* Description */}
                    <AppFormField
                        type="text"
                        name="description"
                        label="Description (Optional)"
                        placeholder="e.g., Primary account for receiving event payments"
                        multiline
                        rows={3}
                    />

                    {/* Mobile Money Fields */}
                    {paymentMethod === 'mobile_money' && (
                        <>
                            <AppFormField
                                type="tel"
                                name="mobile_number"
                                label="Mobile Number"
                                placeholder="+233241234567"
                            />

                            <AppFormField
                                type="select"
                                name="network"
                                label="Network"
                                options={networkOptions}
                            />

                            <AppFormField
                                type="text"
                                name="account_name"
                                label="Account Name"
                                placeholder="Full name as registered"
                            />
                        </>
                    )}

                    {/* Bank Transfer Fields */}
                    {paymentMethod === 'bank_transfer' && (
                        <>
                            <AppFormField
                                type="text"
                                name="account_number"
                                label="Account Number"
                                placeholder="1234567890"
                            />

                            <AppFormField
                                type="text"
                                name="account_name"
                                label="Account Name"
                                placeholder="Full name as registered"
                            />

                            <AppFormField
                                type="select"
                                name="bank_name"
                                label="Bank Name"
                                options={bankOptions}
                            />

                            <AppFormField
                                type="select"
                                name="bank_code"
                                label="Bank Code"
                                options={bankCodeOptions}
                            />

                            <AppFormField
                                type="text"
                                name="branch"
                                label="Branch (Optional)"
                                placeholder="e.g., Osu Branch"
                            />
                        </>
                    )}

                    {/* Verification Info */}
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="small-text text-blue-300">
                            <strong>Verification Process:</strong> A 1 GHS verification fee will be deducted from your account.
                            If successful, your profile will be verified within 1-2 minutes. This fee is non-refundable.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <SubmitButton title='Create Payment Profile' />
                </AppForm>
            </div>
        </>
    );
};

export default CreatePaymentProfileForm;