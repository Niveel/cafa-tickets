"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Lock, ArrowLeft } from "lucide-react";

import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader } from "@/components";
import { PasswordResetValidationSchema, PasswordResetFormValues } from "@/data/validationConstants";

type Props = {
    uid: string;
    token: string;
};

type ResetState = 'form' | 'loading' | 'success' | 'error';

const PasswordResetContent = ({ uid, token }: Props) => {
    const router = useRouter();
    const [status, setStatus] = useState<ResetState>('form');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const handlePasswordReset = async (values: PasswordResetFormValues) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/password-reset-confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid,
                    token,
                    new_password: values.password,
                }),
            });

            // Djoser returns 204 No Content on success
            if (response.status === 204 || response.ok) {
                setStatus('success');
                
                // Start countdown
                let count = 3;
                const interval = setInterval(() => {
                    count -= 1;
                    setCountdown(count);
                    if (count === 0) {
                        clearInterval(interval);
                        router.push('/login?password_reset=true');
                    }
                }, 1000);
                
                return;
            }

            const data = await response.json();
            console.log('Password reset error:', data);

            // Handle specific error messages
            if (data.new_password) {
                setError(Array.isArray(data.new_password) ? data.new_password[0] : data.new_password);
            } else if (data.uid) {
                setError(Array.isArray(data.uid) ? data.uid[0] : data.uid);
            } else if (data.token) {
                setError(Array.isArray(data.token) ? data.token[0] : data.token);
            } else if (data.detail) {
                setError(data.detail);
            } else {
                setError(data.error || 'Failed to reset password. The link may be invalid or expired.');
            }

            setStatus('error');

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Password reset failed:", err.message);
                setError(err.message);
            } else {
                console.error("Unknown error during password reset:", err);
                setError("Something went wrong. Please try again.");
            }
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    // Form State
    if (status === 'form') {
        return (
            <div className="w-full max-w-2xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold mb-6"
                >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Back to Login
                </Link>

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                            <Lock className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <div>
                            <h1 className="big-text-3 font-bold text-white">Reset Password</h1>
                            <p className="small-text text-slate-300">Create a new password</p>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h2 className="massive-text font-bold text-white leading-tight">
                            Set New Password
                        </h2>
                        <p className="big-text-5 text-slate-200">
                            Choose a strong password for your account
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-primary-100 rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-accent">
                    <AppErrorMessage visible={!!error} error={error} />

                    <AppForm
                        initialValues={{
                            password: "",
                            confirmPassword: ""
                        }}
                        onSubmit={handlePasswordReset}
                        validationSchema={PasswordResetValidationSchema}
                    >
                        <FormLoader visible={loading} message="Resetting your password..." />

                        <div className="space-y-5">
                            <AppFormField
                                name="password"
                                placeholder="Enter new password"
                                label="New Password"
                                type={passwordVisible ? "text" : "password"}
                                icon={passwordVisible ? "eye-slash" : "eye"}
                                iconClick={() => setPasswordVisible(prev => !prev)}
                                iconAria={passwordVisible ? "Hide password" : "Show password"}
                                required
                            />

                            <AppFormField
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                label="Confirm New Password"
                                type={confirmPasswordVisible ? "text" : "password"}
                                icon={confirmPasswordVisible ? "eye-slash" : "eye"}
                                iconClick={() => setConfirmPasswordVisible(prev => !prev)}
                                iconAria={confirmPasswordVisible ? "Hide password" : "Show password"}
                                required
                            />

                            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <p className="small-text text-blue-300 mb-2">
                                    <strong>Password Requirements:</strong>
                                </p>
                                <ul className="small-text text-blue-300 space-y-1">
                                    <li>• At least 8 characters long</li>
                                    <li>• Mix of letters and numbers recommended</li>
                                    <li>• Avoid common passwords</li>
                                </ul>
                            </div>

                            <SubmitButton title="Reset Password" />
                        </div>
                    </AppForm>
                </div>
            </div>
        );
    }

    // Success State
    if (status === 'success') {
        return (
            <div className="w-full max-w-2xl mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-emerald-400" aria-hidden="true" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="big-text-1 font-bold text-white mb-3">
                        Password Reset Successful!
                    </h1>
                    <p className="big-text-5 text-slate-200">
                        Your password has been changed successfully
                    </p>
                </div>

                <div className="bg-primary-100 rounded-2xl p-6 shadow-2xl border-2 border-accent/30">
                    <div className="text-center">
                        <p className="normal-text-2 text-slate-300 mb-4">
                            You can now login with your new password. Redirecting you to login page in...
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <span className="big-text-1 font-bold text-accent">
                                {countdown}
                            </span>
                            <span className="normal-text text-slate-400">
                                {countdown === 1 ? 'second' : 'seconds'}
                            </span>
                        </div>

                        <button
                            onClick={() => router.push('/login?password_reset=true')}
                            className="mt-6 px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text transition-all"
                        >
                            Go to Login Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (status === 'error') {
        return (
            <div className="w-full max-w-2xl mx-auto">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                        <XCircle className="w-10 h-10 text-red-400" aria-hidden="true" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="big-text-1 font-bold text-white mb-3">
                        Password Reset Failed
                    </h1>
                    <p className="big-text-5 text-slate-200">
                        We couldn&apos;t reset your password
                    </p>
                </div>

                <div className="bg-primary-100 rounded-2xl p-6 shadow-2xl border-2 border-red-500/30">
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 mb-6">
                        <p className="normal-text-2 text-red-400">
                            {error}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="small-text text-slate-400 mb-4">
                            Possible reasons:
                        </p>
                        <ul className="small-text text-slate-400 text-left space-y-2 mb-6">
                            <li>• The reset link has expired</li>
                            <li>• The link has already been used</li>
                            <li>• The link is invalid or corrupted</li>
                            <li>• The password doesn&apos;t meet requirements</li>
                        </ul>

                        <div className="flex gap-3">
                            <Link
                                href="/forgot-password"
                                className="flex-1 px-4 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text-2 transition-all text-center"
                            >
                                Request New Link
                            </Link>
                            <Link
                                href="/login"
                                className="flex-1 px-4 py-3 bg-primary-200 hover:bg-primary-300 text-white rounded-xl font-semibold normal-text-2 transition-all text-center"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default PasswordResetContent;