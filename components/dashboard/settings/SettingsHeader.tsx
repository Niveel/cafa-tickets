import React from 'react';
import { Settings } from 'lucide-react';

const SettingsHeader = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Settings className="w-6 h-6 text-accent-50" aria-hidden="true" />
            </div>
            <div>
                <h1 className="big-text-1 font-bold text-white">
                    Settings
                </h1>
                <p className="normal-text text-slate-400">
                    Manage your account preferences and security
                </p>
            </div>
        </div>
    );
};

export default SettingsHeader;