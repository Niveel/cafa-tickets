import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

import { EditPaymentProfileForm } from "@/components";
import { getMyPaymentProfiles } from '@/app/lib/dashboard';

type Props = {
  params: Promise<{ id: string }>;
};

const EditPaymentProfilePage = async ({ params }: Props) => {
  const { id } = await params;
  const paymentProfiles = await getMyPaymentProfiles();

  // Find the profile to edit
  const profile = paymentProfiles?.results?.find(p => p.id === id);

  if (!profile) {
    notFound();
  }

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
      <EditPaymentProfileForm profile={profile} />
    </main>
  );
};

export default EditPaymentProfilePage;