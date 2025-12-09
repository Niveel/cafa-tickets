import React from 'react';
import { MyTicket } from '@/types/tickets.types';
import { MyTicketCard } from '@/components';

type Props = {
    tickets: MyTicket[];
};

const MyTicketsGrid = ({ tickets }: Props) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tickets.map((ticket) => (
                <MyTicketCard key={ticket.ticket_id} ticket={ticket} />
            ))}
        </div>
    );
};

export default MyTicketsGrid;