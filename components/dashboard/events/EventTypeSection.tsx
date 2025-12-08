"use client";

import React from 'react';
import { Repeat, Info, CheckCircle } from 'lucide-react';
import { AppFormField } from '@/components';
import { useFormikContext } from 'formik';

const EventTypeSection = () => {
    const { values, setFieldValue } = useFormikContext<any>();

    const checkInPolicyOptions = [
        { 
            value: 'single_entry', 
            label: 'Single Entry',
            description: 'Ticket can only be checked in once (default)'
        },
        { 
            value: 'multiple_entry', 
            label: 'Multiple Entry',
            description: 'Ticket can be used multiple times during event period'
        },
        { 
            value: 'daily_entry', 
            label: 'Daily Entry',
            description: 'For recurring events, one check-in per day'
        }
    ];

    const frequencyOptions = [
        { value: '', label: 'Select frequency' },
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' }
    ];

    const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isRecurring = e.target.checked;
        setFieldValue('is_recurring', isRecurring);
        
        // Reset recurrence pattern if unchecking
        if (!isRecurring) {
            setFieldValue('recurrence_pattern', null);
            // Reset check-in policy to default when turning off recurring
            setFieldValue('check_in_policy', 'single_entry');
        }
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-amber-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Event Type & Policies
                    </h2>
                    <p className="small-text text-slate-400">
                        Configure event recurrence and check-in rules
                    </p>
                </div>
            </div>

            {/* Is Recurring Toggle */}
            <div className="p-5 bg-primary-200 rounded-xl border-2 border-accent/30">
                <label className="flex items-start gap-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={values.is_recurring || false}
                        onChange={handleRecurringChange}
                        className="w-6 h-6 rounded-lg bg-primary-100 border-2 border-accent text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1">
                        <p className="big-text-5 font-bold text-white mb-1">
                            Recurring Event
                        </p>
                        <p className="small-text text-slate-400">
                            Enable this if your event repeats on multiple days (e.g., daily workshops, weekly meetups)
                        </p>
                    </div>
                </label>
            </div>

            {/* Only show Recurrence Pattern and Check-in Policy when is_recurring is true */}
            {values.is_recurring && (
                <>
                    {/* Recurrence Pattern */}
                    <div className="p-5 bg-blue-500/10 rounded-xl border-2 border-blue-500/30 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Repeat className="w-5 h-5 text-blue-400" aria-hidden="true" />
                            <h3 className="big-text-4 font-bold text-white">
                                Recurrence Pattern
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AppFormField
                                name="recurrence_pattern.frequency"
                                label="Frequency"
                                type="select"
                                options={frequencyOptions}
                                required
                            />

                            <AppFormField
                                name="recurrence_pattern.interval"
                                label="Interval"
                                type="number"
                                placeholder="e.g., 1"
                                min="1"
                                max="30"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AppFormField
                                name="recurrence_pattern.end_date"
                                label="Recurrence End Date (Optional)"
                                type="date"
                            />

                            <AppFormField
                                name="recurrence_pattern.occurrences"
                                label="Number of Occurrences (Optional)"
                                type="number"
                                placeholder="e.g., 5"
                                min="2"
                                max="365"
                            />
                        </div>

                        {/* Recurrence Info */}
                        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <div className="flex items-start gap-2">
                                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                                <p className="small-text text-blue-300">
                                    Choose either an end date OR number of occurrences. 
                                    Example: "Daily" with interval "1" means every day. 
                                    "Weekly" with interval "2" means every 2 weeks.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Check-in Policy - Only shown for recurring events */}
                    <div>
                        <h3 className="big-text-4 font-bold text-white mb-4">
                            Check-in Policy
                        </h3>

                        <div className="space-y-3">
                            {checkInPolicyOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className={`
                                        flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                                        ${values.check_in_policy === option.value
                                            ? 'bg-accent/20 border-accent'
                                            : 'bg-primary-200 border-accent/30 hover:border-accent/50'
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        name="check_in_policy"
                                        value={option.value}
                                        checked={values.check_in_policy === option.value}
                                        onChange={(e) => setFieldValue('check_in_policy', e.target.value)}
                                        className="w-5 h-5 text-accent focus:ring-2 focus:ring-accent mt-0.5 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="normal-text-2 font-bold text-white">
                                                {option.label}
                                            </p>
                                            {values.check_in_policy === option.value && (
                                                <CheckCircle className="w-4 h-4 text-accent-50" aria-hidden="true" />
                                            )}
                                        </div>
                                        <p className="small-text text-slate-400">
                                            {option.description}
                                        </p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Check-in Policy Info */}
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p className="small-text text-purple-300 font-semibold mb-1">
                                    About Check-in Policies
                                </p>
                                <p className="small-text-2 text-purple-300">
                                    Single Entry is recommended for most events. Use Multiple Entry for festivals or events where attendees can leave and return. 
                                    Daily Entry is specifically for recurring events where attendees need to check in each day.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventTypeSection;