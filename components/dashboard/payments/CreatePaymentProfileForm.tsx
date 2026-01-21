// components/dashboard/payments/CreatePaymentProfileForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, AlertCircle } from 'lucide-react';
import { useFormikContext } from 'formik';

import { AppForm, AppFormField, SubmitButton, FormLoader } from '@/components';
import { bankTransferValidation } from '@/data/validationConstants';
import { useBankForm } from '@/hooks/useBankForm';
import { useCountries } from '@/hooks/useCountries';

// Inner component that has access to Formik context
const FormFields = () => {
    const { values } = useFormikContext<Record<string, string>>();
    
    const {
        bankOptions,
        isLoadingBanks,
        selectedCountry,
        setSelectedCountry,
        isDetectingCountry,
        getBankFromCode,
    } = useBankForm();

    const { countryOptions, isLoading: isLoadingCountries } = useCountries();

    // ✅ Sync form's country field with bank fetching
    useEffect(() => {
        if (values.country && values.country !== selectedCountry) {
            console.log(`🔄 Country changed to: ${values.country}`);
            setSelectedCountry(values.country);
        }
    }, [values.country, selectedCountry, setSelectedCountry]);

    return (
        <>
            <AppFormField
                type="text"
                name="name"
                label="Profile Name"
                placeholder="e.g., My Primary Bank Account"
                required
            />

            <AppFormField
                type="text"
                name="description"
                label="Description (Optional)"
                placeholder="e.g., Primary account for receiving event payments"
                multiline
                rows={3}
            />

            <AppFormField
                type="searchable-select"
                name="country"
                label="Country"
                options={countryOptions}
                placeholder={isDetectingCountry ? "Detecting your country..." : "Search for your country..."}
                isLoading={isDetectingCountry || isLoadingCountries}
                required
            />

            <AppFormField
                type="searchable-select"
                name="bank_name"
                label="Bank Name"
                options={bankOptions}
                placeholder={
                    isLoadingBanks 
                        ? "Loading banks..." 
                        : bankOptions.length === 0
                        ? "No banks available for this country"
                        : "Search for your bank..."
                }
                isLoading={isLoadingBanks}
                required
            />

            <AppFormField
                type="text"
                name="account_number"
                label="Account Number"
                placeholder="Enter your bank account number"
                required
            />

            <AppFormField
                type="text"
                name="account_name"
                label="Account Name"
                placeholder="Full name as registered with the bank"
                required
            />

            <AppFormField
                type="text"
                name="branch"
                label="Branch (Optional)"
                placeholder="e.g., Main Branch, Osu Branch"
            />

            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="small-text text-blue-300">
                    <strong>Verification:</strong> Your bank account will be verified automatically.
                    This is free and takes 5-10 seconds.
                </p>
            </div>

            <SubmitButton title='Create Bank Account Profile' />
        </>
    );
};

const CreatePaymentProfileForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { selectedCountry, isDetectingCountry, getBankFromCode } = useBankForm();

    const handleSubmit = async (values: Record<string, string>) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const bank = getBankFromCode(values.bank_name);

            if (!bank) {
                throw new Error('Invalid bank selected. Please try again.');
            }

            const payload = {
                method: 'bank_transfer',
                name: values.name,
                description: values.description || '',
                account_details: {
                    account_number: values.account_number,
                    account_name: values.account_name,
                    bank_name: bank.name,
                    bank_code: bank.code,
                    branch: values.branch || ''
                }
            };

            const response = await fetch('/api/dashboard/payment/create-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create payment profile');
            }

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

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-5 h-5" aria-hidden="true" />
                            <p className="normal-text-2 font-semibold">{error}</p>
                        </div>
                    </div>
                )}

                <AppForm
                    initialValues={{
                        name: '',
                        description: '',
                        account_number: '',
                        account_name: '',
                        country: selectedCountry,
                        bank_name: '',
                        branch: ''
                    }}
                    validationSchema={bankTransferValidation}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    <FormFields />
                </AppForm>
            </div>
        </>
    );
};

export default CreatePaymentProfileForm;