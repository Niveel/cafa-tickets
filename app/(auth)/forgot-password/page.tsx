import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components';

export const metadata: Metadata = {
    title: 'Forgot Password | Cafa Tickets',
    description: 'Reset your Cafa Tickets account password.',
};

const ForgotPasswordPage = () => {
    return (
        <main className="min-h-screen bg-primary flex items-center justify-center px-4 py-20">
            <ForgotPasswordForm />
        </main>
    );
};

export default ForgotPasswordPage;