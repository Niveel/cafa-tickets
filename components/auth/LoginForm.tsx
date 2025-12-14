"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader, ProfileUpdatePrompt } from "@/components";
import { LoginValidationSchema, LoginFormValues } from "@/data/validationConstants";
import { CurrentUser } from "@/types/general.types";

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showActivatedMessage, setShowActivatedMessage] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<CurrentUser | null>(null);

    // Check for activation success message
    useEffect(() => {
        const activated = searchParams.get('activated');
        if (activated === 'true') {
            setShowActivatedMessage(true);
            // Hide message after 5 seconds
            setTimeout(() => setShowActivatedMessage(false), 5000);
        }
    }, [searchParams]);

    const handleLogin = async (values: LoginFormValues) => {
        setLoading(true);
        setLoginError("");

        // Backend expects "email" field but accepts email or username
        const payload = {
            email: values.emailOrUsername,
            password: values.password,
        };

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (!response.ok) {
                // Handle specific error messages from backend
                let errorMessage = 'Invalid email/username or password';

                if (data.message) {
                    errorMessage = data.message;
                } else if (data.error) {
                    errorMessage = data.error;
                } else if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.email) {
                    errorMessage = Array.isArray(data.email) ? data.email[0] : data.email;
                } else if (data.password) {
                    errorMessage = Array.isArray(data.password) ? data.password[0] : data.password;
                }

                setLoginError(errorMessage);
                return;
            }

            // Success - Tokens are stored in HttpOnly cookies by the API route
            if (data.user) {
                console.log('Login successful, tokens stored in HttpOnly cookies');
                
                // Show profile update prompt
                setLoggedInUser(data.user);
            } else {
                throw new Error('Invalid response: Missing user data');
            }

        } catch (error: any) {
            console.error("Login failed:", error);
            setLoginError(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = () => {
        router.push('/dashboard/profile/edit');
    };

    const handleSkipProfile = () => {
        router.push('/dashboard');
    };


    // Show profile update prompt after successful login
    if (loggedInUser) {
        return (
            <ProfileUpdatePrompt
                user={loggedInUser}
                onUpdateProfile={handleUpdateProfile}
                onSkip={handleSkipProfile}
            />
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Activation Success Message */}
            {showActivatedMessage && (
                <div className="mb-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 animate-fade-in">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                        <div>
                            <p className="normal-text-2 font-semibold text-emerald-400">
                                Account Activated!
                            </p>
                            <p className="small-text text-emerald-300">
                                You can now login to your account
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="mb-8">
                {/* Logo/Brand */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <span className="text-2xl">🎫</span>
                    </div>
                    <div>
                        <h1 className="big-text-3 font-bold text-white">Cafa Tickets</h1>
                        <p className="small-text text-slate-300">Your Gateway to Amazing Events</p>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="space-y-1">
                    <h2 className="massive-text font-bold text-white leading-tight">
                        Sign In
                    </h2>
                    <p className="big-text-5 text-slate-200">
                        Enter your credentials to access your account and discover upcoming events across Ghana.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-primary-100 rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-accent">
                <AppErrorMessage visible={!!loginError} error={loginError} />

                <AppForm
                    initialValues={{ emailOrUsername: "", password: "" }}
                    onSubmit={handleLogin}
                    validationSchema={LoginValidationSchema}
                >
                    <FormLoader visible={loading} message="Signing you in..." />

                    <div className="space-y-5">
                        <AppFormField
                            name="emailOrUsername"
                            placeholder="Enter email or username"
                            label="Email or Username"
                            type="text"
                            required
                        />

                        <AppFormField
                            name="password"
                            placeholder="Enter your password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            icon={showPassword ? "eye-slash" : "eye"}
                            iconClick={() => setShowPassword((prev) => !prev)}
                            iconAria={showPassword ? "Hide Password" : "Show Password"}
                            required
                        />

                        <div className="flex items-center justify-between">
                            <Link
                                href="/forgot-password"
                                className="small-text text-accent-50 hover:text-accent-100 font-semibold transition-colors hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <SubmitButton title="Sign In" />

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-accent/30" />
                            </div>
                            <div className="relative flex justify-center normal-text-2">
                                <span className="bg-primary-100 px-4 text-slate-300">
                                    New to Cafa Tickets?
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/signup"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-accent hover:bg-accent text-white hover:text-white rounded-xl font-semibold normal-text transition-all duration-300 hover:scale-[1.02]"
                        >
                            Create Account
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </div>
                </AppForm>
            </div>
        </div>
    );
};

export default LoginForm;