"use client";

import React, { useState } from 'react';
import * as Yup from 'yup';
import { User, CheckCircle, AlertTriangle } from 'lucide-react';
import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader } from '@/components';
import { passwordValidation } from '@/utils/validationUtils';

const ChangeUsernameValidationSchema = Yup.object().shape({
    newUsername: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must not exceed 30 characters')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Username can only contain letters, numbers, and underscores'
        )
        .label('Username'),
    password: passwordValidation().label('Password')
});

type ChangeUsernameFormValues = {
    newUsername: string;
    password: string;
};

const ChangeUsernameForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const currentUsername = 'johndoe123'; // Mock current username
    const lastChanged = '2024-11-15'; // Mock last change date

    const handleSubmit = async (values: ChangeUsernameFormValues, { resetForm }: any) => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Simulate API call: PATCH /api/v1/users/profile/
            const payload = {
                username: values.newUsername,
                password: values.password
            };

            console.log('Changing username:', payload);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success
            setSuccess(true);
            resetForm();

            // Hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);

        } catch (err: any) {
            setError(err.message || 'Failed to change username. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Calculate if user can change username (30 days since last change)
    const canChangeUsername = () => {
        const lastChangeDate = new Date(lastChanged);
        const today = new Date();
        const daysSinceChange = Math.floor((today.getTime() - lastChangeDate.getTime()) / (1000 * 60 * 60 * 24));
        return daysSinceChange >= 30;
    };

    const daysUntilChange = () => {
        const lastChangeDate = new Date(lastChanged);
        const today = new Date();
        const daysSinceChange = Math.floor((today.getTime() - lastChangeDate.getTime()) / (1000 * 60 * 60 * 24));
        return Math.max(0, 30 - daysSinceChange);
    };

    const isAllowed = canChangeUsername();

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                </div>
                <div className="flex-1">
                    <h2 className="big-text-4 font-bold text-white">
                        Change Username
                    </h2>
                    <p className="small-text text-slate-400">
                        Current username: <span className="font-semibold text-white">@{currentUsername}</span>
                    </p>
                </div>
            </div>

            {/* Restriction Warning */}
            {!isAllowed && (
                <div className="mb-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="normal-text-2 font-semibold text-amber-300 mb-1">
                                Username Change Restricted
                            </p>
                            <p className="small-text text-amber-300">
                                You can only change your username once every 30 days. You&apos;ll be able to change it again in <strong>{daysUntilChange()} days</strong> (last changed on {new Date(lastChanged).toLocaleDateString('en-GH')}).
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <AppErrorMessage visible={!!error} error={error} />

            {success && (
                <div className="mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        <p className="small-text text-emerald-400">Username changed successfully!</p>
                    </div>
                </div>
            )}

            <AppForm
                initialValues={{
                    newUsername: '',
                    password: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={ChangeUsernameValidationSchema}
            >
                <FormLoader visible={loading} message="Changing username..." />

                <div className="space-y-4">
                    {/* New Username */}
                    <div>
                        <AppFormField
                            name="newUsername"
                            label="New Username"
                            type="text"
                            placeholder="Enter new username"
                            icon="at-sign"
                            required
                            disabled={!isAllowed}
                        />
                        <p className="mt-1 small-text text-slate-500">
                            Only letters, numbers, and underscores (3-30 characters)
                        </p>
                    </div>

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
                        disabled={!isAllowed}
                    />

                    <SubmitButton title="Change Username" disabled={!isAllowed} />
                </div>
            </AppForm>
        </div>
    );
};

export default ChangeUsernameForm;