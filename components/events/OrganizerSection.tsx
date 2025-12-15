"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { User, Calendar, Ticket, TrendingUp, Mail } from 'lucide-react';
import { EventDetails, RecurringEventDetails } from '@/types/events.types';
import { placeholderPic } from '@/data/constants';

interface OrganizerSectionProps {
    event: EventDetails | RecurringEventDetails;
}

const OrganizerSection = ({ event }: OrganizerSectionProps) => {
    const { organizer } = event;

    // Format member since date
    const memberSince = new Date(organizer.member_since).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <section className="relative py-12 sm:py-16 bg-primary">
            <div className="inner-wrapper">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent">
                        <User className="w-6 h-6 text-accent-50" aria-hidden="true" />
                    </div>
                    <h2 className="big-text-1 font-bold text-white">
                        Meet The Organizer
                    </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Organizer Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="relative p-8 bg-linear-to-br from-primary-100 to-primary-200 rounded-2xl border-2 border-accent overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>

                            {/* Content */}
                            <div className="relative space-y-6">
                                {/* Profile Image */}
                                <div className="flex justify-center">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-accent shadow-2xl">
                                        <Image
                                            src={organizer.profile_image || placeholderPic}
                                            alt={organizer.full_name}
                                            fill
                                            className="object-cover bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Name & Username */}
                                <div className="text-center">
                                    <h3 className="big-text-3 font-bold text-white mb-1">
                                        {organizer.full_name}
                                    </h3>
                                    <p className="normal-text text-slate-300">
                                        @{organizer.username}
                                    </p>
                                </div>

                                {/* Bio */}
                                {organizer.bio && (
                                    <p className="normal-text-2 text-slate-200 text-center leading-relaxed">
                                        {organizer.bio}
                                    </p>
                                )}

                                {/* Member Since Badge */}
                                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/50 rounded-lg border border-accent/30">
                                    <Calendar className="w-4 h-4 text-accent-50" aria-hidden="true" />
                                    <span className="small-text text-slate-200">
                                        Member since {memberSince}
                                    </span>
                                </div>

                                {/* Contact Button */}
                                <a
                                    href={`mailto:${organizer.email}`}
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-accent text-white rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300 hover:scale-105"
                                >
                                    <Mail className="w-5 h-5" aria-hidden="true" />
                                    Contact Organizer
                                </a>

                                {/* View Profile Link */}
                                <Link
                                    href={`/organizers/${organizer.username}`}
                                    className="block text-center normal-text-2 text-accent-50 hover:text-accent-100 transition-colors duration-300 font-semibold"
                                >
                                    View Full Profile →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Achievements */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Events Organized */}
                            <div className="relative p-6 bg-primary-100 rounded-xl border border-accent overflow-hidden group hover:border-accent-100 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-300"></div>
                                <div className="relative flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Calendar className="w-7 h-7 text-accent-50" aria-hidden="true" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="normal-text text-slate-300 mb-1">Events Organized</p>
                                        <p className="big-text-1 font-bold text-white">
                                            {organizer.events_organized}
                                        </p>
                                        <p className="small-text text-slate-400 mt-1">
                                            Total successful events
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tickets Sold */}
                            <div className="relative p-6 bg-primary-100 rounded-xl border border-accent overflow-hidden group hover:border-accent-100 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-300"></div>
                                <div className="relative flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Ticket className="w-7 h-7 text-accent-50" aria-hidden="true" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="normal-text text-slate-300 mb-1">Total Tickets Sold</p>
                                        <p className="big-text-1 font-bold text-white">
                                            {organizer.total_tickets_sold.toLocaleString()}
                                        </p>
                                        <p className="small-text text-slate-400 mt-1">
                                            Across all events
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievements/Trust Badges */}
                        <div className="p-6 bg-primary-100 rounded-xl border border-accent">
                            <h3 className="big-text-4 font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                Why Trust This Organizer
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-accent-50 font-bold">✓</span>
                                    </div>
                                    <div>
                                        <p className="normal-text-2 font-bold text-white">Verified Organizer</p>
                                        <p className="small-text text-slate-300">
                                            Identity and credentials verified
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-accent-50 font-bold">✓</span>
                                    </div>
                                    <div>
                                        <p className="normal-text-2 font-bold text-white">Proven Track Record</p>
                                        <p className="small-text text-slate-300">
                                            {organizer.events_organized}+ successful events organized
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-accent-50 font-bold">✓</span>
                                    </div>
                                    <div>
                                        <p className="normal-text-2 font-bold text-white">Secure Payments</p>
                                        <p className="small-text text-slate-300">
                                            All transactions are protected
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-accent-50 font-bold">✓</span>
                                    </div>
                                    <div>
                                        <p className="normal-text-2 font-bold text-white">Customer Support</p>
                                        <p className="small-text text-slate-300">
                                            Dedicated support for attendees
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other Events by Organizer */}
                        <div className="p-6 bg-linear-to-br from-accent/5 to-accent/10 rounded-xl border border-accent">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="big-text-4 font-bold text-white">
                                    More from {organizer.full_name}
                                </h3>
                                <Link
                                    href={`/organizers/${organizer.username}/events`}
                                    className="normal-text-2 text-accent-50 hover:text-accent-100 transition-colors duration-300 font-semibold"
                                >
                                    View All →
                                </Link>
                            </div>
                            <p className="normal-text text-slate-200">
                                Discover other amazing events organized by {organizer.full_name}. 
                                From concerts to conferences, they bring the best experiences to life.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrganizerSection;