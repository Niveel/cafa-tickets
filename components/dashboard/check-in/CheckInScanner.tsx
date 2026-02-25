"use client";

import React, { useState } from 'react';

import { MyEvent } from '@/types/dash-events.types';
import { CheckInSuccessResponse, CheckInResponse } from '@/types/dashboard.types';
import {
    CheckInStats,
    QRScanner,
    ManualEntry,
    CheckInResult
} from '@/components';
import { ScanLine, Keyboard, ArrowLeft } from 'lucide-react';

type Props = {
    event: MyEvent;
    onSuccess: (checkInData: CheckInSuccessResponse) => void;
    onChangeEvent: () => void;
};

type ScanMode = 'qr' | 'manual';

const CheckInScanner = ({ event, onSuccess, onChangeEvent }: Props) => {
    const [scanMode, setScanMode] = useState<ScanMode>('qr');
    const [checkInResult, setCheckInResult] = useState<CheckInResponse | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckIn = async (ticketId: string) => {
        setIsProcessing(true);
        setCheckInResult(null);

        try {
            const response = await fetch(`/api/dashboard/events/${event.slug}/check-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticket_id: ticketId }),
            });

            const data: CheckInResponse = await response.json();

            setCheckInResult(data);

            // If successful, call onSuccess callback
            if (data.success) {
                onSuccess(data);
            }

        } catch (error) {
            console.error('Check-in error:', error);
            setCheckInResult({
                success: false,
                error: "Check-in failed",
                message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
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