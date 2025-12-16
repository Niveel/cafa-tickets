import React from 'react';
import { redirect } from 'next/navigation';
import { EditProfileForm } from '@/components';
import { getCurrentUser } from '@/app/lib/auth';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const EditProfilePage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/login');
    }

    return (
        <main className="dash-page space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/profile"
                    className="w-10 h-10 rounded-lg bg-primary-200 hover:bg-primary flex items-center justify-center transition-colors border border-accent/30 hover:border-accent"
                    aria-label="Back to profile"
                >
                    <ChevronLeft className="w-5 h-5 text-slate-300" aria-hidden="true" />
                </Link>
                <div>
                    <h1 className="big-text-2 font-bold text-white">
                        Edit Profile
                    </h1>
                    <p className="normal-text text-slate-400">
                        Update your personal information and preferences
                    </p>
                </div>
            </div>

            {/* Edit Form */}
            <EditProfileForm user={currentUser} />
        </main>
    );
};

export default EditProfilePage;