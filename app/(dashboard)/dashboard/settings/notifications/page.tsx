import { Metadata } from 'next';
import { NotificationsSettingsContent } from '@/components';

export const metadata: Metadata = {
    title: 'Notification Settings | Cafa Ticket',
    description: 'Manage your email and SMS notification preferences for events, reminders, and marketing.',
    keywords: ['notifications', 'email preferences', 'SMS alerts', 'event reminders', 'Ghana'],
};

const NotificationsSettingsPage = async () => {
    // In production: Fetch user notification settings
    // const response = await fetch('/api/v1/users/settings/');
    // const settings = await response.json();

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <NotificationsSettingsContent />
            </div>
        </main>
    );
};

export default NotificationsSettingsPage;