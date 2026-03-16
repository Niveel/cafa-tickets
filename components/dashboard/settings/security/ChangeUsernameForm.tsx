"use client";

import React, { useState } from 'react';
import * as Yup from 'yup';
import { User, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader } from '@/components';
import { passwordValidation } from '@/utils/validationUtils';
import { CurrentUser } from '@/types/general.types';

type Props = {
    currentUser: CurrentUser;
};

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

const ChangeUsernameForm = ({ currentUser }: Props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [displayUsername, setDisplayUsername] = useState(currentUser.username);

    const handleSubmit = async (values: ChangeUsernameFormValues, { resetForm }: any) => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/auth/change-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: values.newUsername,
                    password: values.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message || data.error || 'Failed to change username';
                throw new Error(errorMessage);
            }

            setSuccess(true);
            setDisplayUsername(values.newUsername);
            resetForm();
            router.refresh();
            setTimeout(() => setSuccess(false), 3000);

        } catch (err: any) {
            setError(err.message || 'Failed to change username. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                        Current username: <span className="font-semibold text-white">@{displayUsername}</span>
                    </p>
                </div>
            </div>

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
                    />

                    <SubmitButton title="Change Username" />
                </div>
            </AppForm>
        </div>
    );
};

export default ChangeUsernameForm;
