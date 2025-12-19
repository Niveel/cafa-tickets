import React from 'react';
import { Mail, CheckCircle } from 'lucide-react';

type Props = {
    email: string;
};

const EmailVerificationPrompt = ({ email }: Props) => {
    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-emerald-400" aria-hidden="true" />
                </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="big-text-1 font-bold text-white mb-3">
                    Check Your Email
                </h1>
                <p className="big-text-5 text-slate-200">
                    We&apos;ve sent a verification link to
                </p>
                <p className="big-text-4 font-semibold text-accent-50 mt-2">
                    {email}
                </p>
            </div>

            {/* Instructions Card */}
            <div className="bg-primary-100 rounded-2xl p-6 shadow-2xl border-2 border-accent/30">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="big-text-4 font-bold text-white mb-2">
                            Next Steps
                        </h2>
                        <p className="normal-text-2 text-slate-300">
                            Follow these steps to activate your account
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-primary rounded-xl border border-accent/20">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                            1
                        </span>
                        <div>
                            <p className="normal-text-2 font-semibold text-white mb-1">
                                Check your inbox
                            </p>
                            <p className="small-text text-slate-400">
                                Look for an email from Cafa Ticket with the subject &quot;Verify your email address&quot;
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-primary rounded-xl border border-accent/20">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                            2
                        </span>
                        <div>
                            <p className="normal-text-2 font-semibold text-white mb-1">
                                Click the verification link
                            </p>
                            <p className="small-text text-slate-400">
                                The link will activate your account instantly
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-primary rounded-xl border border-accent/20">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                            3
                        </span>
                        <div>
                            <p className="normal-text-2 font-semibold text-white mb-1">
                                Login to your account
                            </p>
                            <p className="small-text text-slate-400">
                                After activation, you can login and start exploring events
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <p className="small-text text-blue-300">
                        💡 <strong>Didn&apos;t receive the email?</strong> Check your spam folder or contact support at{' '}
                        <a href="mailto:support@cafatickets.com" className="text-blue-400 hover:text-blue-300 font-semibold underline">
                            support@cafatickets.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPrompt;