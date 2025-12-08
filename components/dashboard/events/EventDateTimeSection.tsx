"use client";

import React from 'react';
import { Calendar, Clock, Info } from 'lucide-react';
import { AppFormField } from '@/components';
import { useFormikContext } from 'formik';

const EventDateTimeSection = () => {
    const { values } = useFormikContext<any>();

    // Helper to convert time input (HH:MM) to HH:MM:SS format
    const handleTimeChange = (fieldName: string, value: string) => {
        return value ? `${value}:00` : '';
    };

    // Helper to convert HH:MM:SS to HH:MM for display
    const formatTimeForInput = (time: string) => {
        if (!time) return '';
        return time.substring(0, 5); // Gets HH:MM from HH:MM:SS
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Date & Time
                    </h2>
                    <p className="small-text text-slate-400">
                        When will your event happen?
                    </p>
                </div>
            </div>

            {/* Start Date & Time */}
            <div>
                <h3 className="big-text-5 font-semibold text-white mb-4">
                    Event Start
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AppFormField
                        name="start_date"
                        label="Start Date"
                        type="date"
                        required
                    />

                    <div>
                        <label htmlFor="start_time_input" className="block normal-text-2 text-slate-300 font-medium mb-2">
                            Start Time
                            <span className="text-accent-50 ml-1">*</span>
                        </label>
                        <input
                            id="start_time_input"
                            type="time"
                            value={formatTimeForInput(values.start_time)}
                            onChange={(e) => {
                                const formattedTime = handleTimeChange('start_time', e.target.value);
                                // This needs to use Formik's setFieldValue
                                const event = new Event('change', { bubbles: true });
                                Object.defineProperty(event, 'target', { writable: false, value: { name: 'start_time', value: formattedTime } });
                                e.target.dispatchEvent(event);
                            }}
                            className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* End Date & Time */}
            <div>
                <h3 className="big-text-5 font-semibold text-white mb-4">
                    Event End
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AppFormField
                        name="end_date"
                        label="End Date"
                        type="date"
                        required
                    />

                    <div>
                        <label htmlFor="end_time_input" className="block normal-text-2 text-slate-300 font-medium mb-2">
                            End Time
                            <span className="text-accent-50 ml-1">*</span>
                        </label>
                        <input
                            id="end_time_input"
                            type="time"
                            value={formatTimeForInput(values.end_time)}
                            onChange={(e) => {
                                const formattedTime = handleTimeChange('end_time', e.target.value);
                                const event = new Event('change', { bubbles: true });
                                Object.defineProperty(event, 'target', { writable: false, value: { name: 'end_time', value: formattedTime } });
                                e.target.dispatchEvent(event);
                            }}
                            className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Info Note */}
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-blue-300 font-semibold mb-1">
                            Time Zone
                        </p>
                        <p className="small-text-2 text-blue-300">
                            All times are in Ghana Standard Time (GMT). Make sure to set the correct start and end times for your event.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDateTimeSection;