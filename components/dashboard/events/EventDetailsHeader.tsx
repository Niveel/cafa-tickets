"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Calendar, MapPin, Edit, Users, Eye, ArrowLeft, Trash2, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';

import { placeholderImage } from '@/data/constants';
import { MyEventDetailsResponse } from '@/types/dash-events.types';

type Props = {
    event: MyEventDetailsResponse;
};

const EventDetailsHeader = ({ event }: Props) => { 
    const router = useRouter();
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Construct the full event URL
    const eventUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/events/${event.slug}`
        : `/events/${event.slug}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(eventUrl);
            setCopied(true);
            
            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };

    const handleDeleteEvent = async () => {
        try {
            setDeleting(true);
            setDeleteError(null);

            console.log('Deleting event:', event.slug);

            const response = await fetch(`/api/dashboard/events/${event.slug}/delete`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message || data.error || 'Failed to delete event';
                throw new Error(errorMessage);
            }

            console.log('Event deleted successfully');
            router.push('/dashboard/events');

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error deleting event:', error.message);
                setDeleteError(error.message);
            } else {
                console.error('Error deleting event:', error);
                setDeleteError('Failed to delete event. Please try again.');
            }
        } finally {
            setDeleting(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'ongoing':
                return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'past':
                return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
            default:
                return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div role="region" aria-label="Event header" className="bg-primary rounded-xl border-2 border-accent/30 overflow-hidden">
            {/* Header with Back & Edit */}
            <div className="flex items-center justify-between p-2">
                <Link
                    href="/dashboard/events"
                    className="inline-flex items-center gap-2 text-accent-50 hover:text-accent-100 transition-colors normal-text-2 font-semibold"
                >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Back to My Events
                </Link>

                <div className="flex flex-wrap gap-3">
                    <Link
                        href={`/dashboard/events/${event.slug}/edit`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold normal-text-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Edit event details"
                    >
                        <Edit className="w-4 h-4" aria-hidden="true" />
                        Edit Event
                    </Link>

                    <button
                        onClick={() => setDeleteConfirm(true)}
                        disabled={deleting}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold normal-text-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Delete event"
                    >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                        Delete Event
                    </button>
                </div>
            </div>

            {/* Shareable Link Banner */}
            <div className="px-2 pb-4">
                <div className="bg-primary-200 border-2 border-accent/30 rounded-xl p-2">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 bg-primary rounded-lg px-4 py-2 border border-accent/20">
                                <ExternalLink className="w-4 h-4 text-accent-50 shrink-0" aria-hidden="true" />
                                <input
                                    id="event-url"
                                    type="text"
                                    readOnly
                                    value={eventUrl}
                                    className="flex-1 bg-transparent text-slate-300 normal-text-2 outline-none select-all"
                                    aria-label="Event public URL"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleCopyLink}
                            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                                copied
                                    ? 'bg-green-500 text-white focus:ring-green-400'
                                    : 'bg-accent text-white hover:bg-accent-50 focus:ring-accent'
                            }`}
                            aria-label={copied ? 'Link copied to clipboard' : 'Copy event link to clipboard'}
                            aria-live="polite"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" aria-hidden="true" />
                                    <span className="hidden sm:inline">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" aria-hidden="true" />
                                    <span className="hidden sm:inline">Copy Link</span>
                                </>
                            )}
                        </button>
                    </div>
                    <p className="small-text text-slate-400 mt-2">
                        Share this link with attendees so they can view details and purchase tickets
                    </p>
                </div>
            </div>

            {/* Event Image */}
            <div className="relative h-64 md:h-96 overflow-hidden">
                <Image
                    src={event.featured_image || placeholderImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                />

                {/* Status & Published Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-lg font-semibold small-text border capitalize ${getStatusBadge(event.status)}`}>
                        {event.status}
                    </span>
                    {!event.is_published && (
                        <span className="px-3 py-1 rounded-lg font-semibold small-text border bg-amber-500/20 text-amber-400 border-amber-500/30">
                            Unpublished
                        </span>
                    )}
                    {event.is_recurring && (
                        <span className="px-3 py-1 rounded-lg font-semibold small-text border bg-purple-500/20 text-purple-400 border-purple-500/30">
                            Recurring
                        </span>
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/50 to-transparent"></div>

                {/* Event Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="small-text text-accent-50 font-semibold mb-2">
                        {event.category.name}
                    </p>
                    <h1 className="big-text-1 font-bold text-white mb-4">
                        {event.title}
                    </h1>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-slate-300" aria-hidden="true" />
                            <p className="big-text-5 text-slate-200">
                                {formatDate(event.start_date)}
                                {event.start_date !== event.end_date && ` - ${formatDate(event.end_date)}`}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-slate-300" aria-hidden="true" />
                            <p className="big-text-5 text-slate-200">
                                {event.venue_name}, {event.venue_city}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-accent/30">
                <div className="flex flex-wrap gap-3">
                    <Link
                        href={`/dashboard/events/${event.slug}/attendees`}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold normal-text-2 hover:bg-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        aria-label="View event attendees"
                    >
                        <Users className="w-4 h-4" aria-hidden="true" />
                        View Attendees
                    </Link>

                    <Link
                        href={`/events/${event.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-primary-200 text-white rounded-xl font-semibold normal-text-2 hover:bg-primary transition-all duration-300 border-2 border-accent/30 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label="View public event page in new tab"
                    >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                        View Public Page
                    </Link>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-event-title"
                    onClick={(e) => {
                        if (e.target === e.currentTarget && !deleting) {
                            setDeleteConfirm(false);
                            setDeleteError(null);
                        }
                    }}
                >
                    <div className="bg-primary rounded-xl border-2 border-accent/30 p-6 max-w-md w-full animate-fade-in">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                                <h2 id="delete-event-title" className="big-text-4 font-bold text-red-400 mb-2">
                                    Delete Event?
                                </h2>
                                <p className="normal-text text-slate-300 mb-1">
                                    Are you sure you want to delete <strong className="text-white">&quot;{event.title}&quot;</strong>?
                                </p>
                                <p className="small-text text-slate-400">
                                    This action cannot be undone. All tickets, attendees, and analytics data will be permanently deleted.
                                </p>
                            </div>
                        </div>

                        {deleteError && (
                            <div className="mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20" role="alert">
                                <p className="small-text text-red-400">
                                    {deleteError}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDeleteEvent}
                                disabled={deleting}
                                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold normal-text-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400"
                                aria-label="Confirm delete event"
                            >
                                {deleting ? 'Deleting...' : 'Yes, Delete Event'}
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteConfirm(false);
                                    setDeleteError(null);
                                }}
                                disabled={deleting}
                                className="flex-1 px-4 py-3 bg-primary-200 hover:bg-primary-100 text-white rounded-xl font-semibold normal-text-2 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
                                aria-label="Cancel delete"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetailsHeader;