"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';

import { ticketTypeSchema, TicketTypeFormValues } from '@/data/eventsSchema';
import { AppFormField, SubmitButton, FormLoader } from '@/components';
import { CheckCircle, AlertCircle, Ticket, Info } from 'lucide-react';
import { EventTicketType } from '@/types/dash-events.types';

type Props = {
    ticket: EventTicketType;
    eventSlug: string;
};

const EditTicketForm = ({ ticket, eventSlug }: Props) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const initialValues: TicketTypeFormValues = {
        name: ticket.name,
        description: ticket.description,
        price: ticket.price,
        quantity: ticket.quantity.toString(),
        min_purchase: ticket.min_purchase.toString(),
        max_purchase: ticket.max_purchase.toString(),
        available_from: ticket.available_from,
        available_until: ticket.available_until
    };

    const handleSubmit = async (values: TicketTypeFormValues, { setSubmitting }: any) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(false);

            console.log('Updating ticket type:', values);

            const ticketData = {
                name: values.name,
                description: values.description,
                price: values.price,
                quantity: parseInt(values.quantity),
                min_purchase: parseInt(values.min_purchase),
                max_purchase: values.max_purchase ? parseInt(values.max_purchase) : undefined,
                available_from: values.available_from || undefined,
                available_until: values.available_until || undefined
            };

            const response = await fetch(`/api/dashboard/events/${eventSlug}/tickets/edit?ticketId=${ticket.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Failed to update ticket type. Please try again.';

                if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.error) {
                    errorMessage = data.error;
                } else if (data.message) {
                    errorMessage = data.message;
                }

                if (data.name) {
                    errorMessage = `Name: ${Array.isArray(data.name) ? data.name[0] : data.name}`;
                } else if (data.price) {
                    errorMessage = `Price: ${Array.isArray(data.price) ? data.price[0] : data.price}`;
                } else if (data.quantity) {
                    errorMessage = `Quantity: ${Array.isArray(data.quantity) ? data.quantity[0] : data.quantity}`;
                }

                throw new Error(errorMessage);
            }

            console.log('Ticket updated successfully:', data);
            setSubmitSuccess(true);

            setTimeout(() => {
                router.push(`/dashboard/events/${eventSlug}`);
            }, 2000);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error updating ticket type:', error.message);
                setSubmitError(error.message);
            } else {
                console.error('Error updating ticket type:', error);
                setSubmitError('Failed to update ticket type. Please try again.');
            }
            setSubmitting(false);
        }
    };

    const hasSales = ticket.tickets_sold > 0;

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6 sm:p-8">
            {hasSales && (
                <div className="mb-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="flex items-start gap-3">
                        <Info className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="big-text-5 font-bold text-amber-400 mb-1">
                                Ticket Has Sales
                            </p>
                            <p className="small-text text-amber-300">
                                {ticket.tickets_sold} ticket{ticket.tickets_sold > 1 ? 's' : ''} sold.
                                Be careful when editing as changes may affect existing ticket holders.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-primary-200 rounded-lg">
                    <p className="small-text text-slate-400 mb-1">Price</p>
                    <p className="big-text-5 font-bold text-emerald-400">
                        GH₵ {parseFloat(ticket.price).toLocaleString('en-GH')}
                    </p>
                </div>

                <div className="p-3 bg-primary-200 rounded-lg">
                    <p className="small-text text-slate-400 mb-1">Sold</p>
                    <p className="big-text-5 font-bold text-white">
                        {ticket.tickets_sold}
                    </p>
                </div>

                <div className="p-3 bg-primary-200 rounded-lg">
                    <p className="small-text text-slate-400 mb-1">Remaining</p>
                    <p className="big-text-5 font-bold text-white">
                        {ticket.tickets_remaining}
                    </p>
                </div>

                <div className="p-3 bg-primary-200 rounded-lg">
                    <p className="small-text text-slate-400 mb-1">Revenue</p>
                    <p className="big-text-5 font-bold text-emerald-400">
                        GH₵ {parseFloat(ticket.revenue).toLocaleString('en-GH')}
                    </p>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={ticketTypeSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <FormLoader visible={isSubmitting} message="Updating ticket type..." />

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <Ticket className="w-5 h-5 text-purple-400" aria-hidden="true" />
                            </div>
                            <div>
                                <h2 className="big-text-3 font-bold text-white">
                                    Ticket Type Details
                                </h2>
                                <p className="small-text text-slate-400">
                                    Update ticket information
                                </p>
                            </div>
                        </div>

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
                                    label="Total Quantity"
                                    type="number"
                                    placeholder="100"
                                    min={ticket.tickets_sold.toString()}
                                    max="1000000"
                                    required
                                />
                            </div>
                            <p className="small-text text-slate-400">
                                {hasSales
                                    ? `Minimum quantity: ${ticket.tickets_sold} (already sold) • Maximum: 1,000,000`
                                    : 'Minimum price: GH₵ 10.00 • Maximum quantity: 1,000,000'
                                }
                            </p>
                        </div>

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

                        {submitError && (
                            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text-2 text-red-400 font-semibold mb-1">
                                            Error Updating Ticket Type
                                        </p>
                                        <p className="small-text text-red-300">
                                            {submitError}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {submitSuccess && (
                            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 animate-fade-in">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text-2 text-emerald-400 font-semibold mb-1">
                                            Ticket Type Updated!
                                        </p>
                                        <p className="small-text text-emerald-300">
                                            Redirecting to event details...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 pt-6 border-t border-accent/30">
                            <button
                                type="button"
                                onClick={() => router.push(`/dashboard/events/${eventSlug}`)}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-4 bg-primary-200 text-white rounded-xl font-semibold big-text-5 hover:bg-primary-100 transition-all duration-300 border-2 border-accent/30 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <div className="flex-1">
                                <SubmitButton title="Update Ticket Type" />
                            </div>
                        </div>

                        <p className="text-center small-text text-slate-400">
                            Changes will be applied immediately after saving
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditTicketForm;