"use client";

import React from 'react';
import { Users, Info, AlertCircle } from 'lucide-react';
import { useFormikContext } from 'formik';

import { AppFormField } from '@/components';

const EventCapacitySection = () => {
    const { values, errors } = useFormikContext<any>();

    // Calculate total tickets from ticket types
    const totalTickets = React.useMemo(() => {
        if (!values.ticket_types || values.ticket_types.length === 0) return 0;
        
        return values.ticket_types.reduce((sum: number, ticket: any) => {
            const quantity = parseInt(ticket.quantity) || 0;
            return sum + quantity;
        }, 0);
    }, [values.ticket_types]);

    const hasTickets = values.ticket_types && values.ticket_types.length > 0;
    const maxAttendeesValue = parseInt(values.max_attendees) || 0;
    const isCapacityValid = maxAttendeesValue >= totalTickets;

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-pink-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Event Capacity
                    </h2>
                    <p className="small-text text-slate-400">
                        Set the maximum number of attendees
                    </p>
                </div>
            </div>

            {/* Max Attendees Field */}
            <AppFormField
                name="max_attendees"
                label="Maximum Attendees"
                type="number"
                placeholder="e.g., 500"
                min="1"
                max="100000"
                required
            />

            {/* Ticket Summary Card */}
            {hasTickets && (
                <div className={`
                    p-5 rounded-xl border-2 transition-all duration-300
                    ${isCapacityValid 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }
                `}>
                    <div className="flex items-start gap-3 mb-4">
                        {isCapacityValid ? (
                            <Users className="w-6 h-6 text-emerald-400 shrink-0" aria-hidden="true" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-red-400 shrink-0" aria-hidden="true" />
                        )}
                        <div className="flex-1">
                            <p className={`big-text-5 font-bold mb-1 ${
                                isCapacityValid ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                                {isCapacityValid ? 'Capacity Valid' : 'Capacity Invalid'}
                            </p>
                            <p className={`small-text ${
                                isCapacityValid ? 'text-emerald-300' : 'text-red-300'
                            }`}>
                                {isCapacityValid 
                                    ? 'Maximum attendees is greater than or equal to total tickets'
                                    : 'Maximum attendees must be at least equal to the sum of all ticket quantities'
                                }
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-primary rounded-lg border border-accent/20">
                            <p className="small-text text-slate-400 mb-1">Total Tickets</p>
                            <p className="big-text-4 font-bold text-white">
                                {totalTickets.toLocaleString()}
                            </p>
                        </div>

                        <div className="p-3 bg-primary rounded-lg border border-accent/20">
                            <p className="small-text text-slate-400 mb-1">Max Attendees</p>
                            <p className="big-text-4 font-bold text-white">
                                {maxAttendeesValue.toLocaleString() || '—'}
                            </p>
                        </div>

                        <div className="p-3 bg-primary rounded-lg border border-accent/20">
                            <p className="small-text text-slate-400 mb-1">Available Space</p>
                            <p className={`big-text-4 font-bold ${
                                isCapacityValid ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                                {maxAttendeesValue >= totalTickets 
                                    ? (maxAttendeesValue - totalTickets).toLocaleString()
                                    : '—'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Info Note */}
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-blue-300 font-semibold mb-1">
                            Why Maximum Attendees?
                        </p>
                        <ul className="small-text-2 text-blue-300 space-y-1 list-disc list-inside">
                            <li>Must be at least equal to the sum of all ticket quantities</li>
                            <li>Can be higher to allow for future ticket types</li>
                            <li>Helps with venue capacity planning</li>
                            <li>You can add more ticket types later if capacity allows</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCapacitySection;