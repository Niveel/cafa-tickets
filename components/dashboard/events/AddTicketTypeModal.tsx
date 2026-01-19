"use client";

import React from 'react';
import { X, Plus, Edit } from 'lucide-react';
import { Formik, useFormikContext } from 'formik';

import { ticketTypeSchema, TicketTypeFormValues } from '@/data/eventsSchema';
import { AppFormField, FormLoader } from '@/components';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: TicketTypeFormValues) => void;
    initialValues?: TicketTypeFormValues;
    isEditing?: boolean;
};

// Helper component to access Formik values
const AvailabilityFields = () => {
    const { values } = useFormikContext<TicketTypeFormValues>();
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AppFormField
                name="available_from"
                label="Available From"
                type="date"
                min={today} // ✅ Can't be in the past
            />

            <AppFormField
                name="available_until"
                label="Available Until"
                type="date"
                min={values.available_from || today} // ✅ Can't be before available_from
            />
        </div>
    );
};

const AddTicketTypeModal = ({ isOpen, onClose, onSubmit, initialValues, isEditing = false }: Props) => {
    if (!isOpen) return null;

    const defaultValues: TicketTypeFormValues = {
        name: '',
        description: '',
        price: '',
        quantity: '',
        min_purchase: '1',
        max_purchase: '10',
        available_from: '',
        available_until: ''
    };

    const handleSubmit = (values: TicketTypeFormValues) => {
        onSubmit(values);
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/90 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-modal-title"
        >
            <div className="bg-primary rounded-xl border-2 border-accent w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-accent/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            {isEditing ? (
                                <Edit className="w-5 h-5 text-purple-400" aria-hidden="true" />
                            ) : (
                                <Plus className="w-5 h-5 text-purple-400" aria-hidden="true" />
                            )}
                        </div>
                        <h2 id="ticket-modal-title" className="big-text-3 font-bold text-white">
                            {isEditing ? 'Edit Ticket Type' : 'Add Ticket Type'}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-10 h-10 rounded-lg bg-primary-200 hover:bg-primary-100 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-slate-300" aria-hidden="true" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <Formik
                        initialValues={initialValues || defaultValues}
                        validationSchema={ticketTypeSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isSubmitting, handleSubmit: formikHandleSubmit }) => (
                            <div className="space-y-6">
                                <FormLoader visible={isSubmitting} />

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
                                            max="10000"
                                            required
                                        />
                                    </div>
                                    <p className="small-text text-slate-400">
                                        Minimum price: GH₵ 10.00 • Maximum quantity: 10,000
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
                                            label="Maximum Purchase (optional)"
                                            type="number"
                                            placeholder="10"
                                            min="0"
                                            max="1000"
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

                                    <AvailabilityFields />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3 pt-4 border-t border-accent/30">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-6 py-3 bg-primary-200 text-white rounded-xl font-semibold normal-text-2 hover:bg-primary-100 transition-all duration-300 border-2 border-accent/30 hover:border-accent"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formikHandleSubmit()}
                                        disabled={isSubmitting}
                                        className="flex-1 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isEditing ? 'Update Ticket Type' : 'Add Ticket Type'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddTicketTypeModal;