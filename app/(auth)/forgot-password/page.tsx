import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components';

export const metadata: Metadata = {
    title: 'Forgot Password | Cafa Ticket',
    description: 'Reset your Cafa Ticket account password.',
};

const ForgotPasswordPage = () => {
    return (
        <main className="min-h-screen bg-primary flex items-center justify-center px-4 py-20">
            <ForgotPasswordForm />
        </main>
    );
};

export default ForgotPasswordPage;