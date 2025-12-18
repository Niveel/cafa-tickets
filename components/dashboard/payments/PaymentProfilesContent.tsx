"use client";

import React from 'react';
import { PaymentProfile } from '@/types/payments.types';
import { PaymentProfilesList } from "@/components";

type Props = {
    initialProfiles: PaymentProfile[];
};

const PaymentProfilesContent = ({ initialProfiles }: Props) => {
    const [profiles, setProfiles] = React.useState<PaymentProfile[]>(initialProfiles);

    const handleSetDefault = React.useCallback((profileId: string) => {
        setProfiles(prevProfiles => 
            prevProfiles.map(profile => ({
                ...profile,
                is_default: profile.id === profileId
            }))
        );
        
        // TODO: Call set default API
        setTimeout(() => {
            alert('Default payment profile updated successfully!');
        }, 500);
    }, []);

    const handleDelete = React.useCallback(async (profileId: string) => {
        try {
            const response = await fetch('/api/dashboard/payment/delete-profile', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: profileId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete payment profile');
            }

            // Success - update state
            setProfiles(prevProfiles => 
                prevProfiles.filter(profile => profile.id !== profileId)
            );

            alert('Payment profile deleted successfully!');
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Failed to delete payment profile');
            throw error; // Re-throw so the modal can handle it
        }
    }, []);

    return (
        <PaymentProfilesList 
            profiles={profiles}
            onSetDefault={handleSetDefault}
            onDelete={handleDelete}
        />
    );
};

export default PaymentProfilesContent;