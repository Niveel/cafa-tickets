"use client";

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Lock, CheckCircle } from 'lucide-react';
import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader } from '@/components';
import { passwordValidation } from '@/utils/validationUtils';

const ChangePasswordValidationSchema = Yup.object().shape({
    currentPassword: passwordValidation().label('Current Password'),
    newPassword: passwordValidation().label('New Password'),
    confirmPassword: Yup.string()
        .required('Please confirm your new password')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .label('Confirm Password')
});

type ChangePasswordFormValues = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleSubmit = async (values: ChangePasswordFormValues, { resetForm }: any) => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Simulate API call: POST /api/v1/auth/change-password/
            const payload = {
                current_password: values.currentPassword,
                new_password: values.newPassword,
                confirm_password: values.confirmPassword
            };

            console.log('Changing password:', payload);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success
            setSuccess(true);
            resetForm();

            // Hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);

        } catch (err: any) {
            setError(err.message || 'Failed to change password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-white">
                        Change Password
                    </h2>
                    <p className="small-text text-slate-400">
                        Update your account password
                    </p>
                </div>
            </div>

            <AppErrorMessage visible={!!error} error={error} />

            {success && (
                <div className="mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        <p className="small-text text-emerald-400">Password changed successfully!</p>
                    </div>
                </div>
            )}

            <AppForm
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={ChangePasswordValidationSchema}
            >
                <FormLoader visible={loading} message="Changing password..." />

                <div className="space-y-4">
                    {/* Current Password */}
                    <AppFormField
                        name="currentPassword"
                        label="Current Password"
                        type={currentPasswordVisible ? "text" : "password"}
                        icon={currentPasswordVisible ? "eye-slash" : "eye"}
                        iconClick={() => setCurrentPasswordVisible(prev => !prev)}
                        iconAria={currentPasswordVisible ? "Hide password" : "Show password"}
                        placeholder="Enter current password"
                        required
                    />

                    {/* New Password */}
                    <AppFormField
                        name="newPassword"
                        label="New Password"
                        type={newPasswordVisible ? "text" : "password"}
                        icon={newPasswordVisible ? "eye-slash" : "eye"}
                        iconClick={() => setNewPasswordVisible(prev => !prev)}
                        iconAria={newPasswordVisible ? "Hide password" : "Show password"}
                        placeholder="Enter new password"
                        required
                    />

                    {/* Confirm New Password */}
                    <AppFormField
                        name="confirmPassword"
                        label="Confirm New Password"
                        type={confirmPasswordVisible ? "text" : "password"}
                        icon={confirmPasswordVisible ? "eye-slash" : "eye"}
                        iconClick={() => setConfirmPasswordVisible(prev => !prev)}
                        iconAria={confirmPasswordVisible ? "Hide password" : "Show password"}
                        placeholder="Confirm new password"
                        required
                    />

                    <SubmitButton title="Change Password" />
                </div>
            </AppForm>
        </div>
    );
};

export default ChangePasswordForm;