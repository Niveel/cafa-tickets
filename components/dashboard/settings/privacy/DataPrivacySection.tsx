"use client";

import React, { useState } from 'react';
import { Download, Loader2, CheckCircle } from 'lucide-react';

const DataPrivacySection = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    const handleDownloadData = async () => {
        setIsDownloading(true);
        setDownloadSuccess(false);

        try {
            // Simulate API call to generate data export
            console.log('Requesting data export...');
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In production: Download file
            // const response = await fetch('/api/v1/users/export-data/');
            // const blob = await response.blob();
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = 'my-data-export.zip';
            // a.click();

            setDownloadSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setDownloadSuccess(false), 3000);

        } catch (err: any) {
            console.error('Failed to download data:', err);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="flex-1">
                    <h2 className="big-text-4 font-bold text-white mb-2">
                        Download Your Data
                    </h2>
                    <p className="normal-text-2 text-slate-300 mb-4">
                        Export a copy of all your personal information, including profile details, tickets purchased, and events created.
                    </p>

                    {downloadSuccess && (
                        <div className="mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                                <p className="small-text text-emerald-400">
                                    Data export started! You&apos;ll receive a download link via email shortly.
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleDownloadData}
                        disabled={isDownloading}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 rounded-lg font-semibold normal-text-2 transition-all border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                Preparing Export...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" aria-hidden="true" />
                                Download My Data
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="small-text text-blue-300">
                    💡 Your data will be exported in JSON format and may take a few minutes to prepare. Large exports will be sent via email.
                </p>
            </div>
        </div>
    );
};

export default DataPrivacySection;