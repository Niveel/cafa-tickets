"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

import { AppForm, AppFormField, AppErrorMessage, SubmitButton, FormLoader } from "@/components";
import { 
    ContactFormLoggedInValidationSchema, 
    ContactFormGuestValidationSchema,
    ContactFormLoggedInValues,
    ContactFormGuestValues
} from "@/data/validationConstants";
import { CurrentUser } from "@/types/general.types";

interface ContactFormProps {
    currentUser: CurrentUser | null;
}

const ContactForm = ({ currentUser }: ContactFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const isLoggedIn = !!currentUser;
    const hasPhone = currentUser?.phone_number;

    // Format phone number from 0244486509 to +233244486509
    const formatPhoneNumber = (phone: string): string => {
        if (phone.startsWith('0')) {
            return '+233' + phone.substring(1);
        }
        return phone;
    };

    const handleSubmit = async (values: ContactFormLoggedInValues | ContactFormGuestValues) => {
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // Build payload based on user type
            const payload: {
                name?: string;
                email?: string;
                phone?: string;
                subject: string;
                message: string;
            } = {
                subject: values.subject,
                message: values.message,
            };

            if (isLoggedIn) {
                // Logged-in user
                payload.name = currentUser.full_name;
                payload.email = currentUser.email;
                
                // Only include phone if provided by user or if user has phone
                if ('phone' in values && values.phone) {
                    payload.phone = formatPhoneNumber(values.phone);
                } else if (hasPhone) {
                    payload.phone = currentUser.phone_number!;
                }
            } else {
                // Guest user
                const guestValues = values as ContactFormGuestValues;
                payload.name = guestValues.name;
                payload.email = guestValues.email;
                payload.phone = formatPhoneNumber(guestValues.phone);
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Failed to send message. Please try again.';

                if (data.message) {
                    errorMessage = data.message;
                } else if (data.error) {
                    errorMessage = data.error;
                } else if (data.detail) {
                    errorMessage = data.detail;
                }

                setError(errorMessage);
                return;
            }

            // Success
            setSuccess(true);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 5000);

        } catch (err) {
            console.error('Contact form error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Determine initial values and validation schema
    const getInitialValues = () => {
        if (isLoggedIn) {
            return {
                subject: "",
                message: "",
                ...(hasPhone ? {} : { phone: "" })
            };
        }
        return {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        };
    };

    const validationSchema = isLoggedIn 
        ? ContactFormLoggedInValidationSchema 
        : ContactFormGuestValidationSchema;

    if (success) {
        return (
            <div className="animate-fade-in">
                <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="big-text-3 font-bold text-white mb-2">
                        Message Sent Successfully!
                    </h3>
                    <p className="normal-text text-slate-200 mb-6">
                        Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                    <button
                        onClick={() => {
                            setSuccess(false);
                            setError("");
                        }}
                        className="px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text transition-all duration-300 hover:scale-105"
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary-100 rounded-2xl p-6 md:p-8 border-2 border-accent">
            <AppErrorMessage visible={!!error} error={error} />

            <AppForm
                initialValues={getInitialValues()}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormLoader visible={loading} message="Sending your message..." />

                <div className="space-y-5">
                    {/* Guest user fields */}
                    {!isLoggedIn && (
                        <>
                            <AppFormField
                                name="name"
                                label="Full Name"
                                placeholder="John Doe"
                                type="text"
                                required
                            />

                            <AppFormField
                                name="email"
                                label="Email Address"
                                placeholder="john@example.com"
                                type="email"
                                required
                            />

                            <AppFormField
                                name="phone"
                                label="Phone Number"
                                placeholder="0244486509"
                                type="tel"
                                required
                            />
                        </>
                    )}

                    {/* Logged-in user without phone */}
                    {isLoggedIn && !hasPhone && (
                        <AppFormField
                            name="phone"
                            label="Phone Number (Optional)"
                            placeholder="0244486509"
                            type="tel"
                        />
                    )}

                    {/* Common fields for all users */}
                    <AppFormField
                        name="subject"
                        label="Subject"
                        placeholder="Event inquiry, ticket issue, etc."
                        type="text"
                        required
                    />

                    <AppFormField
                        name="message"
                        label="Message"
                        placeholder="Tell us how we can help you..."
                        multiline
                        rows={6}
                        required
                    />

                    <SubmitButton 
                        title="Send Message" 
                    />
                </div>
            </AppForm>
        </div>
    );
};

export default ContactForm;