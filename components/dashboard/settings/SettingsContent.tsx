"use client";

import React from 'react';
import {
    SettingsHeader,
    SettingsNavigationCards
} from '@/components';

const SettingsContent = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <SettingsHeader />

            {/* Navigation Cards */}
            <SettingsNavigationCards />
        </div>
    );
};

export default SettingsContent;