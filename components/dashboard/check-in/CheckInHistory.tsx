"use client";

import React, { useEffect, useState } from 'react';
import { CheckInHistoryItem } from '@/types/dashboard.types';
import { History, User, Clock, Ticket, RefreshCw } from 'lucide-react';

type Props = {
    eventSlug: string;
    latestCheckIn?: CheckInHistoryItem | null;
};

const CheckInHistory = ({ eventSlug, latestCheckIn }: Props) => {
    const [history, setHistory] = useState<CheckInHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/dashboard/events/${eventSlug}/check-in/history`);

            if (!response.ok) {
                throw new Error('Failed to fetch check-in history');
            }

            const data: CheckInHistoryItem[] = await response.json();
            setHistory(data);

        } catch (err) {
            console.error('Error fetching check-in history:', err);
            setError(err instanceof Error ? err.message : 'Failed to load history');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [eventSlug]);

    // Add latest check-in to the top of the list when it comes in
    useEffect(() => {
        if (latestCheckIn) {
            setHistory(prev => {
                // Check if this check-in already exists in history
                const exists = prev.some(item => item.ticket_id === latestCheckIn.ticket_id);
                if (exists) return prev;
                
                // Add to top and keep only last 10
                return [latestCheckIn, ...prev].slice(0, 10);
            });
        }
    }, [latestCheckIn]);

    const formatDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleString('en-GH', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
                <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 text-accent animate-spin" aria-hidden="true" />
                    <span className="ml-3 normal-text text-slate-400">Loading history...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-primary rounded-xl border-2 border-red-500/30 p-6">
                <p className="normal-text text-red-400 text-center">{error}</p>
                <button
                    onClick={fetchHistory}
                    className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold normal-text-2 hover:bg-accent-100 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                    Retry
                </button>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
                <div className="text-center py-8">
                    <History className="w-12 h-12 text-slate-600 mx-auto mb-3" aria-hidden="true" />
                    <p className="normal-text text-slate-400">No check-ins yet</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <History className="w-5 h-5 text-purple-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="big-text-4 font-bold text-white">
                            Recent Check-ins
                        </h3>
                        <p className="small-text text-slate-400">
                            Last {history.length} check-in{history.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                <button
                    onClick={fetchHistory}
                    className="w-8 h-8 rounded-lg bg-primary-200 hover:bg-primary-100 flex items-center justify-center transition-colors"
                    aria-label="Refresh history"
                >
                    <RefreshCw className="w-4 h-4 text-white" aria-hidden="true" />
                </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.map((item, index) => (
                    <div 
                        key={`${item.ticket_id}-${index}`}
                        className="p-4 bg-primary-200 rounded-lg border border-accent/30 hover:border-accent/50 transition-colors"
                    >
                        <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <p className="normal-text-2 font-bold text-white mb-1">
                                    {item.attendee_name}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-3 text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Ticket className="w-3 h-3" aria-hidden="true" />
                                        <span className="small-text font-mono">
                                            {item.ticket_id}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1">
                                        <span className="small-text">
                                            {item.ticket_type.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" aria-hidden="true" />
                                        <span className="small-text">
                                            {formatDateTime(item.checked_in_at)}
                                        </span>
                                    </div>
                                </div>

                                <p className="small-text text-slate-500 mt-1">
                                    by {item.checked_in_by.full_name}
                                </p>
                            </div>

                            {/* Badge */}
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg small-text font-semibold border border-emerald-500/30 shrink-0">
                                Checked In
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckInHistory;