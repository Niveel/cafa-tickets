import React from 'react';
import { Info } from 'lucide-react';

const NotificationInfo = () => {
    return (
        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                    <p className="normal-text-2 font-semibold text-blue-300 mb-1">
                        Stay Updated
                    </p>
                    <p className="small-text text-blue-300">
                        Choose how you want to receive updates about your tickets, upcoming events, and special offers. You can change these preferences at any time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotificationInfo;