import { Metadata } from 'next';
import { PasswordResetContent } from '@/components';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Reset Password | Cafa Ticket',
    description: 'Set a new password for your Cafa Ticket account.',
};

type Props = {
    searchParams: Promise<{
        uid?: string;
        token?: string;
    }>;
};

const PasswordResetPage = async ({ searchParams }: Props) => {
    const { uid, token } = await searchParams;

    // If no uid or token, redirect to forgot password
    if (!uid || !token) {
        return (
            <main className="min-h-screen bg-primary flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-2xl mx-auto text-center">
                    <h1 className="big-text-1 font-bold text-white mb-3">Invalid Reset Link</h1>
                    <p className="normal-text text-slate-400 mb-6">
                        This password reset link is invalid or incomplete.
                    </p>
                    
                    <Link href="/forgot-password"
                        className="inline-block px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text transition-all"
                    >
                        Request New Reset Link
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-primary flex items-center justify-center px-4 py-20">
            <PasswordResetContent uid={uid} token={token} />
        </main>
    );
};

export default PasswordResetPage;