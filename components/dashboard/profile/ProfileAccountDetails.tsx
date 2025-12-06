import React from 'react';
import { Shield, Key, Clock, UserCheck } from 'lucide-react';
import { CurrentUser } from '@/types/general.types';

type Props = {
    user: CurrentUser;
};

const ProfileAccountDetails = ({ user }: Props) => {
    const accountAge = () => {
        const joined = new Date(user.date_joined);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - joined.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const months = Math.floor(diffDays / 30);
        const days = diffDays % 30;
        
        if (months === 0) return `${days} days`;
        if (days === 0) return `${months} ${months === 1 ? 'month' : 'months'}`;
        return `${months} ${months === 1 ? 'month' : 'months'}, ${days} days`;
    };

    const accountDetails = [
        {
            title: 'Account ID',
            value: `#${user.id.toString().padStart(6, '0')}`,
            icon: UserCheck,
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            description: 'Unique account identifier'
        },
        {
            title: 'Username',
            value: `@${user.username}`,
            icon: Shield,
            iconBg: 'bg-purple-500/20',
            iconColor: 'text-purple-400',
            description: 'Public display name'
        },
        {
            title: 'Email Status',
            value: user.is_email_verified ? 'Verified' : 'Not Verified',
            icon: user.is_email_verified ? Shield : Key,
            iconBg: user.is_email_verified ? 'bg-emerald-500/20' : 'bg-amber-500/20',
            iconColor: user.is_email_verified ? 'text-emerald-400' : 'text-amber-400',
            description: user.email,
            badge: user.is_email_verified ? 'verified' : 'pending'
        },
        {
            title: 'Account Age',
            value: accountAge(),
            icon: Clock,
            iconBg: 'bg-accent/20',
            iconColor: 'text-accent-50',
            description: new Date(user.date_joined).toLocaleDateString('en-GH', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        }
    ];

    return (
        <div role="region" aria-label="Account details" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            {/* Header */}
            <div className="mb-6">
                <h2 className="big-text-3 font-bold text-white mb-1">
                    Account Details
                </h2>
                <p className="normal-text-2 text-slate-300">
                    Your account information and verification status
                </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accountDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    
                    return (
                        <div 
                            key={index}
                            className="p-4 bg-primary-200 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300"
                        >
                            <div className="flex flex-col items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg ${detail.iconBg} flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-5 h-5 ${detail.iconColor}`} aria-hidden="true" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="small-text text-slate-400 mb-1">
                                        {detail.title}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="big-text-5 font-bold text-white">
                                            {detail.value}
                                        </p>
                                        {detail.badge && (
                                            <span className={`px-2 py-0.5 rounded-md font-semibold text-xs ${
                                                detail.badge === 'verified'
                                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                            }`}>
                                                {detail.badge === 'verified' ? '✓ Verified' : '⏳ Pending'}
                                            </span>
                                        )}
                                    </div>
                                    <p className="small-text text-slate-400 mt-1 truncate">
                                        {detail.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="normal-text-2 font-semibold text-white mb-1">
                            Security Recommendation
                        </p>
                        <p className="small-text text-slate-300">
                            {user.is_email_verified 
                                ? 'Your account is secure. Keep your password safe for extra security.'
                                : 'Please verify your email address to secure your account and unlock all features.'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAccountDetails;