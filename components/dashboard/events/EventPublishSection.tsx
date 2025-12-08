"use client";

import React from 'react';
import { Eye, EyeOff, Info } from 'lucide-react';
import { useFormikContext } from 'formik';

const EventPublishSection = () => {
    const { values, setFieldValue } = useFormikContext<any>();

    const handlePublishToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue('is_published', e.target.checked);
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    {values.is_published ? (
                        <Eye className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    ) : (
                        <EyeOff className="w-5 h-5 text-slate-400" aria-hidden="true" />
                    )}
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Publishing Settings
                    </h2>
                    <p className="small-text text-slate-400">
                        Control who can see your event
                    </p>
                </div>
            </div>

            {/* Publish Toggle Card */}
            <div className={`
                p-6 rounded-xl border-2 transition-all duration-300
                ${values.is_published 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : 'bg-slate-500/10 border-slate-500/30'
                }
            `}>
                <label className="flex items-start gap-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={values.is_published || false}
                        onChange={handlePublishToggle}
                        className="w-6 h-6 rounded-lg bg-primary-100 border-2 border-accent text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <p className="big-text-4 font-bold text-white">
                                {values.is_published ? 'Event is Published' : 'Event is Unpublished'}
                            </p>
                            <span className={`
                                px-3 py-1 rounded-lg font-semibold small-text
                                ${values.is_published 
                                    ? 'bg-emerald-500/20 text-emerald-400' 
                                    : 'bg-slate-500/20 text-slate-400'
                                }
                            `}>
                                {values.is_published ? 'Public' : 'Private'}
                            </span>
                        </div>
                        <p className="normal-text-2 text-slate-300 mb-4">
                            {values.is_published 
                                ? 'Your event is visible to everyone and will appear in search results and event listings.'
                                : 'Your event is private and will not appear in search results. Only people with the direct link can view it.'
                            }
                        </p>

                        {/* Features List */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className={`
                                    w-2 h-2 rounded-full
                                    ${values.is_published ? 'bg-emerald-400' : 'bg-slate-400'}
                                `}></div>
                                <p className="small-text text-slate-300">
                                    {values.is_published ? 'Appears in search results' : 'Hidden from search results'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`
                                    w-2 h-2 rounded-full
                                    ${values.is_published ? 'bg-emerald-400' : 'bg-slate-400'}
                                `}></div>
                                <p className="small-text text-slate-300">
                                    {values.is_published ? 'Shown on category pages' : 'Not shown on category pages'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`
                                    w-2 h-2 rounded-full
                                    ${values.is_published ? 'bg-emerald-400' : 'bg-slate-400'}
                                `}></div>
                                <p className="small-text text-slate-300">
                                    {values.is_published ? 'Tickets available for purchase' : 'Tickets available via direct link only'}
                                </p>
                            </div>
                        </div>
                    </div>
                </label>
            </div>

            {/* Info Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Published Info */}
                <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-start gap-2">
                        <Eye className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-emerald-300 font-semibold mb-1">
                                When Published
                            </p>
                            <ul className="small-text-2 text-emerald-300 space-y-1 list-disc list-inside">
                                <li>Event is discoverable by everyone</li>
                                <li>Appears in homepage and listings</li>
                                <li>Can be shared on social media</li>
                                <li>Indexed by search engines</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Unpublished Info */}
                <div className="p-4 bg-slate-500/10 rounded-lg border border-slate-500/20">
                    <div className="flex items-start gap-2">
                        <EyeOff className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-300 font-semibold mb-1">
                                When Unpublished
                            </p>
                            <ul className="small-text-2 text-slate-300 space-y-1 list-disc list-inside">
                                <li>Event hidden from public</li>
                                <li>Only accessible via direct link</li>
                                <li>Perfect for testing or private events</li>
                                <li>Can be published later anytime</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Note */}
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-blue-300 font-semibold mb-1">
                            Important Notes
                        </p>
                        <ul className="small-text-2 text-blue-300 space-y-1 list-disc list-inside">
                            <li>You can change this setting anytime from your event dashboard</li>
                            <li>Unpublishing won&apos;t affect already purchased tickets</li>
                            <li>People who bought tickets can still access event details</li>
                            <li>We recommend unpublishing if you&apos;re not ready to sell tickets yet</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPublishSection;