import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

const SecuritySettingsHeader = () => {
    return (
        <div className="space-y-4">
            {/* Back Link */}
            <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Settings
            </Link>

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-1 font-bold text-white">
                        Security Settings
                    </h1>
                    <p className="normal-text text-slate-400">
                        Manage your password, email, and account security
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettingsHeader;