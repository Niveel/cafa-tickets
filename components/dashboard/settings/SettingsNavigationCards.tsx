import React from 'react';
import Link from 'next/link';
import { Shield, Bell, Lock, ChevronRight } from 'lucide-react';

const SettingsNavigationCards = () => {
    const settingsSections = [
        {
            title: 'Security',
            description: 'Manage your password, email, and username',
            icon: Shield,
            href: '/dashboard/settings/security',
            color: 'from-purple-500 to-purple-600',
            iconBg: 'bg-purple-500/20',
            iconColor: 'text-purple-400'
        },
        {
            title: 'Notifications',
            description: 'Control email and SMS notifications',
            icon: Bell,
            href: '/dashboard/settings/notifications',
            color: 'from-blue-500 to-blue-600',
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400'
        },
        {
            title: 'Privacy & Data',
            description: 'Manage your data and account deletion',
            icon: Lock,
            href: '/dashboard/settings/privacy',
            color: 'from-emerald-500 to-emerald-600',
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settingsSections.map((section, index) => {
                const Icon = section.icon;
                
                return (
                    <Link
                        key={index}
                        href={section.href}
                        className="group bg-primary rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300 p-6 hover:scale-[1.02]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${section.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className={`w-6 h-6 ${section.iconColor}`} aria-hidden="true" />
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-accent group-hover:translate-x-1 transition-all" aria-hidden="true" />
                        </div>

                        <h3 className="big-text-3 font-bold text-white mb-2 group-hover:text-accent-50 transition-colors">
                            {section.title}
                        </h3>
                        <p className="normal-text-2 text-slate-400">
                            {section.description}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default SettingsNavigationCards;