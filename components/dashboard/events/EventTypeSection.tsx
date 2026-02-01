"use client";

import React from 'react';
import { Repeat, Info, CheckCircle } from 'lucide-react';
import { useFormikContext } from 'formik';

import { AppFormField } from '@/components';

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
        { value: 'daily', label: 'Daily - Event repeats every day' },
        { value: 'weekly', label: 'Weekly - Event repeats every week' },
        { value: 'monthly', label: 'Monthly - Event repeats every month' },
        { value: 'yearly', label: 'Yearly - Event repeats every year' }
    ];

    const daysOfWeekOptions = [
        { value: 0, label: 'Sun' },
        { value: 1, label: 'Mon' },
        { value: 2, label: 'Tue' },
        { value: 3, label: 'Wed' },
        { value: 4, label: 'Thu' },
        { value: 5, label: 'Fri' },
        { value: 6, label: 'Sat' }
    ];

    const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isRecurring = e.target.checked;
        setFieldValue('is_recurring', isRecurring);
        
        if (!isRecurring) {
            setFieldValue('recurrence_pattern', null);
            setFieldValue('check_in_policy', 'single_entry');
        } else {
            setFieldValue('recurrence_pattern', {
                frequency: '',
                interval: 1,
                end_date: null,
                occurrences: null,
                days_of_week: [],
                day_of_month: null
            });
        }
    };

    const handleDayOfWeekToggle = (day: number) => {
        const currentDays = values.recurrence_pattern?.days_of_week || [];
        const newDays = currentDays.includes(day)
            ? currentDays.filter((d: number) => d !== day)
            : [...currentDays, day].sort();
        setFieldValue('recurrence_pattern.days_of_week', newDays);
    };

    const selectedFrequency = values.recurrence_pattern?.frequency;
    const showDaysOfWeek = selectedFrequency === 'weekly';
    const showDayOfMonth = selectedFrequency === 'monthly';

    return (
        <div className="space-y-4">
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
                            Enable this if your event repeats on multiple days (e.g., daily workshops, weekly meetups, monthly concerts)
                        </p>
                    </div>
                </label>
            </div>

            {/* Recurrence Pattern & Check-in Policy - Only shown when recurring */}
            {values.is_recurring && (
                <>
                    {/* Recurrence Pattern */}
                    <div className="p-5 bg-blue-500/10 rounded-xl border-2 border-blue-500/30 space-y-3">
                        <div className="flex items-center gap-2 mb-4">
                            <Repeat className="w-5 h-5 text-blue-400" aria-hidden="true" />
                            <h3 className="big-text-4 font-bold text-white">
                                Recurrence Pattern
                            </h3>
                        </div>

                        {/* Frequency */}
                        <div>
                            <AppFormField
                                name="recurrence_pattern.frequency"
                                label="How often does your event repeat?"
                                type="select"
                                options={frequencyOptions}
                                required
                            />
                            <p className="mt-2 small-text text-blue-300">
                                Choose how frequently your event occurs. For example, a yoga class might be weekly, while a monthly book club meets monthly.
                            </p>
                        </div>

                        {/* Interval */}
                        <div>
                            <AppFormField
                                name="recurrence_pattern.interval"
                                label={`Repeat every how many ${selectedFrequency || 'period'}(s)?`}
                                type="number"
                                placeholder="e.g., 1"
                                required
                            />
                            <p className="mt-2 small-text text-blue-300">
                                <strong>Examples:</strong> 1 = every {selectedFrequency || 'period'}, 2 = every other {selectedFrequency || 'period'}, 3 = every 3rd {selectedFrequency || 'period'}
                            </p>
                        </div>

                        {/* Days of Week (only for weekly) */}
                        {showDaysOfWeek && (
                            <div>
                                <label className="block normal-text-2 text-slate-300 font-medium mb-3">
                                    Which days of the week? <span className="text-accent-50">*</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {daysOfWeekOptions.map((day) => {
                                        const isSelected = values.recurrence_pattern?.days_of_week?.includes(day.value);
                                        return (
                                            <button
                                                key={day.value}
                                                type="button"
                                                onClick={() => handleDayOfWeekToggle(day.value)}
                                                className={`
                                                    px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all duration-300
                                                    ${isSelected 
                                                        ? 'bg-accent text-white border-2 border-accent' 
                                                        : 'bg-primary-100 text-slate-300 border-2 border-accent/30 hover:border-accent'
                                                    }
                                                `}
                                            >
                                                {day.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="mt-2 small-text text-blue-300">
                                    Select which days your event happens each week. For example, a fitness class might run Monday, Wednesday, and Friday.
                                </p>
                            </div>
                        )}

                        {/* Day of Month (only for monthly) */}
                        {showDayOfMonth && (
                            <div>
                                <AppFormField
                                    name="recurrence_pattern.day_of_month"
                                    label="Which day of the month?"
                                    type="number"
                                    placeholder="e.g., 15 for 15th of each month"
                                    required
                                />
                                <p className="mt-2 small-text text-blue-300">
                                    Enter a number from 1-31. For example, 1 = 1st of every month, 15 = 15th of every month.
                                </p>
                            </div>
                        )}

                        {/* End Date or Occurrences */}
                        <div className="space-y-2">
                            <h4 className="big-text-5 font-semibold text-white">
                                When should the recurrence end?
                            </h4>
                            <p className="small-text text-blue-300">
                                Choose <strong>either</strong> an end date <strong>or</strong> number of occurrences (not both required).
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <AppFormField
                                        name="recurrence_pattern.end_date"
                                        label="End by date (Optional)"
                                        type="date"
                                        min={values.start_date || new Date().toISOString().split('T')[0]}
                                    />
                                    <p className="mt-2 small-text text-blue-300">
                                        The last date your event will occur.
                                    </p>
                                </div>

                                <div>
                                    <AppFormField
                                        name="recurrence_pattern.occurrences"
                                        label="Or after X occurrences (Optional)"
                                        type="number"
                                        placeholder="e.g., 10"
                                    />
                                    <p className="mt-2 small-text text-blue-300">
                                        How many times the event should repeat before stopping.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pattern Summary */}
                        {selectedFrequency && (
                            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="small-text text-emerald-300 font-semibold mb-1">
                                            Pattern Preview:
                                        </p>
                                        <p className="small-text text-emerald-300">
                                            {values.recurrence_pattern?.interval > 1 
                                                ? `Every ${values.recurrence_pattern.interval} ${selectedFrequency}s` 
                                                : `Every ${selectedFrequency}`}
                                            {showDaysOfWeek && values.recurrence_pattern?.days_of_week?.length > 0 && 
                                                ` on ${values.recurrence_pattern.days_of_week.map((d: number) => daysOfWeekOptions[d].label).join(', ')}`}
                                            {showDayOfMonth && values.recurrence_pattern?.day_of_month && 
                                                ` on the ${values.recurrence_pattern.day_of_month}${getOrdinalSuffix(values.recurrence_pattern.day_of_month)}`}
                                            {values.recurrence_pattern?.end_date && ` until ${values.recurrence_pattern.end_date}`}
                                            {values.recurrence_pattern?.occurrences && ` for ${values.recurrence_pattern.occurrences} times`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Check-in Policy */}
                    <div>
                        <h3 className="big-text-4 font-bold text-white mb-4">
                            Check-in Policy
                        </h3>
                        <p className="small-text text-slate-400 mb-4">
                            How should tickets be validated at your recurring event?
                        </p>

                        <div className="space-y-2">
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

                    {/* Check-in Policy Explanation */}
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p className="small-text text-purple-300 font-semibold mb-1">
                                    Which policy should I choose?
                                </p>
                                <ul className="small-text text-purple-300 space-y-1">
                                    <li><strong>Daily Entry:</strong> Best for multi-day conferences or festivals (e.g., a 3-day music festival where attendees check in each day)</li>
                                    <li><strong>Multiple Entry:</strong> For events where people can leave and return on the same day (e.g., food festivals, trade shows)</li>
                                    <li><strong>Single Entry:</strong> One-time check-in only (e.g., concerts, movies, workshops)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// Helper function for ordinal suffix
function getOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

export default EventTypeSection;