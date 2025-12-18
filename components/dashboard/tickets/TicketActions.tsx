"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { TicketDetails } from '@/types/tickets.types';
import { Download, Eye, Share2, Loader2, CheckCircle } from 'lucide-react';

type Props = {
    ticket: TicketDetails;
};

const TicketActions = ({ ticket }: Props) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        setDownloadSuccess(false);

        try {
            const response = await fetch(`/api/dashboard/tickets/download?ticketId=${ticket.ticket_id}`);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to download ticket');
            }

            // Create blob from response
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ticket-${ticket.ticket_id}.pdf`;
            document.body.appendChild(a);
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setDownloadSuccess(true);
            setTimeout(() => setDownloadSuccess(false), 3000);
        } catch (error) {
            console.error('Download failed:', error);
            alert(error instanceof Error ? error.message : 'Failed to download ticket');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: ticket.event.title,
                text: `Check out my ticket for ${ticket.event.title}!`,
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="space-y-3">
            {/* Download PDF */}
            <button
                onClick={handleDownload}
                disabled={isDownloading || downloadSuccess}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold big-text-5 transition-all duration-300 border-2 border-accent hover:border-accent-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isDownloading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        Downloading...
                    </>
                ) : downloadSuccess ? (
                    <>
                        <CheckCircle className="w-5 h-5" aria-hidden="true" />
                        Downloaded!
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5" aria-hidden="true" />
                        Download PDF
                    </>
                )}
            </button>

            {/* View Event */}
            <Link
                href={`/events/${ticket.event.slug}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold big-text-5 transition-all duration-300"
            >
                <Eye className="w-5 h-5" aria-hidden="true" />
                View Event Details
            </Link>

            {/* Share Ticket */}
            <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-200 hover:bg-primary-100 text-white rounded-xl font-semibold big-text-5 transition-all duration-300 border-2 border-accent/30 hover:border-accent"
            >
                <Share2 className="w-5 h-5" aria-hidden="true" />
                Share Ticket
            </button>
        </div>
    );
};

export default TicketActions;