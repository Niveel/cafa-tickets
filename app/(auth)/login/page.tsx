import { Suspense } from 'react';
import { LoginForm } from '@/components';

type Props = {
    searchParams: Promise<{
        activated?: string;
        password_reset?: string;
    }>;
};

const LoginPage = async ({ searchParams }: Props) => {
    const params = await searchParams;

    return (
        <main className="bg-primary text-white py-12">
            <section>
                <div className="inner-wrapper">
                    {params.password_reset === 'true' && (
                        <div className="max-w-2xl mx-auto mb-6 p-4 bg-emerald-500/10 rounded-xl border-2 border-emerald-500/30">
                            <p className="normal-text text-emerald-400 text-center">
                                ✅ Password reset successful! You can now login with your new password.
                            </p>
                        </div>
                    )}
                    {params.activated === 'true' && (
                        <div className="max-w-2xl mx-auto mb-6 p-4 bg-emerald-500/10 rounded-xl border-2 border-emerald-500/30">
                            <p className="normal-text text-emerald-400 text-center">
                                ✅ Account activated successfully! You can now login.
                            </p>
                        </div>
                    )}
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginForm />
                    </Suspense>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;