"use client";

import React from 'react';
import {
    PrivacySettingsHeader,
    PrivacyInfo,
    DeleteAccountSection
} from '@/components';

const PrivacySettingsContent = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <PrivacySettingsHeader />

            {/* Privacy Info */}
            <PrivacyInfo />

            {/* Delete Account Section */}
            <DeleteAccountSection />
        </div>
    );
};

export default PrivacySettingsContent;