"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Edit, Trash2, Eye, Ticket, DollarSign } from 'lucide-react';
import { MyEventsResponse } from '@/types/dash-events.types';

type Event = MyEventsResponse['results'][0];

type Props = {
    event: Event;
    onDelete: (eventId: number, eventTitle: string) => void;
};

const MyEventCard = ({ event, onDelete }: Props) => {
    const [isDeleting, setIsDeleting] = React.useState(false);

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
            month: 'short',
            day: 'numeric'
        });
    };

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${event.title}"? This action cannot be undone.`)) {
            setIsDeleting(true);
            setTimeout(() => {
                onDelete(event.id, event.title);
            }, 500);
        }
    };

    const salesPercentage = event.analytics.sales_percentage;
    const ticketsSold = event.analytics.tickets_sold;
    const totalTickets = event.analytics.total_tickets;

    return (
        <div 
            className={`group relative bg-primary rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300 overflow-hidden ${
                isDeleting ? 'opacity-50' : ''
            }`}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={event.featured_image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Status & Published Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-lg font-semibold small-text border capitalize ${getStatusBadge(event.status)}`}>
                        {event.status}
                    </span>
                    {!event.is_published && (
                        <span className="px-3 py-1 rounded-lg font-semibold small-text border bg-amber-500/20 text-amber-400 border-amber-500/30">
                            Unpublished
                        </span>
                    )}
                </div>

                {/* Action Buttons - Show on hover (desktop) or always (mobile/tablet) */}
                <div className="absolute top-3 right-3 flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-300 z-10">
                    <Link
                        href={`/dashboard/events/${event.slug}/edit`}
                        className="w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Edit event"
                    >
                        <Edit className="w-5 h-5 text-white" aria-hidden="true" />
                    </Link>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-10 h-10 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400"
                        aria-label="Delete event"
                    >
                        <Trash2 className="w-5 h-5 text-white" aria-hidden="true" />
                    </button>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-2">
                {/* Category */}
                <p className="small-text text-accent-50 font-semibold mb-2">
                    {event.category.name}
                </p>

                {/* Title */}
                <Link 
                    href={`/dashboard/events/${event.slug}`}
                    className="block big-text-4 font-bold text-white hover:text-accent-50 transition-colors mb-3 line-clamp-2"
                >
                    {event.title}
                </Link>

                {/* Date & Location */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" aria-hidden="true" />
                        <p className="normal-text-2 text-slate-300">
                            {formatDate(event.start_date)}
                            {event.start_date !== event.end_date && ` - ${formatDate(event.end_date)}`}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" aria-hidden="true" />
                        <p className="normal-text-2 text-slate-300">
                            {event.venue_name}, {event.venue_city}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                        <div className="flex items-center gap-2 mb-1">
                            <Ticket className="w-4 h-4 text-blue-400" aria-hidden="true" />
                            <p className="small-text text-slate-400">Tickets Sold</p>
                        </div>
                        <p className="big-text-5 font-bold text-white">
                            {ticketsSold}/{totalTickets}
                        </p>
                    </div>

                    <div className="p-3 bg-primary-200 rounded-lg border border-accent/20">
                        <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                            <p className="small-text text-slate-400">Revenue</p>
                        </div>
                        <p className="big-text-5 font-bold text-emerald-400">
                            GH₵ {parseFloat(event.analytics.gross_revenue).toLocaleString('en-GH')}
                        </p>
                    </div>
                </div>

                {/* Sales Progress */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="small-text text-slate-400">Sales Progress</p>
                        <p className="small-text font-semibold text-accent-50">
                            {salesPercentage.toFixed(1)}%
                        </p>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-2 overflow-hidden">
                        <div 
                            className="h-full bg-linear-to-r from-accent to-accent-100 rounded-full transition-all duration-500"
                            style={{ width: `${salesPercentage}%` }}
                        />
                    </div>
                </div>

                {/* View Details Button */}
                <Link
                    href={`/dashboard/events/${event.slug}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300 hover:scale-[1.02]"
                >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default MyEventCard;