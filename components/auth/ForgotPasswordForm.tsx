"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader, PasswordResetEmailSent } from "@/components";
import { ForgotPasswordValidationSchema, ForgotPasswordFormValues } from "@/data/validationConstants";

const ForgotPasswordForm = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email }),
            });

            // Djoser returns 204 No Content on success
            if (response.status === 204 || response.ok) {
                setResetEmail(values.email);
                return;
            }

            const data = await response.json();

            // Check for email field errors
            if (data.email) {
                setError(Array.isArray(data.email) ? data.email[0] : data.email);
                return;
            }

            // Check for general errors
            if (data.detail) {
                setError(data.detail);
                return;
            }

            setError(data.error || 'Failed to send reset email. Please try again.');

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Forgot password failed:", err.message);
                setError(err.message);
            } else {
                console.error("Unknown error during forgot password:", err);
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Show email sent confirmation
    if (resetEmail) {
        return <PasswordResetEmailSent email={resetEmail} />;
    }

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
                        <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                        <h1 className="big-text-3 font-bold text-white">Forgot Password</h1>
                        <p className="small-text text-slate-300">Reset your account password</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <h2 className="massive-text font-bold text-white leading-tight">
                        Password Reset
                    </h2>
                    <p className="big-text-5 text-slate-200">
                        Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-primary-100 rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-accent">
                <AppErrorMessage visible={!!error} error={error} />

                <AppForm
                    initialValues={{ email: "" }}
                    onSubmit={handleForgotPassword}
                    validationSchema={ForgotPasswordValidationSchema}
                >
                    <FormLoader visible={loading} message="Sending reset link..." />

                    <div className="space-y-5">
                        <AppFormField
                            name="email"
                            placeholder="you@example.com"
                            label="Email Address"
                            type="email"
                            required
                        />

                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <p className="small-text text-blue-300">
                                💡 Enter the email address you used to create your account. We&apos;ll send you a secure link to reset your password.
                            </p>
                        </div>

                        <SubmitButton title="Send Reset Link" />

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-accent/30" />
                            </div>
                            <div className="relative flex justify-center normal-text-2">
                                <span className="bg-primary-100 px-4 text-slate-300">
                                    Remember your password?
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-accent hover:bg-accent text-white hover:text-white rounded-xl font-semibold normal-text transition-all duration-300"
                        >
                            Sign In Instead
                        </Link>
                    </div>
                </AppForm>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;