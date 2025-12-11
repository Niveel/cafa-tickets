import React from 'react';
import Link from 'next/link';
import { Shield, Info } from 'lucide-react';

const PrivacyInfo = () => {
    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-white mb-2">
                        Your Privacy Rights
                    </h2>
                    <p className="normal-text-2 text-slate-300">
                        We take your privacy seriously and comply with GDPR regulations. You have full control over your personal data.
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-primary-100 rounded-lg">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-300">
                            <strong className="text-white">Right to Access:</strong> View all your personal data at any time through your profile.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-primary-100 rounded-lg">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-300">
                            <strong className="text-white">Right to Rectification:</strong> Update your information anytime from your profile settings.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-primary-100 rounded-lg">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-300">
                            <strong className="text-white">Right to Erasure:</strong> Delete your account and personal data permanently (see below).
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-primary-100 rounded-lg">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-slate-300">
                            <strong className="text-white">Data Retention:</strong> Personal data deleted within 30 days of account deletion. Transaction records may be anonymized and retained for legal compliance (7 years).
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-accent/30">
                <p className="small-text text-slate-400">
                    For more information, read our{' '}
                    <Link href="/privacy" className="text-accent-50 hover:text-accent font-semibold underline">
                        Privacy Policy
                    </Link>
                    {' '}and{' '}
                    <Link href="/terms" className="text-accent-50 hover:text-accent font-semibold underline">
                        Terms of Service
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default PrivacyInfo;