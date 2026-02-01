"use client";

import React from 'react';
import { CheckCircle, XCircle, Mail, Phone, Users, X } from 'lucide-react';

import { EventAttendee } from '@/types/dash-events.types';

type Props = {
    attendees: EventAttendee[];
    hasActiveFilters: boolean;
    onClearFilters: () => void;
};

const EventAttendeesTable = ({ attendees, hasActiveFilters, onClearFilters }: Props) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPaymentStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'pending':
                return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            default:
                return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    if (attendees.length === 0) {
        return (
            <div role="region" aria-label="Attendees list" className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-accent-50" aria-hidden="true" />
                </div>
                <h2 className="big-text-3 font-bold text-white mb-3">
                    No Attendees Found
                </h2>
                <p className="normal-text text-slate-300 mb-6">
                    {hasActiveFilters 
                        ? 'No attendees match your current filters. Try adjusting your search criteria.'
                        : 'No attendees have purchased tickets for this event yet.'
                    }
                </p>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                        Clear All Filters
                    </button>
                )}
            </div>
        );
    }

    return (
        <div role="region" aria-label="Attendees list" className="space-y-3">
            {attendees.map((attendee) => (
                <div 
                    key={attendee.ticket_id}
                    className="bg-primary rounded-xl p-4 border-2 border-accent/30 hover:border-accent/50 transition-colors"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Attendee Info */}
                        <div className="flex-1 min-w-0">
                            <p className="big-text-5 font-bold text-white mb-1 truncate">
                                {attendee.attendee_name}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-slate-400">
                                <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3 shrink-0" aria-hidden="true" />
                                    <p className="small-text truncate">
                                        {attendee.attendee_email}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Phone className="w-3 h-3 shrink-0" aria-hidden="true" />
                                    <p className="small-text">
                                        {attendee.attendee_phone}
                                    </p>
                                </div>
                            </div>
                            <p className="small-text text-slate-500 font-mono mt-1">
                                {attendee.ticket_id}
                            </p>
                        </div>

                        {/* Ticket Type */}
                        <div className="shrink-0">
                            <p className="small-text text-slate-400 mb-1">Ticket Type</p>
                            <p className="normal-text-2 font-semibold text-white">
                                {attendee.ticket_type.name}
                            </p>
                            <p className="small-text text-emerald-400">
                                GH₵ {parseFloat(attendee.ticket_type.price).toLocaleString('en-GH')}
                            </p>
                        </div>

                        {/* Amount & Payment */}
                        <div className="shrink-0 text-right">
                            <p className="small-text text-slate-400 mb-1">Amount Paid</p>
                            <p className="big-text-5 font-bold text-emerald-400">
                                GH₵ {parseFloat(attendee.amount_paid).toLocaleString('en-GH')}
                            </p>
                            <span className={`inline-block px-2 py-1 rounded-lg font-semibold small-text border capitalize ${getPaymentStatusBadge(attendee.payment_status)}`}>
                                {attendee.payment_status}
                            </span>
                        </div>

                        {/* Check-in Status */}
                        <div className="shrink-0 text-center">
                            {attendee.is_checked_in ? (
                                <div className="flex flex-col items-center">
                                    <CheckCircle className="w-8 h-8 text-emerald-400 mb-1" aria-hidden="true" />
                                    <p className="small-text text-emerald-400 font-semibold">
                                        Checked In
                                    </p>
                                    {attendee.checked_in_at && (
                                        <p className="small-text text-slate-400">
                                            {formatDate(attendee.checked_in_at)}
                                        </p>
                                    )}
                                    {attendee.checked_in_by && (
                                        <p className="small-text-2 text-slate-500">
                                            by {attendee.checked_in_by.full_name}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <XCircle className="w-8 h-8 text-slate-400 mb-1" aria-hidden="true" />
                                    <p className="small-text text-slate-400">
                                        Not checked in
                                    </p>
                                    <p className="small-text text-slate-500">
                                        Purchased {formatDate(attendee.purchase_date)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventAttendeesTable;