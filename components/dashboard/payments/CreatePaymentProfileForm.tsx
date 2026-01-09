"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Building2, AlertCircle } from 'lucide-react';

import { AppForm, AppFormField, SubmitButton, FormLoader } from '@/components';
import { bankTransferValidation } from '@/data/validationConstants';
import { bankOptions, getBankCodeFromName } from '@/data/static.dashboard';

const CreatePaymentProfileForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (values: Record<string, string>) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Automatically get bank code from bank name
            const bankCode = getBankCodeFromName(values.bank_name);

            if (!bankCode) {
                throw new Error('Invalid bank selected. Please try again.');
            }

            // Build request payload
            const payload = {
                method: 'bank_transfer',
                name: values.name,
                description: values.description || '',
                account_details: {
                    account_number: values.account_number,
                    account_name: values.account_name,
                    bank_name: values.bank_name,
                    bank_code: bankCode, // ✅ Automatically mapped
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
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-purple-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h1 className="big-text-2 font-bold text-white">
                            Create Bank Account Profile
                        </h1>
                        <p className="small-text text-slate-400">
                            Add your bank account for receiving payouts
                        </p>
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
                        name: '',
                        description: '',
                        account_number: '',
                        account_name: '',
                        bank_name: '',
                        branch: ''
                        // bank_code removed - added automatically
                    }}
                    validationSchema={bankTransferValidation}
                    onSubmit={handleSubmit}
                >
                    {/* Profile Name */}
                    <AppFormField
                        type="text"
                        name="name"
                        label="Profile Name"
                        placeholder="e.g., My GCB Bank Account"
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

                    {/* Account Number */}
                    <AppFormField
                        type="text"
                        name="account_number"
                        label="Account Number"
                        placeholder="1234567890"
                    />

                    {/* Account Name */}
                    <AppFormField
                        type="text"
                        name="account_name"
                        label="Account Name"
                        placeholder="Full name as registered with the bank"
                    />

                    {/* Bank Name - Only field user sees */}
                    <AppFormField
                        type="select"
                        name="bank_name"
                        label="Bank Name"
                        options={bankOptions}
                        placeholder="Select your bank"
                    />

                    {/* Bank Code field REMOVED - handled automatically */}

                    {/* Branch */}
                    <AppFormField
                        type="text"
                        name="branch"
                        label="Branch (Optional)"
                        placeholder="e.g., Osu Branch"
                    />

                    {/* Verification Info */}
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="small-text text-blue-300">
                            <strong>Verification Process:</strong> Your bank account will be verified automatically.
                            This process is free and takes about 5-10 seconds.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <SubmitButton title='Create Bank Account Profile' />
                </AppForm>
            </div>
        </>
    );
};

export default CreatePaymentProfileForm;
