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
        
        // Simulate API call
        setTimeout(() => {
            alert('Default payment profile updated successfully!');
        }, 500);
    }, []);

    const handleDelete = React.useCallback((profileId: string) => {
        setProfiles(prevProfiles => 
            prevProfiles.filter(profile => profile.id !== profileId)
        );
        
        // Simulate API call
        setTimeout(() => {
            alert('Payment profile deleted successfully!');
        }, 500);
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