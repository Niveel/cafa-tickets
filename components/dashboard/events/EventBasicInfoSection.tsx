"use client";

import React from 'react';
import { FileText, Info } from 'lucide-react';
import { AppFormField, CategorySelect } from '@/components';
import { useFormikContext } from 'formik';

const EventBasicInfoSection = () => {
    const { values, setFieldValue } = useFormikContext<any>();

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Basic Information
                    </h2>
                    <p className="small-text text-slate-400">
                        Tell people about your event
                    </p>
                </div>
            </div>

            {/* Event Title */}
            <AppFormField
                name="title"
                label="Event Title"
                placeholder="e.g., Afrobeats Night 2025"
                required
            />

            {/* Category */}
            <div>
                <CategorySelect
                    id="category_slug"
                    value={values.category_slug || ''}
                    onChange={(value) => setFieldValue('category_slug', value)}
                    label="Event Category"
                    placeholder="Select a category"
                    required
                />
            </div>

            {/* Short Description */}
            <AppFormField
                name="short_description"
                label="Short Description"
                placeholder="A brief, catchy summary of your event (20-300 characters)"
                multiline
                rows={2}
                required
            />

            {/* Full Description */}
            <div>
                <AppFormField
                    name="description"
                    label="Full Description"
                    placeholder="Provide detailed information about your event. Markdown supported for formatting..."
                    multiline
                    rows={8}
                    required
                />
                
                {/* Markdown Info */}
                <div className="mt-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-blue-300 font-semibold mb-1">
                                Markdown Formatting Supported
                            </p>
                            <p className="small-text-2 text-blue-300">
                                Use # for headers, **bold**, *italic*, - for lists, [links](url), etc.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventBasicInfoSection;