import { Metadata } from 'next';
import { ActivateAccountContent } from '@/components';

export const metadata: Metadata = {
    title: 'Activate Account | Cafa Tickets',
    description: 'Activate your Cafa Tickets account to start exploring events.',
};

type Props = {
    params: Promise<{ uid: string; token: string }>;
};

const ActivateAccountPage = async ({ params }: Props) => {
    const { uid, token } = await params;

    return (
        <main className="min-h-screen bg-primary flex items-center justify-center px-4 py-20">
            <ActivateAccountContent uid={uid} token={token} />
        </main>
    );
};

export default ActivateAccountPage;