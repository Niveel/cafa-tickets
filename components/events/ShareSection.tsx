"use client";

import React, { useState, useEffect } from 'react';
import { Share2, Facebook, Twitter, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

import { EventDetails, RecurringEventDetails } from '@/types/events.types';

interface ShareSectionProps {
    event: EventDetails | RecurringEventDetails;
}

const ShareSection = ({ event }: ShareSectionProps) => {
    const [copied, setCopied] = useState<boolean>(false);
    const [currentUrl, setCurrentUrl] = useState<string>('');

    // ✅ Set URL only on client side
    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareButtons = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: event.share_urls.facebook,
            color: 'from-blue-600 to-blue-700',
            bgColor: 'bg-blue-600/20',
            textColor: 'text-blue-400'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: event.share_urls.twitter,
            color: 'from-sky-500 to-sky-600',
            bgColor: 'bg-sky-500/20',
            textColor: 'text-sky-400'
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            url: event.share_urls.whatsapp,
            color: 'from-green-600 to-green-700',
            bgColor: 'bg-green-600/20',
            textColor: 'text-green-400'
        },
        {
            name: 'Email',
            icon: Mail,
            url: event.share_urls.email,
            color: 'from-slate-600 to-slate-700',
            bgColor: 'bg-slate-600/20',
            textColor: 'text-slate-400'
        }
    ];

    return (
        <section className="relative py-8 bg-primary-100">
            <div className="inner-wrapper">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center space-y-2 mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 border border-accent mb-4">
                            <Share2 className="w-8 h-8 text-accent-50" aria-hidden="true" />
                        </div>
                        <h2 className="big-text-1 font-bold text-white">
                            Share This Event
                        </h2>
                        <p className="big-text-5 text-slate-200">
                            Spread the word! Help your friends discover this amazing event.
                        </p>
                    </div>

                    {/* Share Buttons Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {shareButtons.map((button) => {
                            const Icon = button.icon;
                            return (

                                <Link key={button.name}
                                    href={button.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative p-4 bg-primary rounded-xl border-2 border-accent/20 hover:border-accent transition-all duration-300 hover:scale-105 overflow-hidden`}
                                >
                                    {/* Background Glow */}
                                    <div className={`absolute inset-0 ${button.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                    {/* Content */}
                                    <div className="relative flex flex-col items-center gap-3">
                                        <div className={`w-14 h-14 rounded-xl ${button.bgColor} border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={`w-7 h-7 ${button.textColor}`} aria-hidden="true" />
                                        </div>
                                        <span className="normal-text font-bold text-white">
                                            {button.name}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Copy Link Section */}
                    <div className="p-4 bg-primary rounded-xl border border-accent">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-3 p-4 bg-primary-100 rounded-lg border border-accent/30">
                                    <LinkIcon className="w-5 h-5 text-accent-50 shrink-0" aria-hidden="true" />
                                    <input
                                        type="text"
                                        value={currentUrl}
                                        readOnly
                                        className="flex-1 bg-transparent text-slate-200 normal-text-2 outline-none"
                                        onClick={(e) => e.currentTarget.select()}
                                        placeholder="Loading URL..."
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleCopyLink}
                                disabled={!currentUrl}
                                className={`shrink-0 px-8 py-3 rounded-xl font-bold normal-text transition-all duration-300 hover:scale-105 flex items-center gap-2 border-2 disabled:opacity-50 disabled:cursor-not-allowed ${copied
                                        ? 'bg-green-600 border-green-600 text-white'
                                        : 'bg-accent border-accent text-white hover:bg-accent-100'
                                    }`}
                                type="button"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5" aria-hidden="true" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <LinkIcon className="w-5 h-5" aria-hidden="true" />
                                        Copy Link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Share Stats (Optional) */}
                    <div className="mt-4 text-center">
                        <p className="small-text text-slate-400">
                            Help us reach more people by sharing this event with your network
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShareSection;