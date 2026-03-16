"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, CheckCircle, Download, Eye, Loader2 } from 'lucide-react';

import { placeholderImage } from '@/data/constants';
import { MyTicket } from '@/types/tickets.types';
import { sanitizeImageUrl } from '@/utils/sanitizeEventData';
import { useAlertModal } from '@/contexts/AlertModalContext';

type Props = {
    ticket: MyTicket;
};

const MyTicketCard = ({ ticket }: Props) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const { showAlert } = useAlertModal();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-GH', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (time: string) => {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-GH', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        const colors = {
            active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            used: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
            cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
        };
        return colors[status as keyof typeof colors] || colors.active;
    };

    const getStatusLabel = (status: string) => {
        const labels = {
            active: 'Active',
            used: 'Used',
            cancelled: 'Cancelled'
        };
        return labels[status as keyof typeof labels] || status;
    };

    const getEventStatusColor = (status: string) => {
        const colors = {
            upcoming: 'bg-blue-500/20 text-blue-400',
            ongoing: 'bg-amber-500/20 text-amber-400',
            past: 'bg-slate-500/20 text-slate-400'
        };
        return colors[status as keyof typeof colors] || colors.upcoming;
    };

    const handleDownload = async () => {
        setIsDownloading(true);

        try {
            const response = await fetch(`/api/dashboard/tickets/download?ticketId=${ticket.ticket_id}`);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to download ticket');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ticket-${ticket.ticket_id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
            showAlert({
                title: 'Download Failed',
                message: error instanceof Error ? error.message : 'Failed to download ticket',
                variant: 'error',
            });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="group bg-primary rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300 overflow-hidden">
            {/* Event Image */}
            <div className="relative h-48 bg-primary-200">
                <Image
                    src={sanitizeImageUrl(ticket.event.featured_image) || placeholderImage}
                    alt={ticket.event.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/50 to-transparent"></div>

                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-3 py-1 rounded-lg font-semibold small-text border ${getEventStatusColor(ticket.event.status)}`}>
                        {ticket.event.status}
                    </span>
                    <span className={`px-3 py-1 rounded-lg font-semibold small-text border ${getStatusColor(ticket.status)}`}>
                        {getStatusLabel(ticket.status)}
                    </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm text-white rounded-lg small-text font-semibold border border-accent/30">
                        {ticket.event.category.name}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-2 space-y-2">
                {/* Event Title */}
                <div>
                    <Link
                        href={`/events/${ticket.event.slug}`}
                        className="big-text-3 font-bold text-white hover:text-accent-50 transition-colors"
                    >
                        {ticket.event.title}
                    </Link>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400">Date</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {formatDate(ticket.event.start_date)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400">Time</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {formatTime(ticket.event.start_time)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 col-span-2">
                        <MapPin className="w-4 h-4 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-slate-400">Venue</p>
                            <p className="normal-text-2 text-white font-semibold">
                                {ticket.event.venue_name}, {ticket.event.venue_city}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-accent py-1"></div>

                {/* Ticket Info */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="small-text text-slate-400">Ticket Type</p>
                        <p className="big-text-4 font-bold text-white">
                            {ticket.ticket_type.name}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="small-text text-slate-400">Amount Paid</p>
                        <p className="big-text-4 font-bold text-emerald-400">
                            GH₵ {parseFloat(ticket.amount_paid).toLocaleString('en-GH')}
                        </p>
                    </div>
                </div>

                {/* Check-in Status */}
                {ticket.is_checked_in && (
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                            <div>
                                <p className="normal-text-2 text-emerald-400 font-semibold">
                                    Checked In
                                </p>
                                <p className="small-text text-emerald-300">
                                    {ticket.checked_in_at && formatDate(ticket.checked_in_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Attendee Info */}
                <div className="p-3 bg-primary-200 rounded-lg">
                    <p className="small-text text-slate-400 mb-1">Attendee</p>
                    <p className="normal-text-2 text-white font-semibold">
                        {ticket.attendee_info.name}
                    </p>
                    <p className="small-text text-slate-400 font-mono">
                        {ticket.ticket_id}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                    <Link
                        href={`/dashboard/tickets/${ticket.ticket_id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text-2 transition-colors"
                    >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                        View Details
                    </Link>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold normal-text-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Download ticket"
                    >
                        {isDownloading ? (
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        ) : (
                            <Download className="w-4 h-4" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyTicketCard;
