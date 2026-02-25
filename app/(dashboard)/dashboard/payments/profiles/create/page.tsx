import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { CreatePaymentProfileForm } from "@/components";

const CreatePaymentProfilePage = () => {
    return (
        <main className='dash-page space-y-8'>
            {/* Back Button */}
            <Link
                href="/dashboard/payments/profiles"
                className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Payment Profiles
            </Link>

            {/* Form */}
            <CreatePaymentProfileForm />
        </main>
    );
};

export default CreatePaymentProfilePage;