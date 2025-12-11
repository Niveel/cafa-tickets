"use client";

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { AppForm, AppFormField, AppErrorMessage, FormLoader } from '@/components';
import { passwordValidation } from '@/utils/validationUtils';

const DeleteAccountValidationSchema = Yup.object().shape({
    password: passwordValidation().label('Password'),
    confirmation: Yup.string()
        .required('Confirmation text is required')
        .oneOf(['DELETE MY ACCOUNT'], 'You must type "DELETE MY ACCOUNT" exactly')
        .label('Confirmation')
});

type DeleteAccountFormValues = {
    password: string;
    confirmation: string;
};

const DeleteAccountSection = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Mock active items - in production, fetch from API
    const activeTickets = 0; // Change to > 0 to test restriction
    const upcomingEvents = 0; // Change to > 0 to test restriction

    const handleDelete = async (values: DeleteAccountFormValues) => {
        setLoading(true);
        setError('');

        try {
            // Check for active items
            if (activeTickets > 0 || upcomingEvents > 0) {
                throw new Error(
                    `Cannot delete account. You have ${activeTickets} active tickets and ${upcomingEvents} upcoming events. Please cancel or transfer them first.`
                );
            }

            // Simulate API call: DELETE /api/v1/users/account/
            const payload = {
                password: values.password,
                confirmation: values.confirmation
            };

            console.log('Deleting account:', payload);
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In production: Logout and redirect
            console.log('Account deleted successfully');
            // window.location.href = '/login?deleted=true';

        } catch (err: any) {
            setError(err.message || 'Failed to delete account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const hasActiveItems = activeTickets > 0 || upcomingEvents > 0;

    return (
        <div className="bg-primary rounded-xl border-2 border-red-500/30 p-6">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                    <Trash2 className="w-5 h-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="flex-1">
                    <h2 className="big-text-4 font-bold text-white mb-2">
                        Delete Account
                    </h2>
                    <p className="normal-text-2 text-slate-300">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                </div>
            </div>

            {/* Warning Message */}
            <div className="mb-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="normal-text-2 font-semibold text-red-400 mb-2">
                            Warning: This Action is Permanent
                        </p>
                        <ul className="small-text text-red-300 space-y-1">
                            <li>• All your personal data will be deleted within 30 days</li>
                            <li>• You will lose access to all purchased tickets</li>
                            <li>• Your events will be removed (if no tickets sold)</li>
                            <li>• This action cannot be reversed</li>
                            <li>• Transaction records may be anonymized and retained for legal purposes (7 years)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Active Items Restriction */}
            {hasActiveItems && (
                <div className="mb-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="normal-text-2 font-semibold text-amber-300 mb-2">
                                Cannot Delete Account
                            </p>
                            <p className="small-text text-amber-300">
                                You have <strong>{activeTickets} active tickets</strong> and <strong>{upcomingEvents} upcoming events</strong>. Please cancel or transfer them before deleting your account.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!showForm ? (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    disabled={hasActiveItems}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg font-semibold normal-text-2 transition-all border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    Delete My Account
                </button>
            ) : (
                <div className="space-y-4">
                    <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <p className="small-text text-red-300">
                            To confirm account deletion, please enter your password and type <strong>&quot;DELETE MY ACCOUNT&quot;</strong> exactly as shown.
                        </p>
                    </div>

                    <AppErrorMessage visible={!!error} error={error} />

                    <AppForm
                        initialValues={{
                            password: '',
                            confirmation: ''
                        }}
                        onSubmit={handleDelete}
                        validationSchema={DeleteAccountValidationSchema}
                    >
                        <FormLoader visible={loading} message="Deleting your account..." />

                        <div className="space-y-4">
                            {/* Password */}
                            <AppFormField
                                name="password"
                                label="Your Password"
                                type={passwordVisible ? "text" : "password"}
                                icon={passwordVisible ? "eye-slash" : "eye"}
                                iconClick={() => setPasswordVisible(prev => !prev)}
                                iconAria={passwordVisible ? "Hide password" : "Show password"}
                                placeholder="Enter your password"
                                required
                            />

                            {/* Confirmation Text */}
                            <div>
                                <AppFormField
                                    name="confirmation"
                                    label="Type DELETE MY ACCOUNT to confirm"
                                    type="text"
                                    placeholder="DELETE MY ACCOUNT"
                                    required
                                />
                                <p className="mt-1 small-text text-slate-500">
                                    Must be typed exactly as shown (case sensitive)
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setError('');
                                    }}
                                    disabled={loading}
                                    className="flex-1 h-11 bg-primary-100 hover:bg-primary-200 text-white rounded-lg font-semibold normal-text-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold normal-text-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                                            Delete Account
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </AppForm>
                </div>
            )}
        </div>
    );
};

export default DeleteAccountSection;