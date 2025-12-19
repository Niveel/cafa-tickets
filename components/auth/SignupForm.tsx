"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader, EmailVerificationPrompt } from "@/components";
import { SignupValidationSchema, SignupFormValues } from "@/data/validationConstants";

const SignupForm = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");

    const handleSignup = async (values: SignupFormValues) => {
        setLoading(true);
        setError("");

        const payload = {
            username: values.username,
            email: values.email,
            password: values.password,
        };

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("Signup error response:", data);
                
                // ✅ PRIORITY 1: Check for backend validation errors in 'details' object
                if (data.details) {
                    // Backend returns errors like: { details: { password: ["Error message"] } }
                    const details = data.details;
                    
                    // Check each field in priority order
                    if (details.password) {
                        setError(Array.isArray(details.password) ? details.password[0] : details.password);
                    } else if (details.username) {
                        setError(Array.isArray(details.username) ? details.username[0] : details.username);
                    } else if (details.email) {
                        setError(Array.isArray(details.email) ? details.email[0] : details.email);
                    } else {
                        // If there are other fields in details, show first error
                        const firstError = Object.values(details)[0];
                        setError(Array.isArray(firstError) ? firstError[0] : String(firstError));
                    }
                    return;
                }
                
                // ✅ PRIORITY 2: Check for top-level field errors (old format)
                if (data.username) {
                    setError(Array.isArray(data.username) ? data.username[0] : data.username);
                    return;
                }
                if (data.email) {
                    setError(Array.isArray(data.email) ? data.email[0] : data.email);
                    return;
                }
                if (data.password) {
                    setError(Array.isArray(data.password) ? data.password[0] : data.password);
                    return;
                }
                
                // ✅ PRIORITY 3: Check for general error messages
                if (data.message && data.message !== 'The data provided is invalid') {
                    setError(data.message);
                    return;
                }
                
                // ✅ FALLBACK: Generic error messages
                setError(data.error || 'Registration failed. Please try again.');
                return;
            }

            // Success - show email verification prompt
            setRegisteredEmail(values.email);

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Signup failed:", err.message);
                setError(err.message);
            } else {
                console.error("Unknown error during signup:", err);
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Show email verification prompt after successful signup
    if (registeredEmail) {
        return <EmailVerificationPrompt email={registeredEmail} />;
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                {/* Logo/Brand */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <span className="text-2xl">🎫</span>
                    </div>
                    <div>
                        <h1 className="big-text-3 font-bold text-white">Cafa Ticket</h1>
                        <p className="small-text text-slate-300">Join the Community</p>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h2 className="massive-text font-bold text-white leading-tight">
                            Create Account
                        </h2>
                    </div>
                    <p className="big-text-5 text-slate-200">
                        Start your journey with Ghana&apos;s premier event ticketing platform. Access thousands of events!
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-primary-100 rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-accent">
                <AppErrorMessage visible={!!error} error={error} />

                <AppForm
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    onSubmit={handleSignup}
                    validationSchema={SignupValidationSchema}
                >
                    <FormLoader visible={loading} message="Creating your account..." />

                    <div className="space-y-5">
                        {/* Username */}
                        <AppFormField
                            name="username"
                            placeholder="e.g. kwame_mensah"
                            label="Username"
                            type="text"
                            required
                        />

                        {/* Email */}
                        <AppFormField
                            name="email"
                            placeholder="you@example.com"
                            label="Email Address"
                            type="email"
                            required
                        />

                        {/* Password & Confirm Password - Grid */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <AppFormField
                                name="password"
                                placeholder="Enter password"
                                label="Password"
                                type={passwordVisible ? "text" : "password"}
                                icon={passwordVisible ? "eye-slash" : "eye"}
                                iconClick={() => setPasswordVisible(prev => !prev)}
                                iconAria={passwordVisible ? "Hide password" : "Show password"}
                                required
                            />

                            <AppFormField
                                name="confirmPassword"
                                placeholder="Confirm password"
                                label="Confirm Password"
                                type={confirmPasswordVisible ? "text" : "password"}
                                icon={confirmPasswordVisible ? "eye-slash" : "eye"}
                                iconClick={() => setConfirmPasswordVisible(prev => !prev)}
                                iconAria={confirmPasswordVisible ? "Hide password" : "Show password"}
                                required
                            />
                        </div>

                        {/* Terms & Conditions */}
                        <div className="p-4 bg-primary rounded-xl border border-accent/30">
                            <p className="small-text text-slate-300 leading-relaxed">
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="text-accent-50 hover:text-accent-100 font-semibold">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-accent-50 hover:text-accent-100 font-semibold">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>

                        <SubmitButton title="Create Account" />

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-accent/30" />
                            </div>
                            <div className="relative flex justify-center normal-text-2">
                                <span className="bg-primary-100 px-4 text-slate-300">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-accent hover:bg-accent text-white hover:text-white rounded-xl font-semibold normal-text transition-all duration-300 hover:scale-[1.02]"
                        >
                            Sign In
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </div>
                </AppForm>
            </div>
        </div>
    );
};

export default SignupForm;