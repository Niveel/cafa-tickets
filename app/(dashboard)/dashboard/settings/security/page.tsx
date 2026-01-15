import { Metadata } from 'next';

import { SecuritySettingsContent } from '@/components';
import { getCurrentUser } from '@/app/lib/auth';

export const metadata: Metadata = {
    title: 'Security Settings | Cafa Ticket',
    description: 'Manage your password, email address, and account security settings.',
    keywords: ['security', 'password', 'email', 'account security',],
};

const SecuritySettingsPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return (
            <div className="bg-primary rounded-xl p-6 border-2 border-accent/30 text-center">
                <p className="big-text-3 text-white mb-2">Authentication Required</p>
                <p className="normal-text text-slate-300">Please log in to access security settings</p>
            </div>
        );
    }

    return (
        <main className="dash-page">
            <div className="inner-wrapper">
                <SecuritySettingsContent currentUser={user} />
            </div>
        </main>
    );
};

export default SecuritySettingsPage;