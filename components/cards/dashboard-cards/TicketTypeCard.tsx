"use client";

import React from 'react';
import { Ticket, Edit, Trash2, Calendar, Users } from 'lucide-react';

export type TicketType = {
    name: string;
    description: string;
    price: string;
    quantity: string;
    min_purchase: string;
    max_purchase: string;
    available_from?: string;
    available_until?: string;
};

type Props = {
    ticket: TicketType;
    index: number;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
};

const TicketTypeCard = ({ ticket, index, onEdit, onDelete }: Props) => {
    const hasAvailability = ticket.available_from || ticket.available_until;

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GH', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-primary-200 rounded-xl p-5 border-2 border-accent/20 hover:border-accent transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Ticket className="w-5 h-5 text-purple-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                        <h4 className="big-text-5 font-bold text-white mb-1">
                            {ticket.name}
                        </h4>
                        <p className="small-text text-slate-400 line-clamp-2">
                            {ticket.description}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-3">
                    <button
                        type="button"
                        onClick={() => onEdit(index)}
                        className="w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label={`Edit ${ticket.name}`}
                    >
                        <Edit className="w-4 h-4 text-white" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(index)}
                        className="w-8 h-8 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                        aria-label={`Delete ${ticket.name}`}
                    >
                        <Trash2 className="w-4 h-4 text-white" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-primary rounded-lg border border-accent/20">
                    <p className="small-text text-slate-400 mb-1">Price</p>
                    <p className="big-text-5 font-bold text-emerald-400">
                        GH₵ {parseFloat(ticket.price).toLocaleString('en-GH')}
                    </p>
                </div>

                <div className="p-3 bg-primary rounded-lg border border-accent/20">
                    <p className="small-text text-slate-400 mb-1">Quantity</p>
                    <p className="big-text-5 font-bold text-white">
                        {parseInt(ticket.quantity).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Purchase Limits */}
            <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <p className="small-text text-slate-300">
                    Purchase limits: {ticket.min_purchase} - {ticket.max_purchase} tickets per transaction
                </p>
            </div>

            {/* Availability Dates */}
            {hasAvailability && (
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="small-text text-blue-300 font-semibold mb-1">
                                Limited Availability
                            </p>
                            {ticket.available_from && (
                                <p className="small-text-2 text-blue-300">
                                    From: {formatDate(ticket.available_from)}
                                </p>
                            )}
                            {ticket.available_until && (
                                <p className="small-text-2 text-blue-300">
                                    Until: {formatDate(ticket.available_until)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketTypeCard;