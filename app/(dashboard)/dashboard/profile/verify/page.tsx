import React from 'react';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

import { VerificationFlow } from '@/components';

const VerifyProfilePage = async () => {
    const currentUser = await getCurrentUser();
    
    // If already verified, redirect to create event
    if (currentUser?.is_organizer) {
        redirect('/dashboard/events/create');
    }

    return (
        <main className='dash-page'>
            <VerificationFlow user={currentUser} /> 
        </main>
    );
};

export default VerifyProfilePage;