"use client";

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

import { CheckInResponse } from '@/types/dashboard.types';

type Props = {
    result: CheckInResponse;
    onDismiss: () => void;
};

const CheckInResult = ({ result, onDismiss }: Props) => {
    const isSuccess = result.success;

    // Auto-dismiss success messages after 5 seconds
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess, onDismiss]);

    const getIcon = () => {
        if (isSuccess) return CheckCircle;
        if (result.error === 'Already checked in') return AlertTriangle;
        return XCircle;
    };

    const getColors = () => {
        if (isSuccess) {
            return {
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/30',
                icon: 'text-emerald-400',
                title: 'text-emerald-400',
                text: 'text-emerald-300'
            };
        }
        if (result.error === 'Already checked in') {
            return {
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/30',
                icon: 'text-amber-400',
                title: 'text-amber-400',
                text: 'text-amber-300'
            };
        }
        return {
            bg: 'bg-red-500/10',
            border: 'border-red-500/30',
            icon: 'text-red-400',
            title: 'text-red-400',
            text: 'text-red-300'
        };
    };

    const Icon = getIcon();
    const colors = getColors();

    const formatDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleString('en-GH', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // ✅ Extract field-level errors
    const getFieldErrors = () => {
        if (isSuccess || !('details' in result)) return null;
        
        const details = (result as any).details;
        if (!details || typeof details !== 'object') return null;

        const errors: string[] = [];
        Object.entries(details).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
                errors.push(...messages);
            } else if (typeof messages === 'string') {
                errors.push(messages);
            }
        });

        return errors.length > 0 ? errors : null;
    };

    const fieldErrors = getFieldErrors();

    return (
        <div className={`relative p-4 rounded-xl border-2 ${colors.bg} ${colors.border} animate-fade-in`}>
            <button
                onClick={onDismiss}
                className="absolute top-4 right-4 w-6 h-6 rounded-lg bg-primary-200 hover:bg-primary-100 flex items-center justify-center transition-colors"
                aria-label="Dismiss"
            >
                <X className="w-4 h-4 text-white" aria-hidden="true" />
            </button>

            <div className="flex items-start gap-4 pr-10">
                <div className={`w-8 h-8 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} aria-hidden="true" />
                </div>

                <div className="flex-1">
                    <h3 className={`big-text-4 font-bold mb-2 ${colors.title}`}>
                        {isSuccess ? 'Check-in Successful!' : result.error || 'Check-in Failed'}
                    </h3>

                    <p className={`normal-text-2 mb-1 ${colors.text}`}>
                        {result.message}
                    </p>

                    {/* ✅ Display field-level errors */}
                    {fieldErrors && fieldErrors.length > 0 && (
                        <div className="mb-4">
                            {fieldErrors.map((error, index) => (
                                <p key={index} className={`small-text font-semibold ${colors.text}`}>
                                    • {error}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Ticket Details */}
                    {!isSuccess && result.ticket && (
                        <div className="space-y-3 mt-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-primary-200 rounded-lg">
                                    <p className="small-text text-slate-400 mb-1">Attendee</p>
                                    <p className="normal-text-2 font-semibold text-white">
                                        {result.ticket.attendee_name}
                                    </p>
                                </div>

                                <div className="p-3 bg-primary-200 rounded-lg">
                                    <p className="small-text text-slate-400 mb-1">Ticket ID</p>
                                    <p className="small-text font-mono font-semibold text-white">
                                        {result.ticket.ticket_id}
                                    </p>
                                </div>
                            </div>

                            {/* Check-in Info */}
                            {result.ticket.checked_in_at && (
                                <div className="p-3 bg-primary-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="small-text text-slate-400 mb-1">Checked In</p>
                                            <p className="normal-text-2 font-semibold text-white">
                                                {formatDateTime(result.ticket.checked_in_at)}
                                            </p>
                                        </div>
                                        {result.ticket.checked_in_by && (
                                            <div className="text-right">
                                                <p className="small-text text-slate-400 mb-1">By</p>
                                                <p className="normal-text-2 font-semibold text-white">
                                                    {result.ticket.checked_in_by}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Success ticket details */}
                    {isSuccess && result.ticket && (
                        <div className="space-y-3 mt-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-primary-200 rounded-lg">
                                    <p className="small-text text-slate-400 mb-1">Attendee</p>
                                    <p className="normal-text-2 font-semibold text-white">
                                        {result.ticket.attendee_name}
                                    </p>
                                </div>

                                {result.ticket.ticket_type && (
                                    <div className="p-3 bg-primary-200 rounded-lg">
                                        <p className="small-text text-slate-400 mb-1">Ticket Type</p>
                                        <p className="normal-text-2 font-semibold text-white">
                                            {result.ticket.ticket_type.name}
                                        </p>
                                    </div>
                                )}

                                {result.ticket.attendee_email && (
                                    <div className="p-3 bg-primary-200 rounded-lg">
                                        <p className="small-text text-slate-400 mb-1">Email</p>
                                        <p className="small-text font-semibold text-white">
                                            {result.ticket.attendee_email}
                                        </p>
                                    </div>
                                )}

                                <div className="p-3 bg-primary-200 rounded-lg">
                                    <p className="small-text text-slate-400 mb-1">Ticket ID</p>
                                    <p className="small-text font-mono font-semibold text-white">
                                        {result.ticket.ticket_id}
                                    </p>
                                </div>
                            </div>

                            {/* Check-in Info */}
                            {result.ticket.checked_in_at && (
                                <div className="p-3 bg-primary-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="small-text text-slate-400 mb-1">Checked In</p>
                                            <p className="normal-text-2 font-semibold text-white">
                                                {formatDateTime(result.ticket.checked_in_at)}
                                            </p>
                                        </div>
                                        {result.ticket.checked_in_by && (
                                            <div className="text-right">
                                                <p className="small-text text-slate-400 mb-1">By</p>
                                                <p className="normal-text-2 font-semibold text-white">
                                                    {result.ticket.checked_in_by.full_name}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Event Stats (Success only) */}
                    {isSuccess && result.event_stats && (
                        <div className="mt-4 p-4 bg-primary-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="small-text text-slate-400 mb-1">Total Progress</p>
                                    <p className="big-text-4 font-bold text-white">
                                        {result.event_stats.total_checked_in} / {result.event_stats.total_attendees}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="small-text text-slate-400 mb-1">Percentage</p>
                                    <p className="big-text-4 font-bold text-emerald-400">
                                        {result.event_stats.check_in_percentage}%
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden mt-3">
                                <div 
                                    className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                                    style={{ width: `${result.event_stats.check_in_percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckInResult;
