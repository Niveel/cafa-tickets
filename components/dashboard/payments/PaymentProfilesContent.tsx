"use client";

import React from 'react';
import { PaymentProfile } from '@/types/payments.types';
import { PaymentProfilesList } from "@/components";
import { useAlertModal } from '@/contexts/AlertModalContext';

type Props = {
    initialProfiles: PaymentProfile[];
};

const PaymentProfilesContent = ({ initialProfiles }: Props) => {
    const [profiles, setProfiles] = React.useState<PaymentProfile[]>(initialProfiles);
    const [settingDefaultId, setSettingDefaultId] = React.useState<string | null>(null);
    const { showAlert } = useAlertModal();

    const handleSetDefault = React.useCallback(async (profileId: string) => {
        const previousProfiles = profiles;

        setSettingDefaultId(profileId);
        setProfiles(prevProfiles => 
            prevProfiles.map(profile => ({
                ...profile,
                is_default: profile.id === profileId
            }))
        );

        try {
            const response = await fetch('/api/dashboard/payment/set-default', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: profileId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to set default payment profile');
            }

            showAlert({
                title: 'Default Updated',
                message: data.message || 'Default payment profile updated successfully!',
                variant: 'success',
            });
        } catch (error) {
            setProfiles(previousProfiles);
            showAlert({
                title: 'Update Failed',
                message: error instanceof Error ? error.message : 'Failed to set default payment profile',
                variant: 'error',
            });
        } finally {
            setSettingDefaultId(null);
        }
    }, [profiles, showAlert]);

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

            showAlert({
                title: 'Profile Deleted',
                message: 'Payment profile deleted successfully!',
                variant: 'success',
            });
        } catch (error) {
            showAlert({
                title: 'Delete Failed',
                message: error instanceof Error ? error.message : 'Failed to delete payment profile',
                variant: 'error',
            });
            throw error; // Re-throw so the modal can handle it
        }
    }, [showAlert]);

    return (
        <PaymentProfilesList 
            profiles={profiles}
            onSetDefault={handleSetDefault}
            onDelete={handleDelete}
            settingDefaultId={settingDefaultId}
        />
    );
};

export default PaymentProfilesContent;
