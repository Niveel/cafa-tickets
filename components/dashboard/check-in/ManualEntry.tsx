"use client";

import React, { useState, useRef } from 'react';
import { Search, Info, Loader2 } from 'lucide-react';

type Props = {
    onSubmit: (ticketId: string) => void;
    isProcessing: boolean;
};

const ManualEntry = ({ onSubmit, isProcessing }: Props) => {
    const [ticketId, setTicketId] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!ticketId.trim()) return;
        
        onSubmit(ticketId.trim());
        setTicketId('');
        
        // Refocus input after submission
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Search className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="big-text-4 font-bold text-white">
                            Manual Entry
                        </h3>
                        <p className="small-text text-slate-400">
                            Enter ticket ID manually
                        </p>
                    </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={ticketId}
                            onChange={(e) => setTicketId(e.target.value)}
                            placeholder="Enter Ticket ID (e.g., TKT-UUID-001)"
                            disabled={isProcessing}
                            className="w-full h-14 pl-5 pr-32 bg-primary-100 border-2 border-accent/30 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-accent transition-colors big-text-5 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!ticketId.trim() || isProcessing}
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-100 text-white rounded-lg font-semibold normal-text-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                    Checking...
                                </>
                            ) : (
                                'Check In'
                            )}
                        </button>
                    </div>
                </form>

                {/* Example Ticket IDs */}
                <div className="p-4 bg-primary-200 rounded-lg">
                    <p className="small-text text-slate-400 font-semibold mb-2">
                        Example Ticket IDs (for testing):
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['TKT-UUID-001', 'TKT-UUID-002', 'TKT-UUID-003'].map((id) => (
                            <button
                                key={id}
                                onClick={() => setTicketId(id)}
                                disabled={isProcessing}
                                className="px-3 py-1.5 bg-primary-100 hover:bg-primary text-slate-300 hover:text-white rounded-lg small-text font-mono transition-colors border border-accent/30 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {id}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-blue-300 font-semibold mb-1">
                                When to Use Manual Entry
                            </p>
                            <ul className="small-text-2 text-blue-300 space-y-1">
                                <li>• QR code is damaged or unreadable</li>
                                <li>• Camera is not available or not working</li>
                                <li>• Attendee has ticket ID but no QR code</li>
                                <li>• Faster for staff familiar with typing ticket IDs</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Keyboard Shortcut Hint */}
                <div className="text-center">
                    <p className="small-text text-slate-500">
                        Press <kbd className="px-2 py-1 bg-primary-200 rounded font-mono text-slate-400">Enter</kbd> to check in
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ManualEntry;