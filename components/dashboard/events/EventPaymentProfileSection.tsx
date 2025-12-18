"use client";

import React from 'react';
import Link from 'next/link';
import { Wallet, Info, AlertCircle, Plus, CheckCircle, Smartphone, Building2 } from 'lucide-react';
import { useFormikContext } from 'formik';

import { PaymentProfile } from "@/types/payments.types";

type Props = {
    paymentProfiles: PaymentProfile[]; // Required, not optional
}

const EventPaymentProfileSection = ({ paymentProfiles }: Props) => { 
    const { values, setFieldValue, errors, touched } = useFormikContext<any>();

    // Filter for verified profiles only
    const verifiedProfiles = paymentProfiles.filter(p => p.is_verified);
    const hasVerifiedProfiles = verifiedProfiles.length > 0;
    const defaultProfile = verifiedProfiles.find(p => p.is_default);

    // Set default payment profile on mount if not already set
    React.useEffect(() => {
        if (!values.payment_profile_id && defaultProfile) {
            setFieldValue('payment_profile_id', defaultProfile.id);
        }
    }, [defaultProfile, setFieldValue, values.payment_profile_id]);

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Payment Profile
                    </h2>
                    <p className="small-text text-slate-400">
                        Select where you want to receive ticket revenue
                    </p>
                </div>
            </div>

            {/* No Verified Profiles Warning */}
            {!hasVerifiedProfiles && (
                <div className="p-5 bg-red-500/10 rounded-xl border-2 border-red-500/30">
                    <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="w-6 h-6 text-red-400 shrink-0" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="big-text-5 font-bold text-red-400 mb-2">
                                No Verified Payment Profile
                            </p>
                            <p className="small-text text-red-300 mb-4">
                                You need at least one verified payment profile to create an event. 
                                Ticket revenue will be automatically transferred to your selected profile after each purchase.
                            </p>
                            <Link
                                href="/dashboard/payments/profiles/create"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                            >
                                <Plus className="w-4 h-4" aria-hidden="true" />
                                Create Payment Profile
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Verified Profiles List */}
            {hasVerifiedProfiles && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="normal-text-2 text-slate-300 font-semibold">
                            Select Payment Profile
                        </p>
                        <Link
                            href="/dashboard/payments/profiles"
                            className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors small-text font-semibold"
                        >
                            Manage Profiles
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {verifiedProfiles.map((profile) => {
                            // Extract account details based on method
                            const accountDetails = profile.account_details as any;
                            const isMobileMoney = profile.method === 'mobile_money';
                            
                            return (
                                <label
                                    key={profile.id}
                                    className={`
                                        flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300
                                        ${values.payment_profile_id === profile.id
                                            ? 'bg-accent/20 border-accent'
                                            : 'bg-primary-200 border-accent/30 hover:border-accent/50'
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        name="payment_profile_id"
                                        value={profile.id}
                                        checked={values.payment_profile_id === profile.id}
                                        onChange={(e) => setFieldValue('payment_profile_id', e.target.value)}
                                        className="w-5 h-5 text-accent focus:ring-2 focus:ring-accent mt-0.5 cursor-pointer"
                                    />

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {/* Method Icon */}
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                isMobileMoney ? 'bg-blue-500/20' : 'bg-purple-500/20'
                                            }`}>
                                                {isMobileMoney ? (
                                                    <Smartphone className="w-4 h-4 text-blue-400" aria-hidden="true" />
                                                ) : (
                                                    <Building2 className="w-4 h-4 text-purple-400" aria-hidden="true" />
                                                )}
                                            </div>

                                            {/* Profile Name */}
                                            <p className="normal-text-2 font-bold text-white">
                                                {profile.name}
                                            </p>

                                            {/* Default Badge */}
                                            {profile.is_default && (
                                                <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent-50 small-text-2 font-semibold">
                                                    Default
                                                </span>
                                            )}

                                            {/* Selected Indicator */}
                                            {values.payment_profile_id === profile.id && (
                                                <CheckCircle className="w-5 h-5 text-accent-50 ml-auto" aria-hidden="true" />
                                            )}
                                        </div>

                                        {/* Account Details */}
                                        <div className="space-y-1">
                                            {isMobileMoney ? (
                                                <>
                                                    <p className="small-text text-slate-400">
                                                        Network: <span className="text-slate-300 font-semibold">{accountDetails?.network}</span>
                                                    </p>
                                                    <p className="small-text text-slate-400">
                                                        Number: <span className="text-slate-300 font-mono">{accountDetails?.mobile_number}</span>
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="small-text text-slate-400">
                                                        Bank: <span className="text-slate-300 font-semibold">{accountDetails?.bank_name}</span>
                                                    </p>
                                                    <p className="small-text text-slate-400">
                                                        Account: <span className="text-slate-300 font-mono">{accountDetails?.account_number}</span>
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </label>
                            );
                        })}
                    </div>

                    {/* Error Message */}
                    {touched.payment_profile_id && errors.payment_profile_id && (
                        <div className="flex items-start gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20" role="alert">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="small-text text-red-400">{errors.payment_profile_id as string}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Info Note */}
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-blue-300 font-semibold mb-1">
                            How Payment Works
                        </p>
                        <ul className="small-text-2 text-blue-300 space-y-1 list-disc list-inside">
                            <li>Ticket revenue is automatically transferred to your selected profile</li>
                            <li>Platform fees (5%) are deducted before transfer</li>
                            <li>Payments are sent immediately after each ticket purchase</li>
                            <li>You can change the payment profile later in event settings</li>
                            <li>Only verified profiles can receive payments</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPaymentProfileSection;