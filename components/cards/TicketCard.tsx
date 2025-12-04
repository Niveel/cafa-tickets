"use client";

import React, { useState } from 'react';
import { X, Ticket as TicketIcon, Clock } from 'lucide-react';
import { TicketType } from '@/types/events.types';
import { getTicketTheme } from '@/utils/functions';

interface TicketCardProps {
    ticket: TicketType;
    onSelect?: (ticketId: number, quantity: number) => void;
}

const TicketCard = ({ ticket, onSelect }: TicketCardProps) => {
    const [quantity, setQuantity] = useState<number>(ticket.min_purchase);
    const theme = getTicketTheme(ticket.name);
    const isSoldOut = !ticket.is_available || ticket.tickets_remaining === 0;
    const isLowStock = ticket.tickets_remaining > 0 && ticket.tickets_remaining <= 10;

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= ticket.min_purchase && newQuantity <= Math.min(ticket.max_purchase, ticket.tickets_remaining)) {
            setQuantity(newQuantity);
        }
    };

    const handleSelect = () => {
        if (!isSoldOut && onSelect) {
            onSelect(ticket.id, quantity);
        }
    };

    return (
        <article className={`relative bg-primary-100 rounded-2xl overflow-hidden border-2 ${
            isSoldOut ? 'border-slate-600 opacity-60' : theme.border
        } transition-all duration-500 ${!isSoldOut && 'hover:shadow-2xl hover:scale-[1.01]'}`}>
            {/* Ticket Stub Pattern */}
            <div className="absolute top-0 left-0 w-full h-2 flex">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                        key={i} 
                        className={`flex-1 h-full ${isSoldOut ? 'bg-slate-600' : `bg-linear-to-r ${theme.gradient}`}`}
                        style={{ 
                            clipPath: i % 2 === 0 
                                ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                                : 'polygon(0 0, 100% 0, 50% 100%, 0 100%)'
                        }}
                    ></div>
                ))}
            </div>

            {/* Perforation Line */}
            <div className="absolute left-0 top-32 w-full border-t-2 border-dashed border-accent/30"></div>
            <div className="absolute left-0 top-32 -translate-y-1/2 w-4 h-8 bg-primary rounded-r-full"></div>
            <div className="absolute right-0 top-32 -translate-y-1/2 w-4 h-8 bg-primary rounded-l-full"></div>

            <div className="p-4 pt-8">
                {/* Top Section - Ticket Info */}
                <div className="space-y-3 pb-4">
                    {/* Ticket Type Badge */}
                    <div className="flex items-start justify-between gap-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${theme.badge}`}>
                            <TicketIcon className={`w-4 h-4 ${theme.icon}`} aria-hidden="true" />
                            <span className="small-text font-bold uppercase">
                                {ticket.name}
                            </span>
                        </div>

                        {/* Status Badges */}
                        {isSoldOut ? (
                            <span className="px-3 py-1.5 bg-slate-600/20 text-slate-300 rounded-lg small-text font-bold border border-slate-500">
                                SOLD OUT
                            </span>
                        ) : isLowStock && (
                            <span className="px-3 py-1.5 bg-accent/20 text-accent-50 rounded-lg small-text font-bold border border-accent animate-pulse">
                                ALMOST GONE
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="normal-text text-slate-200 leading-relaxed min-h-3">
                        {ticket.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="big-text-2 font-bold text-white">
                            GHS {parseFloat(ticket.price).toFixed(0)}
                        </span>
                        <span className="normal-text text-slate-300">
                            per ticket
                        </span>
                    </div>

                    {/* Availability Info */}
                    {!isSoldOut && (
                        <div className="space-y-1">
                            <div className="flex items-center justify-between text-slate-300">
                                <span className="small-text">Available</span>
                                <span className="small-text font-bold text-accent-50">
                                    {ticket.tickets_remaining} left
                                </span>
                            </div>
                            <div className="h-2 bg-primary-200 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ${
                                        isSoldOut ? 'bg-slate-600' : `bg-linear-to-r ${theme.gradient}`
                                    }`}
                                    style={{ 
                                        width: `${(ticket.tickets_sold / ticket.quantity) * 100}%` 
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Sold Out Info */}
                    {isSoldOut && ticket.sold_out_at && (
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span className="small-text">
                                Sold out on {new Date(ticket.sold_out_at).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    )}
                </div>

                {/* Bottom Section - Purchase Controls */}
                <div className="pt-2 space-y-2">
                    {!isSoldOut && (
                        <>
                            {/* Quantity Selector */}
                            <div className="space-y-2">
                                <label className="small-text text-slate-300 font-semibold">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        disabled={quantity <= ticket.min_purchase}
                                        className={`w-10 h-10 rounded-lg border-2 ${theme.border} text-white font-bold hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300`}
                                        aria-label="Decrease quantity"
                                        type="button"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || ticket.min_purchase)}
                                        min={ticket.min_purchase}
                                        max={Math.min(ticket.max_purchase, ticket.tickets_remaining)}
                                        className="flex-1 h-10 px-4 bg-primary-200 border-2 border-accent text-white text-center rounded-lg font-bold normal-text focus:outline-none focus:ring-2 focus:ring-accent"
                                        aria-label="Ticket quantity"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        disabled={quantity >= Math.min(ticket.max_purchase, ticket.tickets_remaining)}
                                        className={`w-10 h-10 rounded-lg border-2 ${theme.border} text-white font-bold hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300`}
                                        aria-label="Increase quantity"
                                        type="button"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="small-text text-slate-400">
                                    Min: {ticket.min_purchase} • Max: {Math.min(ticket.max_purchase, ticket.tickets_remaining)}
                                </p>
                            </div>

                            {/* Total Price */}
                            <div className="flex items-center justify-between p-4 bg-primary-200 rounded-xl border border-accent">
                                <span className="normal-text text-slate-300 font-semibold">Total Price</span>
                                <span className="big-text-4 font-bold text-white">
                                    GHS {(parseFloat(ticket.price) * quantity).toFixed(2)}
                                </span>
                            </div>

                            {/* Select Button */}
                            <button
                                onClick={handleSelect}
                                className={`w-full py-3.5 px-6 rounded-xl font-bold normal-text text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-linear-to-r ${theme.gradient} shadow-lg hover:shadow-xl`}
                                type="button"
                            >
                                Select {ticket.name}
                            </button>
                        </>
                    )}

                    {/* Sold Out Message */}
                    {isSoldOut && (
                        <div className="text-center py-4">
                            <X className="w-12 h-12 mx-auto text-slate-500 mb-2" aria-hidden="true" />
                            <p className="normal-text text-slate-400 font-semibold">
                                This ticket type is no longer available
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Barcode Pattern (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full h-12 flex items-end gap-0.5 px-6 pb-2 opacity-20 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                        key={i}
                        className={`flex-1 ${isSoldOut ? 'bg-slate-600' : 'bg-white'} rounded-t`}
                        style={{ 
                            height: `${Math.random() * 100}%`,
                            minHeight: '40%'
                        }}
                    ></div>
                ))}
            </div>
        </article>
    );
};

export default TicketCard;