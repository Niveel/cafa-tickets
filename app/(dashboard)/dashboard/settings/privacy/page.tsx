import { Metadata } from 'next';
import { PrivacySettingsContent } from '@/components';

export const metadata: Metadata = {
    title: 'Privacy & Data Settings | Cafa Tickets',
    description: 'Manage your privacy settings, data preferences, and account deletion.',
    keywords: ['privacy', 'data protection', 'account deletion', 'GDPR', 'Ghana'],
};

const PrivacySettingsPage = async () => {
    // In production: Fetch user data and check for active tickets/events
    // const response = await fetch('/api/v1/users/profile/');
    // const user = await response.json();
    
    // const activeResponse = await fetch('/api/v1/users/active-items/');
    // const activeItems = await activeResponse.json();

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <PrivacySettingsContent />
            </div>
        </main>
    );
};

export default PrivacySettingsPage;