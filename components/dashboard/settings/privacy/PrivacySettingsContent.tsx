"use client";

import React from 'react';
import {
    PrivacySettingsHeader,
    PrivacyInfo,
    // DataPrivacySection,
    DeleteAccountSection
} from '@/components';

const PrivacySettingsContent = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <PrivacySettingsHeader />

            {/* Privacy Info */}
            <PrivacyInfo />

            {/* Data Privacy Section */}
            {/* <DataPrivacySection /> */}

            {/* Delete Account Section */}
            <DeleteAccountSection />
        </div>
    );
};

export default PrivacySettingsContent;