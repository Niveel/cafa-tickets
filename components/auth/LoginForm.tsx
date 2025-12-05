"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader } from "@/components";
import { LoginFormValues } from "@/data/validationConstants";

const LoginForm = () => {
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: LoginFormValues) => {
        setLoading(true);
        setLoginError("");

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate validation
            if (values.emailOrUsername === "admin" && values.password === "Klasique1") {
                // Success - redirect to home
                window.location.href = "/";
            } else {
                setLoginError("Invalid email/username or password");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoginError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
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
                            iconClick={() => setShowPassword((prev) => !prev)}
                            icon={showPassword ? "eye-slash" : "eye"}
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