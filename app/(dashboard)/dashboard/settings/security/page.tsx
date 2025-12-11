import { Metadata } from 'next';
import { SecuritySettingsContent } from '@/components';

export const metadata: Metadata = {
    title: 'Security Settings | Cafa Tickets',
    description: 'Manage your password, email address, and account security settings.',
    keywords: ['security', 'password', 'email', 'account security', 'Ghana'],
};

const SecuritySettingsPage = async () => {
    // In production: Fetch user data
    // const response = await fetch('/api/v1/users/profile/');
    // const user = await response.json();

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <SecuritySettingsContent />
            </div>
        </main>
    );
};

export default SecuritySettingsPage;