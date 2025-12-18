"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';

import { ticketTypeSchema, TicketTypeFormValues } from '@/data/eventsSchema';
import { AppFormField, SubmitButton, FormLoader } from '@/components';
import { CheckCircle, AlertCircle, Ticket, } from 'lucide-react';

type Props = {
    eventSlug: string;
};

const CreateTicketForm = ({ eventSlug }: Props) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [createdTicketsCount, setCreatedTicketsCount] = useState(0);

    const initialValues: TicketTypeFormValues = {
        name: '',
        description: '',
        price: '',
        quantity: '',
        min_purchase: '1',
        max_purchase: '10',
        available_from: '',
        available_until: ''
    };

    const handleSubmit = async (values: TicketTypeFormValues, { setSubmitting, resetForm }: any) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(false);

            // Transform data for API
            const ticketData = {
                name: values.name,
                description: values.description,
                price: values.price,
                quantity: parseInt(values.quantity),
                min_purchase: parseInt(values.min_purchase),
                max_purchase: parseInt(values.max_purchase),
                available_from: values.available_from || undefined,
                available_until: values.available_until || undefined,
            };

            const response = await fetch(`/api/dashboard/events/${eventSlug}/tickets/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Failed to create ticket type. Please try again.';

                // ✅ Priority: Show backend message first
                if (data.message) {
                    errorMessage = data.message;
                } else if (data.error) {
                    errorMessage = data.error;
                } else if (data.detail) {
                    errorMessage = data.detail;
                }

                // Field-specific errors (only if no general message)
                if (!data.message && !data.error && !data.detail) {
                    if (data.name) {
                        errorMessage = `Name: ${Array.isArray(data.name) ? data.name[0] : data.name}`;
                    } else if (data.price) {
                        errorMessage = `Price: ${Array.isArray(data.price) ? data.price[0] : data.price}`;
                    } else if (data.quantity) {
                        errorMessage = `Quantity: ${Array.isArray(data.quantity) ? data.quantity[0] : data.quantity}`;
                    }
                }

                throw new Error(errorMessage);
            }

            // ✅ Success
            // console.log('Ticket type created successfully:', data);
            setSubmitSuccess(true);
            setCreatedTicketsCount(prev => prev + 1);

            // Reset form for next ticket
            setTimeout(() => {
                setSubmitSuccess(false);
                resetForm();
            }, 2000);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error creating ticket type:', error.message);
                setSubmitError(error.message);
            } else {
                console.error('Error creating ticket type:', error);
                setSubmitError('Failed to create ticket type. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDone = () => {
        router.push(`/dashboard/events/${eventSlug}`);
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6 sm:p-8">
            {/* Success Counter */}
            {createdTicketsCount > 0 && (
                <div className="mb-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="big-text-5 font-bold text-emerald-400">
                                {createdTicketsCount} Ticket Type{createdTicketsCount > 1 ? 's' : ''} Created
                            </p>
                            <p className="small-text text-emerald-300">
                                Add another or click &quot;Done&quot; to return to event details
                            </p>
                        </div>
                        <button
                            onClick={handleDone}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold normal-text-2 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={ticketTypeSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <FormLoader visible={isSubmitting} message="Creating ticket type..." />

                        {/* Section Header */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <Ticket className="w-5 h-5 text-purple-400" aria-hidden="true" />
                            </div>
                            <div>
                                <h2 className="big-text-3 font-bold text-white">
                                    Ticket Type Details
                                </h2>
                                <p className="small-text text-slate-400">
                                    Fill in the details for your ticket type
                                </p>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="big-text-4 font-bold text-white">
                                Basic Information
                            </h3>

                            <AppFormField
                                name="name"
                                label="Ticket Name"
                                placeholder="e.g., Early Bird, VIP, Regular"
                                required
                            />

                            <AppFormField
                                name="description"
                                label="Description"
                                placeholder="Describe what this ticket includes..."
                                multiline
                                rows={3}
                                required
                            />
                        </div>

                        {/* Pricing & Quantity */}
                        <div className="space-y-4">
                            <h3 className="big-text-4 font-bold text-white">
                                Pricing & Quantity
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <AppFormField
                                    name="price"
                                    label="Price (GH₵)"
                                    type="number"
                                    placeholder="50.00"
                                    min="10"
                                    step="0.01"
                                    required
                                />

                                <AppFormField
                                    name="quantity"
                                    label="Available Quantity"
                                    type="number"
                                    placeholder="100"
                                    min="1"
                                    max="1000000"
                                    required
                                />
                            </div>
                            <p className="small-text text-slate-400">
                                Minimum price: GH₵ 10.00 • Maximum quantity: 1,000,000
                            </p>
                        </div>

                        {/* Purchase Limits */}
                        <div className="space-y-4">
                            <h3 className="big-text-4 font-bold text-white">
                                Purchase Limits
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <AppFormField
                                    name="min_purchase"
                                    label="Minimum Purchase"
                                    type="number"
                                    placeholder="1"
                                    min="1"
                                    required
                                />

                                <AppFormField
                                    name="max_purchase"
                                    label="Maximum Purchase"
                                    type="number"
                                    placeholder="10"
                                    min="1"
                                    max="100"
                                    required
                                />
                            </div>
                            <p className="small-text text-slate-400">
                                Per transaction limits
                            </p>
                        </div>

                        {/* Availability Period (Optional) */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="big-text-4 font-bold text-white mb-2">
                                    Availability Period (Optional)
                                </h3>
                                <p className="small-text text-slate-400">
                                    Set a limited time window for this ticket type. Leave empty for no restrictions.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <AppFormField
                                    name="available_from"
                                    label="Available From"
                                    type="date"
                                />

                                <AppFormField
                                    name="available_until"
                                    label="Available Until"
                                    type="date"
                                />
                            </div>
                        </div>

                        {/* Submit Error */}
                        {submitError && (
                            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text-2 text-red-400 font-semibold mb-1">
                                            Error Creating Ticket Type
                                        </p>
                                        <p className="small-text text-red-300">
                                            {submitError}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Success */}
                        {submitSuccess && (
                            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 animate-fade-in">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text-2 text-emerald-400 font-semibold mb-1">
                                            Ticket Type Created!
                                        </p>
                                        <p className="small-text text-emerald-300">
                                            Form has been reset. Add another or click &quot;Done&quot; above.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-6 border-t border-accent/30">
                            <button
                                type="button"
                                onClick={handleDone}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-4 bg-primary-200 text-white rounded-xl font-semibold big-text-5 hover:bg-primary-100 transition-all duration-300 border-2 border-accent/30 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {createdTicketsCount > 0 ? 'Done' : 'Cancel'}
                            </button>
                            <div className="flex-1">
                                <SubmitButton
                                    title={createdTicketsCount > 0 ? 'Add Another Ticket' : 'Create Ticket Type'}
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateTicketForm;