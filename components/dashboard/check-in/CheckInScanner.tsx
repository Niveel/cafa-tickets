"use client";

import React, { useState } from 'react';
import { MyEvent } from '@/types/dash-events.types';
import {
    CheckInStats,
    QRScanner,
    ManualEntry,
    CheckInResult
} from '@/components';
import { ScanLine, Keyboard, ArrowLeft } from 'lucide-react';

type Props = {
    event: MyEvent;
    onSuccess: (checkInData: any) => void;
    onChangeEvent: () => void;
};

type ScanMode = 'qr' | 'manual';

const CheckInScanner = ({ event, onSuccess, onChangeEvent }: Props) => {
    const [scanMode, setScanMode] = useState<ScanMode>('qr');
    const [checkInResult, setCheckInResult] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckIn = async (ticketId: string) => {
        setIsProcessing(true);
        setCheckInResult(null);

        try {
            // Simulate API call
            console.log('Checking in ticket:', ticketId, 'for event:', event.id);
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate different responses (you can test different scenarios)
            const scenarios = {
                success: {
                    success: true,
                    message: "Ticket checked in successfully",
                    ticket: {
                        ticket_id: ticketId,
                        attendee_name: "John Doe",
                        attendee_email: "john.doe@example.com",
                        ticket_type: {
                            id: 1,
                            name: "Regular",
                            price: "50.00"
                        },
                        is_checked_in: true,
                        checked_in_at: new Date().toISOString(),
                        checked_in_by: {
                            id: 5,
                            username: "eventstaff",
                            full_name: "Event Staff"
                        }
                    },
                    event_stats: {
                        total_checked_in: event.analytics.tickets_checked_in + 1,
                        total_attendees: event.analytics.tickets_sold,
                        check_in_percentage: ((event.analytics.tickets_checked_in + 1) / event.analytics.tickets_sold * 100).toFixed(2)
                    }
                },
                alreadyCheckedIn: {
                    success: false,
                    error: "Already checked in",
                    message: "This ticket was already used at 2025-07-15T20:10:00Z",
                    ticket: {
                        ticket_id: ticketId,
                        attendee_name: "John Doe",
                        checked_in_at: "2025-07-15T20:10:00Z",
                        checked_in_by: "Event Staff"
                    }
                },
                invalidTicket: {
                    success: false,
                    error: "Invalid ticket",
                    message: "Ticket not found or not valid for this event"
                },
                wrongEvent: {
                    success: false,
                    error: "Wrong event",
                    message: `This ticket is for 'Jazz Night' event, not '${event.title}'`
                }
            };

            // For demo, randomly pick a scenario (80% success, 20% error)
            const random = Math.random();
            let result;
            
            if (random < 0.8) {
                result = scenarios.success;
                onSuccess(result);
            } else if (random < 0.9) {
                result = scenarios.alreadyCheckedIn;
            } else if (random < 0.95) {
                result = scenarios.wrongEvent;
            } else {
                result = scenarios.invalidTicket;
            }

            setCheckInResult(result);

        } catch (error: any) {
            setCheckInResult({
                success: false,
                error: "Check-in failed",
                message: error.message || "An unexpected error occurred. Please try again."
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDismissResult = () => {
        setCheckInResult(null);
    };

    return (
        <div className="space-y-6">
            {/* Event Info Bar */}
            <div className="bg-primary rounded-xl border-2 border-accent/30 p-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onChangeEvent}
                            className="w-10 h-10 rounded-lg bg-primary-200 hover:bg-primary-100 flex items-center justify-center transition-colors"
                            aria-label="Change event"
                        >
                            <ArrowLeft className="w-5 h-5 text-white" aria-hidden="true" />
                        </button>
                        <div>
                            <h2 className="big-text-4 font-bold text-white">
                                {event.title}
                            </h2>
                            <p className="small-text text-slate-400">
                                {event.venue_name}, {event.venue_city}
                            </p>
                        </div>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex items-center gap-2 p-1 bg-primary-200 rounded-lg">
                        <button
                            onClick={() => setScanMode('qr')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold small-text transition-all ${
                                scanMode === 'qr'
                                    ? 'bg-accent text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <ScanLine className="w-4 h-4" aria-hidden="true" />
                            QR Scanner
                        </button>
                        <button
                            onClick={() => setScanMode('manual')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold small-text transition-all ${
                                scanMode === 'manual'
                                    ? 'bg-accent text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <Keyboard className="w-4 h-4" aria-hidden="true" />
                            Manual Entry
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <CheckInStats event={event} />

            {/* Check-in Result */}
            {checkInResult && (
                <CheckInResult 
                    result={checkInResult} 
                    onDismiss={handleDismissResult}
                />
            )}

            {/* Scanner or Manual Entry */}
            {scanMode === 'qr' ? (
                <QRScanner 
                    onScan={handleCheckIn}
                    isProcessing={isProcessing}
                />
            ) : (
                <ManualEntry 
                    onSubmit={handleCheckIn}
                    isProcessing={isProcessing}
                />
            )}
        </div>
    );
};

export default CheckInScanner;