"use client";

import React, { useState } from 'react';
import { Ticket, Plus, Info, AlertCircle } from 'lucide-react';
import { useFormikContext } from 'formik';

import { TicketTypeFormValues } from '@/data/eventsSchema';
import {TicketTypeCard} from '@/components';
import AddTicketTypeModal from './AddTicketTypeModal';

const EventTicketTypesSection = () => {
    const { values, setFieldValue, errors, touched } = useFormikContext<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const ticketTypes = values.ticket_types || [];
    const hasTickets = ticketTypes.length > 0;
    const canAddMore = ticketTypes.length < 10;

    // Calculate total revenue potential
    const totalRevenue = React.useMemo(() => {
        return ticketTypes.reduce((sum: number, ticket: any) => {
            const price = parseFloat(ticket.price) || 0;
            const quantity = parseInt(ticket.quantity) || 0;
            return sum + (price * quantity);
        }, 0);
    }, [ticketTypes]);

    // Calculate total tickets
    const totalTickets = React.useMemo(() => {
        return ticketTypes.reduce((sum: number, ticket: any) => {
            return sum + (parseInt(ticket.quantity) || 0);
        }, 0);
    }, [ticketTypes]);

    const handleAddTicket = () => {
        setEditingIndex(null);
        setIsModalOpen(true);
    };

    const handleEditTicket = (index: number) => {
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleDeleteTicket = (index: number) => {
        const newTickets = ticketTypes.filter((_: any, i: number) => i !== index);
        setFieldValue('ticket_types', newTickets);
    };

    const handleSubmitTicket = (values: TicketTypeFormValues) => {
        if (editingIndex !== null) {
            // Edit existing ticket
            const newTickets = [...ticketTypes];
            newTickets[editingIndex] = values;
            setFieldValue('ticket_types', newTickets);
        } else {
            // Add new ticket
            setFieldValue('ticket_types', [...ticketTypes, values]);
        }
    };

    const getTicketError = () => {
        if (touched.ticket_types && errors.ticket_types) {
            if (typeof errors.ticket_types === 'string') {
                return errors.ticket_types;
            }
        }
        return undefined;
    };

    const ticketError = getTicketError();

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Ticket Types
                    </h2>
                    <p className="small-text text-slate-400">
                        Create different ticket types for your event
                    </p>
                </div>
            </div>

            {/* Tickets Summary (if tickets exist) */}
            {hasTickets && (
                <div className="p-5 bg-emerald-500/10 rounded-xl border-2 border-emerald-500/30">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-primary rounded-xl border border-accent/20">
                            <p className="small-text text-slate-400 mb-1">Ticket Types</p>
                            <p className="big-text-3 font-bold text-white">
                                {ticketTypes.length}
                            </p>
                        </div>

                        <div className="p-4 bg-primary rounded-xl border border-accent/20">
                            <p className="small-text text-slate-400 mb-1">Total Tickets</p>
                            <p className="big-text-3 font-bold text-white">
                                {totalTickets.toLocaleString()}
                            </p>
                        </div>

                        <div className="p-4 bg-primary rounded-xl border border-accent/20">
                            <p className="small-text text-slate-400 mb-1">Potential Revenue</p>
                            <p className="big-text-3 font-bold text-emerald-400">
                                GH₵ {totalRevenue.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Ticket Button (Top) */}
            {hasTickets && canAddMore && (
                <button
                    type="button"
                    onClick={handleAddTicket}
                    className="w-full p-4 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold big-text-5 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <Plus className="w-6 h-6" aria-hidden="true" />
                    Add Ticket Type ({ticketTypes.length}/10)
                </button>
            )}

            {/* Tickets List or Empty State */}
            {!hasTickets ? (
                <div className="p-12 border-2 border-dashed border-accent/30 rounded-xl hover:border-accent hover:bg-primary-200 transition-all duration-300">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                            <Ticket className="w-10 h-10 text-purple-400" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="big-text-3 font-bold text-white mb-2">
                                No Ticket Types Yet
                            </p>
                            <p className="normal-text text-slate-400 mb-6">
                                Create your first ticket type to start selling tickets for your event
                            </p>
                            <button
                                type="button"
                                onClick={handleAddTicket}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold big-text-5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                <Plus className="w-5 h-5" aria-hidden="true" />
                                Create Ticket Type
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {ticketTypes.map((ticket: any, index: number) => (
                        <TicketTypeCard
                            key={index}
                            ticket={ticket}
                            index={index}
                            onEdit={handleEditTicket}
                            onDelete={handleDeleteTicket}
                        />
                    ))}
                </div>
            )}

            {/* Max Tickets Reached */}
            {!canAddMore && (
                <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="small-text text-amber-300">
                            You&apos;ve reached the maximum of 10 ticket types per event. You can edit or remove existing tickets to add new ones.
                        </p>
                    </div>
                </div>
            )}

            {/* Validation Error */}
            {ticketError && (
                <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="small-text text-red-400">{ticketError}</p>
                    </div>
                </div>
            )}

            {/* Info Note */}
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-blue-300 font-semibold mb-1">
                            Ticket Type Guidelines
                        </p>
                        <ul className="small-text-2 text-blue-300 space-y-1 list-disc list-inside">
                            <li>Create different ticket types for different audience segments (Early Bird, VIP, Regular)</li>
                            <li>Set purchase limits to control how many tickets one person can buy</li>
                            <li>Use availability windows for time-limited offers (e.g., Early Bird expires 1 week before event)</li>
                            <li>Minimum ticket price is GH₵ 10.00</li>
                            <li>You can have up to 10 different ticket types per event</li>
                            <li>Total ticket quantity must not exceed your event&apos;s maximum attendees</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Add Ticket Type Modal */}
            <AddTicketTypeModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingIndex(null);
                }}
                onSubmit={handleSubmitTicket}
                initialValues={editingIndex !== null ? ticketTypes[editingIndex] : undefined}
                isEditing={editingIndex !== null}
            />
        </div>
    );
};

export default EventTicketTypesSection;