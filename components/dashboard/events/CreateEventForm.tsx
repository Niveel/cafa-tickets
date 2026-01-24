"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

import { eventCreationSchema, EventFormValues } from '@/data/eventsSchema';
import { SubmitButton, FormLoader } from '@/components';
import { EventBasicInfoSection, EventVenueSection, EventDateTimeSection, EventTypeSection, EventCapacitySection, EventPaymentProfileSection, EventImagesSection, EventTicketTypesSection, EventPublishSection } from "@/components"
import { buildEventFormData } from '@/utils/buildEventFormData';
import { RecurrencePattern } from '@/types/dash-events.types';
import { base64ToFile } from '@/utils/base64ToFile';
import { PaymentProfile } from "@/types/payments.types";

type Props = {
    paymentProfiles: PaymentProfile[];
}

const CreateEventForm = ({ paymentProfiles }: Props) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const initialValues: EventFormValues = {
        // Basic Info
        title: '',
        category_slug: '',
        short_description: '',
        description: '',

        // Venue
        venue_name: '',
        venue_address: '',
        venue_city: '',
        venue_country: 'Ghana',
        venue_latitude: null,
        venue_longitude: null,

        // Date & Time
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',

        // Event Type
        is_recurring: false,
        recurrence_pattern: null,
        check_in_policy: 'single_entry',

        // Capacity
        max_attendees: '',

        // Payment Profile
        payment_profile_id: '',

        // Images
        featured_image: '',
        additional_images: [],

        // Publishing
        is_published: true,

        // Ticket Types
        ticket_types: []
    };

    // Helper to get missing required fields
    const getMissingFields = (values: EventFormValues, errors: any) => {
        const missing: string[] = [];

        // Basic Info
        if (!values.title) missing.push('Event title');
        if (!values.category_slug) missing.push('Event category');
        if (!values.short_description) missing.push('Short description');
        if (!values.description) missing.push('Full description');

        // Venue
        if (!values.venue_name) missing.push('Venue name');
        if (!values.venue_address) missing.push('Venue address');
        if (!values.venue_city) missing.push('City');

        // Date & Time
        if (!values.start_date) missing.push('Start date');
        if (!values.end_date) missing.push('End date');
        if (!values.start_time) missing.push('Start time');
        if (!values.end_time) missing.push('End time');

        // Recurring pattern (if recurring is enabled)
        if (values.is_recurring && !values.recurrence_pattern) {
            missing.push('Recurrence frequency');
        }

        // Images
        if (!values.featured_image) missing.push('Featured image');

        // Ticket Types
        if (!values.ticket_types || values.ticket_types.length === 0) {
            missing.push('At least one ticket type');
        }

        // Capacity
        if (!values.max_attendees) missing.push('Maximum attendees');

        // Payment Profile
        if (!values.payment_profile_id) missing.push('Payment profile');

        // Check for validation errors
        if (errors && Object.keys(errors).length > 0) {
            // If there are validation errors, add them
            Object.keys(errors).forEach(key => {
                if (!missing.includes(key)) {
                    // Only add if not already in missing list
                    const errorMessage = typeof errors[key] === 'string'
                        ? errors[key]
                        : 'has validation errors';
                    missing.push(`${key}: ${errorMessage}`);
                }
            });
        }

        return missing;
    };

    const handleSubmit = async (values: EventFormValues, { setSubmitting }: any) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(false);

            // console.log('Creating event with values:', values);

            // ✅ Build FormData payload
            const formData = buildEventFormData({
                // Basic Info
                title: values.title,
                category_slug: values.category_slug,
                short_description: values.short_description,
                description: values.description,

                // Venue
                venue_name: values.venue_name,
                venue_address: values.venue_address,
                venue_city: values.venue_city,
                venue_country: values.venue_country,
                venue_latitude: values.venue_latitude || undefined,
                venue_longitude: values.venue_longitude || undefined,

                // Date & Time
                start_date: values.start_date,
                end_date: values.end_date,
                start_time: values.start_time,
                end_time: values.end_time,

                // Event Type
                is_recurring: values.is_recurring,
                recurrence_pattern: values.recurrence_pattern as RecurrencePattern | null,
                check_in_policy: values.check_in_policy,

                // Capacity
                max_attendees: parseInt(values.max_attendees),

                // Payment Profile
                payment_profile_id: values.payment_profile_id,

                // Images (File objects from ImageUpload)
                featured_image: base64ToFile(values.featured_image, 'featured.jpg'),
                additional_images: (values.additional_images || [])
                    .filter((img): img is string => typeof img === 'string' && img.length > 0)
                    .map((img, i) => base64ToFile(img, `additional-${i}.jpg`)),

                // Publishing
                is_published: values.is_published,

                // Ticket Types
                ticket_types: values.ticket_types.map(ticket => ({
                    name: ticket.name,
                    description: ticket.description || '',
                    price: ticket.price,
                    quantity: parseInt(ticket.quantity),
                    min_purchase: parseInt(ticket.min_purchase),
                    max_purchase: ticket.max_purchase ? parseInt(ticket.max_purchase) : undefined,
                    available_from: ticket.available_from || undefined,
                    available_until: ticket.available_until || undefined,
                }))
            });

            // ✅ Send as FormData to Next.js API route
            const response = await fetch('/api/dashboard/events/create', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Failed to create event. Please try again.';

                if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.error) {
                    errorMessage = data.error;
                } else if (data.message) {
                    errorMessage = data.message;
                }

                if (data.title) {
                    errorMessage = `Title: ${Array.isArray(data.title) ? data.title[0] : data.title}`;
                } else if (data.ticket_types) {
                    errorMessage = `Ticket Types: ${Array.isArray(data.ticket_types) ? data.ticket_types[0] : data.ticket_types}`;
                }

                throw new Error(errorMessage);
            }

            // console.log('Event created successfully:', data);
            setSubmitSuccess(true);
            
            router.push(`/dashboard/events/${data.slug || data.id}`);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error creating event:', error.message);
                setSubmitError(error.message);
            } else {
                console.error('Error creating event:', error);
                setSubmitError('Failed to create event. Please try again.');
            }
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6 sm:p-8">
            <Formik
                initialValues={initialValues}
                validationSchema={eventCreationSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting, values, errors, isValid }) => {
                    const missingFields = getMissingFields(values, errors);
                    const canSubmit = isValid && missingFields.length === 0;

                    return (
                        <Form className="space-y-6">
                            <FormLoader visible={isSubmitting} message="Creating your event..." />

                            {/* Section 1: Basic Info */}
                            <EventBasicInfoSection />

                            {/* Divider */}
                            <div className="border-t border-accent/30"></div>

                            {/* Section 2: Venue */}
                            <EventVenueSection />

                            {/* Divider */}
                            <div className="border-t border-accent/30"></div>

                            {/* Section 3: Date & Time */}
                            <EventDateTimeSection />

                            {/* Divider */}
                            <div className="border-t border-accent/30"></div>

                            {/* Section 4: Event Type */}
                            <EventTypeSection />

                            {/* Divider */}
                            <div className="border-t border-accent/30"></div>

                            {/* Section 5: Images */}
                            <EventImagesSection />

                            {/* Divider */}
                            <div className="border-t border-accent/30"></div>

                            {/* Section 6: Ticket Types */}
                            <EventTicketTypesSection />

                            {/* Divider */}
                            <div className="border-t border-accent/30"></div>

                            {/* Section 7: Capacity */}
                            <EventCapacitySection />

                            {/* Divider */}
                            <div className="border-t border-accent/30"></div>

                            {/* Section 8: Payment Profile */}
                            <EventPaymentProfileSection paymentProfiles={paymentProfiles} />

                            {/* Divider */}
                            <div className="border-t border-accent/30"></div>

                            {/* Section 9: Publishing */}
                            <EventPublishSection />

                            {/* Form Status Message */}
                            {!canSubmit && !isSubmitting && (
                                <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20 animate-fade-in">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                                        <div className="flex-1">
                                            <p className="normal-text-2 text-amber-400 font-semibold mb-2">
                                                Complete All Required Fields
                                            </p>
                                            <p className="small-text text-amber-300 mb-2">
                                                Please fill in the following required information:
                                            </p>
                                            <ul className="small-text text-amber-300 list-disc list-inside space-y-1">
                                                {missingFields.slice(0, 5).map((field, index) => (
                                                    <li key={index}>{field}</li>
                                                ))}
                                                {missingFields.length > 5 && (
                                                    <li className="font-semibold">
                                                        ...and {missingFields.length - 5} more
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* All Set Message */}
                            {canSubmit && !isSubmitting && (
                                <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                                        <p className="normal-text-2 text-emerald-400 font-semibold">
                                            All set! You're ready to create your event.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Submit Error */}
                            {submitError && (
                                <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20 animate-fade-in">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                                        <div>
                                            <p className="normal-text-2 text-red-400 font-semibold mb-1">
                                                Error Creating Event
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
                                                Event Created Successfully!
                                            </p>
                                            <p className="small-text text-emerald-300">
                                                Redirecting to event dashboard...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex items-center gap-4 pt-6 border-t border-accent/30">
                                <button
                                    type="button"
                                    onClick={() => router.push('/dashboard/events')}
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-4 bg-primary-200 text-white rounded-xl font-semibold big-text-5 hover:bg-primary-100 transition-all duration-300 border-2 border-accent/30 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <div className="flex-1">
                                    <SubmitButton
                                        title={values.is_published ? 'Create & Publish Event' : 'Create Draft Event'}
                                    />
                                </div>
                            </div>

                            {/* Helper Text */}
                            <p className="text-center small-text text-slate-400">
                                By creating this event, you agree to our Terms of Service and Event Hosting Guidelines
                            </p>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default CreateEventForm;