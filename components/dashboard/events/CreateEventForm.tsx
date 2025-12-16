"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { eventCreationSchema, EventFormValues } from '@/data/eventsSchema';
import { SubmitButton, FormLoader } from '@/components';
import { CheckCircle, AlertCircle } from 'lucide-react';
import {EventBasicInfoSection, EventVenueSection, EventDateTimeSection, EventTypeSection, EventCapacitySection, EventPaymentProfileSection, EventImagesSection, EventTicketTypesSection, EventPublishSection} from "@/components"

const CreateEventForm = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const initialValues: EventFormValues = {
        // Basic Info
        title: '',
        category_id: '',
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

    const handleSubmit = async (values: EventFormValues, { setSubmitting }: any) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(false);

            // Simulate API call (replace with actual API call)
            console.log('Creating event with values:', values);

            // Transform data for API
            const eventData = {
                ...values,
                max_attendees: parseInt(values.max_attendees),
                ticket_types: values.ticket_types.map(ticket => ({
                    ...ticket,
                    price: parseFloat(ticket.price),
                    quantity: parseInt(ticket.quantity),
                    min_purchase: parseInt(ticket.min_purchase),
                    max_purchase: parseInt(ticket.max_purchase)
                }))
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock success response
            const mockEventSlug = values.title.toLowerCase().replace(/\s+/g, '-');
            
            setSubmitSuccess(true);

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push(`/dashboard/events/${mockEventSlug}`);
            }, 2000);

        } catch (error: any) {
            console.error('Error creating event:', error);
            setSubmitError(error.message || 'Failed to create event. Please try again.');
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
                {({ isSubmitting, values }) => (
                    <Form className="space-y-8">
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
                        <EventPaymentProfileSection />

                        {/* Divider */}
                        <div className="border-t border-accent/30"></div>

                        {/* Section 9: Publishing */}
                        <EventPublishSection />

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
                )}
            </Formik>
        </div>
    );
};

export default CreateEventForm;