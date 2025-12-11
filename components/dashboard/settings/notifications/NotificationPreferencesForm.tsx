"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, Calendar, TrendingUp, CheckCircle, Loader2 } from 'lucide-react';

type NotificationSettings = {
    marketing_emails: boolean;
    event_reminders: boolean;
    email_notifications: boolean;
    sms_notifications: boolean;
};

type Props = {
    currentSettings: NotificationSettings;
};

const NotificationPreferencesForm = ({ currentSettings }: Props) => {
    const [settings, setSettings] = useState<NotificationSettings>(currentSettings);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const notificationOptions = [
        {
            key: 'email_notifications' as keyof NotificationSettings,
            icon: Mail,
            title: 'Email Notifications',
            description: 'Receive important updates and notifications via email',
            color: 'blue'
        },
        {
            key: 'event_reminders' as keyof NotificationSettings,
            icon: Calendar,
            title: 'Event Reminders',
            description: 'Get notified before your events start',
            color: 'purple'
        },
        {
            key: 'sms_notifications' as keyof NotificationSettings,
            icon: MessageSquare,
            title: 'SMS Notifications',
            description: 'Receive critical updates via text message',
            color: 'emerald'
        },
        {
            key: 'marketing_emails' as keyof NotificationSettings,
            icon: TrendingUp,
            title: 'Marketing Emails',
            description: 'Get updates about promotions, new events, and special offers',
            color: 'amber'
        }
    ];

    const handleToggle = (key: keyof NotificationSettings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Simulate API call: PATCH /api/v1/users/settings/
            const payload = {
                marketing_emails: settings.marketing_emails,
                event_reminders: settings.event_reminders,
                email_notifications: settings.email_notifications,
                sms_notifications: settings.sms_notifications
            };

            console.log('Updating notification settings:', payload);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success
            setSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);

        } catch (err: any) {
            setError(err.message || 'Failed to update settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const hasChanges = JSON.stringify(settings) !== JSON.stringify(currentSettings);

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="mb-6">
                <h2 className="big-text-3 font-bold text-white mb-1">
                    Notification Preferences
                </h2>
                <p className="normal-text-2 text-slate-400">
                    Control how and when you receive notifications
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <p className="small-text text-red-400">{error}</p>
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        <p className="small-text text-emerald-400">Settings updated successfully!</p>
                    </div>
                </div>
            )}

            {/* Notification Options */}
            <div className="space-y-4 mb-6">
                {notificationOptions.map((option) => {
                    const Icon = option.icon;
                    const isEnabled = settings[option.key];

                    return (
                        <div
                            key={option.key}
                            className="flex items-center justify-between p-4 bg-primary-100 rounded-xl border border-accent/20 hover:border-accent/40 transition-colors"
                        >
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`w-10 h-10 rounded-lg bg-${option.color}-500/20 flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-5 h-5 text-${option.color}-400`} aria-hidden="true" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="big-text-5 font-semibold text-white mb-1">
                                        {option.title}
                                    </h3>
                                    <p className="small-text text-slate-400">
                                        {option.description}
                                    </p>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                type="button"
                                onClick={() => handleToggle(option.key)}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary ${
                                    isEnabled ? 'bg-accent' : 'bg-slate-600'
                                }`}
                                role="switch"
                                aria-checked={isEnabled}
                                aria-label={`Toggle ${option.title}`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Save Button */}
            <button
                type="button"
                onClick={handleSave}
                disabled={loading || !hasChanges}
                className="w-full h-11 bg-accent hover:bg-accent-100 text-white rounded-lg font-semibold normal-text-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Saving Changes...
                    </>
                ) : (
                    'Save Preferences'
                )}
            </button>

            {!hasChanges && !loading && (
                <p className="mt-3 text-center small-text text-slate-500">
                    No changes to save
                </p>
            )}
        </div>
    );
};

export default NotificationPreferencesForm;