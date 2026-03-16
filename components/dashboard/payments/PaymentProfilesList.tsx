"use client";

import React from 'react';
import Link from 'next/link';
import { Smartphone, Building2, CheckCircle, Clock, XCircle, Edit, Trash2, Star, Plus, AlertTriangle } from 'lucide-react';
import { PaymentProfile } from '@/types/payments.types';
import { Modal } from '@/components';

type Props = {
    profiles: PaymentProfile[];
    onSetDefault: (profileId: string) => Promise<void>;
    onDelete: (profileId: string) => void;
    settingDefaultId?: string | null;
};

const PaymentProfilesList = ({ profiles, onSetDefault, onDelete, settingDefaultId = null }: Props) => {
    const [deletingId, setDeletingId] = React.useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [profileToDelete, setProfileToDelete] = React.useState<{ id: string; name: string } | null>(null);

    const getMethodIcon = (method: string) => {
        if (method === 'mobile_money') return Smartphone;
        if (method === 'bank_transfer') return Building2;
        return Smartphone;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'verified':
                return {
                    icon: CheckCircle,
                    text: 'Verified',
                    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                };
            case 'pending_verification':
                return {
                    icon: Clock,
                    text: 'Pending',
                    className: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                };
            case 'verification_failed':
                return {
                    icon: XCircle,
                    text: 'Failed',
                    className: 'bg-red-500/20 text-red-400 border-red-500/30'
                };
            default:
                return {
                    icon: Clock,
                    text: status,
                    className: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                };
        }
    };

    const handleDeleteClick = (profileId: string, profileName: string) => {
        setProfileToDelete({ id: profileId, name: profileName });
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (profileToDelete) {
            setDeletingId(profileToDelete.id);
            setTimeout(() => {
                onDelete(profileToDelete.id);
                setDeletingId(null);
                setShowDeleteModal(false);
                setProfileToDelete(null);
            }, 500);
        }
    };

    if (profiles.length === 0) {
        return (
            <div role="region" aria-label="Payment profiles" className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="w-10 h-10 text-accent-50" aria-hidden="true" />
                </div>
                <h2 className="big-text-3 font-bold text-white mb-3">
                    No Payment Profiles Yet
                </h2>
                <p className="normal-text text-slate-300 mb-6 max-w-md mx-auto">
                    Add a payment profile to receive revenue from your event ticket sales directly to your account.
                </p>
                <Link
                    href="/dashboard/payments/profiles/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                    Create Payment Profile
                </Link>
            </div>
        );
    }

    return (
        <>
            <div role="region" aria-label="Payment profiles" className="space-y-4">
                {profiles.map((profile) => {
                    const MethodIcon = getMethodIcon(profile.method);
                    const statusBadge = getStatusBadge(profile.status);
                    const StatusIcon = statusBadge.icon;
                    const isDeleting = deletingId === profile.id;
                    const isSettingDefault = settingDefaultId === profile.id;

                    return (
                        <div 
                            key={profile.id}
                            className={`bg-primary rounded-xl p-6 border-2 transition-all duration-300 ${
                                profile.is_default 
                                    ? 'border-accent ring-2 ring-accent/30' 
                                    : 'border-accent/30 hover:border-accent'
                            } ${isDeleting ? 'opacity-50' : ''}`}
                        >
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Icon & Main Info */}
                                <div className="flex items-start gap-4 flex-1">
                                    <div className={`w-16 h-16 rounded-xl ${
                                        profile.method === 'mobile_money' 
                                            ? 'bg-blue-500/20' 
                                            : 'bg-purple-500/20'
                                    } flex items-center justify-center shrink-0`}>
                                        <MethodIcon className={`w-8 h-8 ${
                                            profile.method === 'mobile_money' 
                                                ? 'text-blue-400' 
                                                : 'text-purple-400'
                                        }`} aria-hidden="true" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-3 mb-3 flex-wrap">
                                            <h3 className="big-text-4 font-bold text-white">
                                                {profile.name}
                                            </h3>
                                            {profile.is_default && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/20 text-accent-50 rounded-lg font-semibold small-text border border-accent/30">
                                                    <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                                                    Default
                                                </span>
                                            )}
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg font-semibold small-text border ${statusBadge.className}`}>
                                                <StatusIcon className="w-4 h-4" aria-hidden="true" />
                                                {statusBadge.text}
                                            </div>
                                        </div>

                                        {profile.description && (
                                            <p className="normal-text-2 text-slate-300 mb-4">
                                                {profile.description}
                                            </p>
                                        )}

                                        {/* Account Details */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {profile.method === 'mobile_money' ? (
                                                <>
                                                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                                        <p className="small-text text-slate-400 mb-1">Mobile Number</p>
                                                        <p className="normal-text-2 text-white font-mono">
                                                            {profile.account_details.mobile_number}
                                                        </p>
                                                    </div>
                                                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                                        <p className="small-text text-slate-400 mb-1">Network</p>
                                                        <p className="normal-text-2 text-white font-semibold">
                                                            {profile.account_details.network}
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                                        <p className="small-text text-slate-400 mb-1">Account Number</p>
                                                        <p className="normal-text-2 text-white font-mono">
                                                            {profile.account_details.account_number}
                                                        </p>
                                                    </div>
                                                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                                        <p className="small-text text-slate-400 mb-1">Bank</p>
                                                        <p className="normal-text-2 text-white font-semibold">
                                                            {profile.account_details.bank_name}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                            <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                                <p className="small-text text-slate-400 mb-1">Account Name</p>
                                                <p className="normal-text-2 text-white font-semibold">
                                                    {profile.account_details.account_name}
                                                </p>
                                            </div>
                                            <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                                                <p className="small-text text-slate-400 mb-1">Transaction Fee</p>
                                                <p className="normal-text-2 text-accent-50 font-bold">
                                                    {profile.fee_percentage}%
                                                </p>
                                            </div>
                                        </div>

                                        {/* Verification Date */}
                                        {profile.verified_at && (
                                            <p className="small-text text-slate-400 mt-3">
                                                Verified on {new Date(profile.verified_at).toLocaleDateString('en-GH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex lg:flex-col gap-2">
                                    {!profile.is_default && profile.is_verified && (
                                        <button
                                            type="button"
                                            onClick={() => onSetDefault(profile.id)}
                                            disabled={isDeleting || settingDefaultId !== null}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-accent/20 text-accent-50 rounded-lg font-semibold normal-text-2 hover:bg-accent/30 transition-all duration-300 border border-accent/30 disabled:opacity-50 whitespace-nowrap"
                                        >
                                            {isSettingDefault ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-accent-50 border-t-transparent rounded-full animate-spin" />
                                                    Setting...
                                                </>
                                            ) : (
                                                <>
                                                    <Star className="w-4 h-4" aria-hidden="true" />
                                                    Set Default
                                                </>
                                            )}
                                        </button>
                                    )}
                                    
                                    <Link
                                        href={`/dashboard/payments/profiles/${profile.id}/edit`}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-semibold normal-text-2 hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/30 whitespace-nowrap"
                                    >
                                        <Edit className="w-4 h-4" aria-hidden="true" />
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteClick(profile.id, profile.name)}
                                        disabled={profile.is_default || isDeleting}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-semibold normal-text-2 hover:bg-red-500/30 transition-all duration-300 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                        title={profile.is_default ? 'Cannot delete default profile' : 'Delete profile'}
                                    >
                                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Verification Failed Message */}
                            {profile.status === 'failed' && (
                                <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                                    <p className="small-text text-red-300">
                                        ⚠️ Verification failed. Please check your account details and try creating a new profile.
                                    </p>
                                </div>
                            )}

                            {/* Pending Verification Message */}
                            {profile.status === 'pending' && (
                                <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                    <p className="small-text text-amber-300">
                                        ⏳ Verification in progress. This usually takes 1-2 minutes. We&apos;ll notify you once complete.
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Payment Profile"
                size="sm"
                footer={
                    <>
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            disabled={deletingId !== null}
                            className="px-4 py-2 rounded-xl border-2 border-accent text-accent-50 hover:bg-accent hover:text-white transition-all duration-300 font-semibold normal-text disabled:opacity-50 disabled:cursor-not-allowed"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            disabled={deletingId !== null}
                            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all duration-300 font-semibold normal-text disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            type="button"
                        >
                            {deletingId !== null ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </>
                            )}
                        </button>
                    </>
                }
            >
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-400" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="big-text-5 text-white font-semibold mb-2">
                            Are you sure you want to delete &quot;{profileToDelete?.name}&quot;?
                        </p>
                        <p className="normal-text text-slate-300">
                            This action cannot be undone. This payment profile will be permanently removed.
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PaymentProfilesList;
