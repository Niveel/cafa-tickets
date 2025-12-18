"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import * as Yup from 'yup';

import { AppForm, AppFormField, SubmitButton, FormLoader } from '@/components';
import { PaymentProfile } from '@/types/payments.types';

type Props = {
    profile: PaymentProfile;
};

const editValidationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must not exceed 100 characters')
        .required('Profile name is required'),
    description: Yup.string()
        .max(500, 'Description must not exceed 500 characters'),
});

const EditPaymentProfileForm = ({ profile }: Props) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (values: Record<string, string>) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/dashboard/payment/edit-profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: profile.id,
                    name: values.name,
                    description: values.description || ''
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update payment profile');
            }

            // Success - redirect to profiles list
            router.push('/dashboard/payments/profiles');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update payment profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <FormLoader visible={isSubmitting} />

            <div role="region" aria-label="Edit payment profile" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
                <h1 className="big-text-2 font-bold text-white mb-6">
                    Edit Payment Profile
                </h1>

                {/* Account Details Display (Read-only) */}
                <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="normal-text-2 text-slate-400 mb-2">Payment Method</p>
                    <p className="big-text-5 font-semibold text-white capitalize mb-4">
                        {profile.method.replace('_', ' ')}
                    </p>
                    <p className="small-text text-slate-400">
                        Account details cannot be changed. To use a different account, create a new payment profile.
                    </p>
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
                        name: profile.name,
                        description: profile.description || ''
                    }}
                    validationSchema={editValidationSchema}
                    onSubmit={handleSubmit}
                >
                    <AppFormField
                        type="text"
                        name="name"
                        label="Profile Name"
                        placeholder="e.g., My MTN Mobile Money"
                    />

                    <AppFormField
                        type="text"
                        name="description"
                        label="Description (Optional)"
                        placeholder="e.g., Primary account for receiving event payments"
                        multiline
                        rows={3}
                    />

                    <SubmitButton title='Update Payment Profile' />
                </AppForm>
            </div>
        </>
    );
};

export default EditPaymentProfileForm;