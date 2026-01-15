"use client";

import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { AppFormField } from '@/components';
import { useFormikContext } from 'formik';

const EventDateTimeSection = () => {
    const { values, setFieldValue } = useFormikContext<any>();

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    // Helper to convert time input (HH:MM) to HH:MM:SS format
    const handleTimeChange = (fieldName: string, value: string) => {
        const formattedTime = value ? `${value}:00` : '';
        setFieldValue(fieldName, formattedTime);
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
                        min={today} // ✅ Can't select past dates
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
                            onChange={(e) => handleTimeChange('start_time', e.target.value)}
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
                        min={values.start_date || today} // ✅ Can't be earlier than start_date
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
                            onChange={(e) => handleTimeChange('end_time', e.target.value)}
                            className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDateTimeSection;