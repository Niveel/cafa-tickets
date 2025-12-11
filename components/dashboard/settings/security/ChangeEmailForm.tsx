"use client";

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Mail, CheckCircle, Info } from 'lucide-react';
import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader } from '@/components';
import { passwordValidation } from '@/utils/validationUtils';

const ChangeEmailValidationSchema = Yup.object().shape({
    newEmail: Yup.string()
        .required('Email is required')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            'Please enter a valid email address'
        )
        .label('New Email'),
    password: passwordValidation().label('Password')
});

type ChangeEmailFormValues = {
    newEmail: string;
    password: string;
};

const ChangeEmailForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [maskedEmail, setMaskedEmail] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async (values: ChangeEmailFormValues, { resetForm }: any) => {
        setLoading(true);
        setError('');
        setVerificationSent(false);

        try {
            // Simulate API call: POST /api/v1/users/update-email/
            const payload = {
                new_email: values.newEmail,
                password: values.password
            };

            console.log('Requesting email change:', payload);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success - mask email
            const masked = values.newEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3');
            setMaskedEmail(masked);
            setVerificationSent(true);
            resetForm();

        } catch (err: any) {
            setError(err.message || 'Failed to send verification link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-white">
                        Change Email Address
                    </h2>
                    <p className="small-text text-slate-400">
                        Update your account email
                    </p>
                </div>
            </div>

            {!verificationSent ? (
                <>
                    <AppErrorMessage visible={!!error} error={error} />

                    <AppForm
                        initialValues={{
                            newEmail: '',
                            password: ''
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={ChangeEmailValidationSchema}
                    >
                        <FormLoader visible={loading} message="Sending verification link..." />

                        <div className="space-y-4">
                            {/* New Email */}
                            <AppFormField
                                name="newEmail"
                                label="New Email Address"
                                type="email"
                                placeholder="Enter new email address"
                                required
                            />

                            {/* Password Confirmation */}
                            <AppFormField
                                name="password"
                                label="Current Password"
                                type={passwordVisible ? "text" : "password"}
                                icon={passwordVisible ? "eye-slash" : "eye"}
                                iconClick={() => setPasswordVisible(prev => !prev)}
                                iconAria={passwordVisible ? "Hide password" : "Show password"}
                                placeholder="Confirm your password"
                                required
                            />

                            {/* Info */}
                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <div className="flex items-start gap-2">
                                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <p className="small-text text-blue-300">
                                        You&apos;ll receive a verification link at your new email address. Your old email will remain active until you verify the new one.
                                    </p>
                                </div>
                            </div>

                            <SubmitButton title="Change Email" />
                        </div>
                    </AppForm>
                </>
            ) : (
                /* Success State */
                <div className="space-y-4">
                    <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p className="normal-text-2 font-semibold text-emerald-400 mb-2">
                                    Verification Link Sent!
                                </p>
                                <p className="small-text text-emerald-300">
                                    We&apos;ve sent a verification link to <strong>{maskedEmail}</strong>. Please check your inbox and click the link to complete the email change.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="small-text text-blue-300">
                            Didn&apos;t receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => setVerificationSent(false)}
                                className="text-blue-400 hover:text-blue-300 font-semibold underline"
                            >
                                try again
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeEmailForm;