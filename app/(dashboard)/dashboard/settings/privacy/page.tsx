import { Metadata } from 'next';
import { PrivacySettingsContent } from '@/components';

export const metadata: Metadata = {
    title: 'Privacy & Data Settings | Cafa Ticket',
    description: 'Manage your privacy settings, data preferences, and account deletion.',
    keywords: ['privacy', 'data protection', 'account deletion', 'GDPR',],
};

const PrivacySettingsPage = async () => {

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <PrivacySettingsContent />
            </div>
        </main>
    );
};

export default PrivacySettingsPage;