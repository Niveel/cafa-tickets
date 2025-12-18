"use client";

import React, { useState } from 'react';
import { Ticket, Plus, Edit, Trash2, AlertCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EventTicketType } from '@/types/dash-events.types';

type Props = {
    ticketTypes: EventTicketType[];
    eventSlug: string;
};

const EventTicketTypesManagement = ({ ticketTypes, eventSlug }: Props) => {
    const router = useRouter();
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDelete = async (ticketId: number) => {
        try {
            setDeleting(ticketId);
            setDeleteError(null);

            console.log('Deleting ticket type:', ticketId);

            const response = await fetch(`/api/dashboard/events/${eventSlug}/tickets/delete?ticketId=${ticketId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                // Use backend's detailed message if available
                const errorMessage = data.message || data.error || 'Failed to delete ticket';
                throw new Error(errorMessage);
            }

            console.log('Ticket deleted successfully');
            setDeleteConfirm(null);
            
            router.refresh();

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error deleting ticket:', error.message);
                setDeleteError(error.message);
            } else {
                console.error('Error deleting ticket:', error);
                setDeleteError('Failed to delete ticket. Please try again.');
            }
        } finally {
            setDeleting(null);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        const colors = {
            active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            expired: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
            sold_out: 'bg-red-500/20 text-red-400 border-red-500/30'
        };
        return colors[status as keyof typeof colors] || colors.active;
    };

    const getStatusLabel = (status: string) => {
        const labels = {
            active: 'Active',
            expired: 'Expired',
            sold_out: 'Sold Out'
        };
        return labels[status as keyof typeof labels] || status;
    };

    const totalRevenue = ticketTypes.reduce((sum, ticket) => sum + parseFloat(ticket.revenue), 0);
    const totalSold = ticketTypes.reduce((sum, ticket) => sum + ticket.tickets_sold, 0);
    const totalQuantity = ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="big-text-2 font-bold text-white">
                        Ticket Types
                    </h2>
                    <p className="normal-text text-slate-400">
                        Manage ticket types, pricing, and availability
                    </p>
                </div>
                <Link
                    href={`/dashboard/events/${eventSlug}/tickets/create`}
                    className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text-2 transition-all duration-300"
                >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    Add Ticket Type
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-primary-200 rounded-xl border-2 border-accent/30">
                    <p className="small-text text-slate-400 mb-1">Total Ticket Types</p>
                    <p className="big-text-3 font-bold text-white">
                        {ticketTypes.length}
                    </p>
                </div>

                <div className="p-4 bg-primary-200 rounded-xl border-2 border-accent/30">
                    <p className="small-text text-slate-400 mb-1">Total Sold</p>
                    <p className="big-text-3 font-bold text-white">
                        {totalSold.toLocaleString()} / {totalQuantity.toLocaleString()}
                    </p>
                </div>

                <div className="p-4 bg-primary-200 rounded-xl border-2 border-accent/30">
                    <p className="small-text text-slate-400 mb-1">Total Revenue</p>
                    <p className="big-text-3 font-bold text-emerald-400">
                        GH₵ {totalRevenue.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {ticketTypes.map((ticket) => (
                    <div key={ticket.id} className="group p-5 bg-primary rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <Ticket className="w-5 h-5 text-purple-400" aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="big-text-4 font-bold text-white">
                                            {ticket.name}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded-md border font-semibold small-text-2 ${getStatusColor(ticket.status)}`}>
                                            {getStatusLabel(ticket.status)}
                                        </span>
                                    </div>
                                    <p className="small-text text-slate-400">
                                        {ticket.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ml-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity">
                                <Link
                                    href={`/dashboard/events/${eventSlug}/tickets/${ticket.id}/edit`}
                                    className="w-9 h-9 rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    aria-label={`Edit ${ticket.name}`}
                                >
                                    <Edit className="w-4 h-4 text-white" aria-hidden="true" />
                                </Link>
                                <button
                                    onClick={() => setDeleteConfirm(ticket.id)}
                                    disabled={deleting === ticket.id}
                                    className="w-9 h-9 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label={`Delete ${ticket.name}`}
                                >
                                    <Trash2 className="w-4 h-4 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            <div className="p-3 bg-primary-200 rounded-lg">
                                <p className="small-text text-slate-400 mb-1">Price</p>
                                <p className="big-text-5 font-bold text-emerald-400">
                                    GH₵ {parseFloat(ticket.price).toLocaleString('en-GH')}
                                </p>
                            </div>

                            <div className="p-3 bg-primary-200 rounded-lg">
                                <p className="small-text text-slate-400 mb-1">Sold</p>
                                <p className="big-text-5 font-bold text-white">
                                    {ticket.tickets_sold} / {ticket.quantity}
                                </p>
                            </div>

                            <div className="p-3 bg-primary-200 rounded-lg">
                                <p className="small-text text-slate-400 mb-1">Remaining</p>
                                <p className="big-text-5 font-bold text-white">
                                    {ticket.tickets_remaining}
                                </p>
                            </div>

                            <div className="p-3 bg-primary-200 rounded-lg">
                                <p className="small-text text-slate-400 mb-1">Revenue</p>
                                <p className="big-text-5 font-bold text-emerald-400">
                                    GH₵ {parseFloat(ticket.revenue).toLocaleString('en-GH')}
                                </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="small-text text-slate-400">Sales Progress</p>
                                <p className="small-text font-semibold text-white">
                                    {ticket.sales_percentage.toFixed(1)}%
                                </p>
                            </div>
                            <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                                    style={{ width: `${ticket.sales_percentage}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-slate-400">
                            <div className="flex items-center gap-1">
                                <p className="small-text">
                                    Purchase limits: {ticket.min_purchase} - {ticket.max_purchase}
                                </p>
                            </div>

                            {(ticket.available_from || ticket.available_until) && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" aria-hidden="true" />
                                    <p className="small-text">
                                        {ticket.available_from && `From ${formatDate(ticket.available_from)}`}
                                        {ticket.available_from && ticket.available_until && ' • '}
                                        {ticket.available_until && `Until ${formatDate(ticket.available_until)}`}
                                    </p>
                                </div>
                            )}
                        </div>

                        {deleteConfirm === ticket.id && (
                            <div className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div className="flex-1">
                                        <p className="normal-text-2 text-red-400 font-semibold mb-1">
                                            Delete Ticket Type?
                                        </p>
                                        <p className="small-text text-red-300 mb-3">
                                            This will permanently delete this ticket type. Tickets already sold will not be affected.
                                        </p>
                                        {deleteError && (
                                            <p className="small-text text-red-400 mb-3">
                                                {deleteError}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(ticket.id)}
                                                disabled={deleting === ticket.id}
                                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold small-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {deleting === ticket.id ? 'Deleting...' : 'Yes, Delete'}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeleteConfirm(null);
                                                    setDeleteError(null);
                                                }}
                                                disabled={deleting === ticket.id}
                                                className="px-4 py-2 bg-primary-200 hover:bg-primary-100 text-white rounded-lg font-semibold small-text transition-colors disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventTicketTypesManagement;