"use client";

import React from 'react';
import { TicketDetails } from '@/types/tickets.types';
import {
    TicketDetailsHeader,
    TicketQRSection,
    TicketEventDetails,
    TicketAttendeeInfo,
    TicketPurchaseInfo,
    TicketActions
} from '@/components';

type Props = {
    ticket: TicketDetails;
};

const TicketDetailsContent = ({ ticket }: Props) => {
    return (
        <div className="space-y-6">
            {/* Header with Status */}
            <TicketDetailsHeader ticket={ticket} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - QR Code & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <TicketQRSection ticket={ticket} />
                    <TicketActions ticket={ticket} />
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    <TicketEventDetails event={ticket.event} ticketType={ticket.ticket_type} />
                    <TicketAttendeeInfo attendeeInfo={ticket.attendee_info} />
                    <TicketPurchaseInfo purchaseInfo={ticket.purchase_info} />
                </div>
            </div>
        </div>
    );
};

export default TicketDetailsContent;