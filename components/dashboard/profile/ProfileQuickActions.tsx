import React from 'react';
import Link from 'next/link';
import { Lock, Bell, CreditCard } from 'lucide-react';

const ProfileQuickActions = () => {
    const actions = [
        {
            title: 'Change Password',
            description: 'Update your password',
            icon: Lock,
            href: '/dashboard/settings/security',
            color: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Notification Settings',
            description: 'Manage preferences',
            icon: Bell,
            href: '/dashboard/settings',
            color: 'from-emerald-500 to-emerald-600'
        },
        {
            title: 'Payment Profile',
            description: 'Manage payment profile',
            icon: CreditCard,
            href: '/dashboard/payment/profiles',
            color: 'from-pink-500 to-pink-600'
        }
    ];

    return (
        <div role="region" aria-label="Quick actions" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            <div className="mb-6">
                <h2 className="big-text-3 font-bold text-white mb-1">
                    Quick Actions
                </h2>
                <p className="normal-text-2 text-slate-300">
                    Manage your account and activities
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    
                    return (
                        <Link
                            key={index}
                            href={action.href}
                            className="group p-4 bg-primary-200 rounded-xl border border-accent/20 hover:border-accent transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="big-text-5 font-bold text-white mb-1">
                                {action.title}
                            </h3>
                            <p className="small-text text-slate-400">
                                {action.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileQuickActions;