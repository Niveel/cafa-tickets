import { Metadata } from 'next';
import { SettingsContent } from '@/components';

export const metadata: Metadata = {
    title: 'Settings | Cafa Ticket',
    description: 'Manage your account settings, notifications, security, and privacy preferences.',
    keywords: ['account settings', 'notifications', 'security', 'privacy'],
};

const SettingsPage = async () => {

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <SettingsContent />
            </div>
        </main>
    );
};

export default SettingsPage;