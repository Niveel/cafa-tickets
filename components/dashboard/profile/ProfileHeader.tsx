import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Phone, Calendar, CheckCircle, Edit } from 'lucide-react';

import { CurrentUser } from '@/types/general.types';
import { placeholderPic } from '@/data/constants';

type Props = {
    user: CurrentUser;
};

const ProfileHeader = ({ user }: Props) => {
    const memberSince = new Date(user.date_joined);
    const lastLogin = new Date(user.last_login || user.date_joined);
    
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GH', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const getTimeSince = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return formatDate(date);
    };

    return (
        <div role="region" aria-label="Profile header" className="bg-primary rounded-xl p-4 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center lg:items-start gap-4">
                    <div className="relative group">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden ring-4 ring-accent group-hover:ring-accent transition-all duration-300 bg-white">
                            <Image
                                src={user.profile_image || placeholderPic}
                                alt={`${user.full_name}'s profile picture`}
                                width={160}
                                height={160}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        {user.is_email_verified && (
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-primary">
                                <CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
                                <span className="sr-only">Verified user</span>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/dashboard/profile/edit"
                        className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300 hover:scale-[1.02]"
                    >
                        <Edit className="w-4 h-4" aria-hidden="true" />
                        Edit Profile
                    </Link>
                </div>

                {/* User Info Section */}
                <div className="flex-1 space-y-6">
                    {/* Name & Username */}
                    <div>
                        <h1 className="big-text-1 font-bold text-white mb-2">
                            {user.full_name}
                        </h1>
                        <p className="big-text-5 text-accent-50 font-semibold">
                            @{user.username}
                        </p>
                        {user.is_email_verified && (
                            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                                <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                                <span className="small-text text-emerald-400 font-semibold">
                                    Verified Account
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    {user.bio && (
                        <div className="bg-primary-100 rounded-xl p-4 border border-accent/20">
                            <p className="normal-text text-slate-200 italic">
                                &quot;{user.bio}&quot;
                            </p>
                        </div>
                    )}

                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-primary-200 rounded-xl border border-accent/20">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-blue-400" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="small-text text-slate-400 mb-0.5">Email</p>
                                <p className="normal-text-2 text-white font-medium truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-primary-200 rounded-xl border border-accent/20">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="small-text text-slate-400 mb-0.5">Phone</p>
                                <p className="normal-text-2 text-white font-medium">
                                    {user.phone_number}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-primary-200 rounded-xl border border-accent/20">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-purple-400" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="small-text text-slate-400 mb-0.5">Location</p>
                                <p className="normal-text-2 text-white font-medium">
                                    {user.city}, {user.country}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-primary-200 rounded-xl border border-accent/20">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                                <Calendar className="w-5 h-5 text-amber-400" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="small-text text-slate-400 mb-0.5">Member Since</p>
                                <p className="normal-text-2 text-white font-medium">
                                    {formatDate(memberSince)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Last Login */}
                    <div className="flex items-center gap-2 text-slate-400">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <p className="small-text">
                            Last active: <span className="text-slate-300 font-semibold">
                                {getTimeSince(lastLogin)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;