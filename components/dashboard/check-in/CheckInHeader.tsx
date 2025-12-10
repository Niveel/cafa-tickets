import React from 'react';
import { ScanLine, Info } from 'lucide-react';

type Props = {
    totalEvents: number;
};

const CheckInHeader = ({ totalEvents }: Props) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <ScanLine className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-1 font-bold text-white">
                        Event Check-in
                    </h1>
                    <p className="normal-text text-slate-400">
                        Scan QR codes to check in attendees
                    </p>
                </div>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="normal-text-2 text-blue-300 font-semibold mb-1">
                            How Check-in Works
                        </p>
                        <ul className="small-text text-blue-300 space-y-1">
                            <li>• Select your event from the list below</li>
                            <li>• Use the QR scanner or enter ticket IDs manually</li>
                            <li>• System validates tickets and prevents duplicate check-ins</li>
                            <li>• View real-time check-in stats and history</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckInHeader;