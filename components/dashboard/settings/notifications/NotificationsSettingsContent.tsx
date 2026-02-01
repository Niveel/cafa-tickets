"use client";

import React, { useState } from 'react';
import {
    NotificationsSettingsHeader,
    NotificationPreferencesForm,
    NotificationInfo
} from '@/components';

const mockSettings = {
    marketing_emails: false,
    event_reminders: true,
    email_notifications: true,
    sms_notifications: false
};

const NotificationsSettingsContent = () => {
    const [settings] = useState(mockSettings);

    return (
        <div className="space-y-6">
            {/* Header */}
            <NotificationsSettingsHeader />

            {/* Info */}
            <NotificationInfo />

            {/* Preferences Form */}
            <NotificationPreferencesForm currentSettings={settings} />
        </div>
    );
};

export default NotificationsSettingsContent;