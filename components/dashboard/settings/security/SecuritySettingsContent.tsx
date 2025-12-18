"use client";

import React from 'react';
import {
    SecuritySettingsHeader,
    ChangePasswordForm,
    ChangeEmailForm,
    ChangeUsernameForm,
    SecurityInfo
} from '@/components';
import { CurrentUser } from '@/types/general.types';

type Props = {
    currentUser: CurrentUser
}

const SecuritySettingsContent = ({ currentUser }: Props) => {

    return (
        <div className="space-y-6">
            {/* Header */}
            <SecuritySettingsHeader />

            {/* Security Info */}
            <SecurityInfo />

            {/* Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Change Password */}
                <ChangePasswordForm />

                {/* Change Email */}
                <ChangeEmailForm />
            </div>

            {/* Change Username */}
            <ChangeUsernameForm currentUser={currentUser} />
        </div>
    );
};

export default SecuritySettingsContent;