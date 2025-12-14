import React from 'react';
import { User, CheckCircle, ArrowRight, X } from 'lucide-react';
import { CurrentUser } from '@/types/general.types';

type Props = {
    user: CurrentUser;
    onUpdateProfile: () => void;
    onSkip: () => void;
};

const ProfileUpdatePrompt = ({ user, onUpdateProfile, onSkip }: Props) => {
    // Check if profile is incomplete
    const isIncomplete = !user.full_name || !user.profile_image;

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
                    Welcome Back, {user.username}!
                </h1>
                <p className="big-text-5 text-slate-200">
                    You&apos;ve successfully logged in
                </p>
            </div>

            {/* Prompt Card */}
            <div className="bg-primary-100 rounded-2xl p-6 shadow-2xl border-2 border-accent/30">
                {isIncomplete && (
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                            <User className="w-6 h-6 text-blue-400" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="big-text-4 font-bold text-white mb-2">
                                Complete Your Profile
                            </h2>
                            <p className="normal-text-2 text-slate-300">
                                Take a moment to personalize your account for a better experience
                            </p>
                        </div>
                    </div>
                )}

                {isIncomplete && (
                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3 p-3 bg-primary rounded-xl border border-accent/20">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                                1
                            </span>
                            <div>
                                <p className="normal-text-2 font-semibold text-white mb-1">
                                    Add your full name
                                </p>
                                <p className="small-text text-slate-400">
                                    Help others recognize you at events
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-primary rounded-xl border border-accent/20">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                                2
                            </span>
                            <div>
                                <p className="normal-text-2 font-semibold text-white mb-1">
                                    Upload a profile picture
                                </p>
                                <p className="small-text text-slate-400">
                                    Make your account more personal
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-primary rounded-xl border border-accent/20">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold small-text shrink-0">
                                3
                            </span>
                            <div>
                                <p className="normal-text-2 font-semibold text-white mb-1">
                                    Add bio and location
                                </p>
                                <p className="small-text text-slate-400">
                                    Share a bit about yourself
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={onUpdateProfile}
                        className="w-full h-12 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text transition-all flex items-center justify-center gap-2"
                    >
                        {isIncomplete ? 'Complete Profile Now' : 'Update Profile'}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                        onClick={onSkip}
                        className="w-full h-12 bg-primary-200 hover:bg-primary-300 text-slate-300 hover:text-white rounded-xl font-semibold normal-text-2 transition-all flex items-center justify-center gap-2"
                    >
                        {isIncomplete ? 'Skip for Now' : 'Go to Dashboard'}
                        <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>

                {/* Info */}
                {isIncomplete && (
                    <div className="mt-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="small-text text-blue-300">
                            💡 You can update your profile anytime from your dashboard settings
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileUpdatePrompt;