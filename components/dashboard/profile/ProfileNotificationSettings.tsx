import React from 'react';
import Link from 'next/link';
import { Bell, Mail, MessageSquare, Settings } from 'lucide-react';
import { CurrentUser } from '@/types/general.types';

type Props = {
    settings: CurrentUser['settings'];
};

const ProfileNotificationSettings = ({ settings }: Props) => {
    const settingsData = [
        {
            key: 'marketing_emails',
            title: 'Marketing Emails',
            description: 'Receive promotional emails from Cafa Ticket',
            icon: Mail,
            enabled: settings.marketing_emails
        },
        {
            key: 'event_reminders',
            title: 'Event Reminders',
            description: 'Get notified before your events start',
            icon: Bell,
            enabled: settings.event_reminders
        },
        {
            key: 'email_notifications',
            title: 'Email Notifications',
            description: 'Receive updates via email',
            icon: Mail,
            enabled: settings.email_notifications
        },
        {
            key: 'sms_notifications',
            title: 'SMS Notifications',
            description: 'Receive updates via text message',
            icon: MessageSquare,
            enabled: settings.sms_notifications
        }
    ];

    const enabledCount = Object.values(settings).filter(Boolean).length;

    return (
        <div role="region" aria-label="Notification preferences" className="bg-primary rounded-xl p-6 border-2 border-accent/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="big-text-3 font-bold text-white mb-1">
                        Notification Preferences
                    </h2>
                    <p className="normal-text-2 text-slate-300">
                        {enabledCount} of {settingsData.length} enabled
                    </p>
                </div>
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent-50 rounded-lg font-semibold normal-text-2 hover:bg-accent/30 transition-all duration-300 border border-accent/30 hover:border-accent/50"
                >
                    <Settings className="w-4 h-4" aria-hidden="true" />
                    Manage
                </Link>
            </div>

            {/* Settings List */}
            <div className="space-y-3">
                {settingsData.map((setting, index) => {
                    const Icon = setting.icon;
                    
                    return (
                        <div 
                            key={index}
                            className="flex items-center justify-between p-4 bg-primary-100 rounded-xl border border-accent/20"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-10 h-10 rounded-lg ${
                                    setting.enabled 
                                        ? 'bg-emerald-500/20' 
                                        : 'bg-slate-500/20'
                                } flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-5 h-5 ${
                                        setting.enabled 
                                            ? 'text-emerald-400' 
                                            : 'text-slate-400'
                                    }`} aria-hidden="true" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="normal-text-2 font-semibold text-white mb-0.5">
                                        {setting.title}
                                    </p>
                                    <p className="small-text text-slate-400">
                                        {setting.description}
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className={`px-3 py-1.5 rounded-lg font-semibold small-text shrink-0 ${
                                setting.enabled
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                            }`}>
                                {setting.enabled ? 'Enabled' : 'Disabled'}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Info Note */}
            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="small-text text-blue-300">
                    💡 Manage all notification settings in the{' '}
                    <Link href="/dashboard/settings" className="text-blue-400 hover:text-blue-300 font-semibold underline">
                        Settings page
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ProfileNotificationSettings;