"use client";

import React from 'react';
import { eventAttendees } from "@/data/dummy.dash-events";
import { EventAttendeesFilters, EventAttendeesTable } from "@/components";

type Attendee = typeof eventAttendees.results[0];

type Props = {
    eventSlug: string;
    ticketTypes: Array<{ id: number; name: string }>;
};

const EventAttendeesContent = ({ eventSlug, ticketTypes }: Props) => {
    const [filteredAttendees, setFilteredAttendees] = React.useState<Attendee[]>(eventAttendees.results);

    const handleFilterChange = React.useCallback((filters: {
        search: string;
        ticket_type_id: string;
        payment_status: string;
        check_in_status: string;
        sort_by: string;
    }) => {
        let filtered = [...eventAttendees.results];

        // Filter by search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(attendee => 
                attendee.attendee_name.toLowerCase().includes(searchLower) ||
                attendee.attendee_email.toLowerCase().includes(searchLower) ||
                attendee.attendee_phone.includes(searchLower) ||
                attendee.ticket_id.toLowerCase().includes(searchLower)
            );
        }

        // Filter by ticket type
        if (filters.ticket_type_id) {
            filtered = filtered.filter(attendee => 
                attendee.ticket_type.id.toString() === filters.ticket_type_id
            );
        }

        // Filter by payment status
        if (filters.payment_status) {
            filtered = filtered.filter(attendee => 
                attendee.payment_status === filters.payment_status
            );
        }

        // Filter by check-in status
        if (filters.check_in_status !== 'all') {
            if (filters.check_in_status === 'checked_in') {
                filtered = filtered.filter(attendee => attendee.is_checked_in === true);
            } else if (filters.check_in_status === 'not_checked_in') {
                filtered = filtered.filter(attendee => attendee.is_checked_in === false);
            }
        }

        // Sort attendees
        filtered.sort((a, b) => {
            switch (filters.sort_by) {
                case '-purchase_date':
                    return new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime();
                case 'purchase_date':
                    return new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime();
                case 'attendee_name':
                    return a.attendee_name.localeCompare(b.attendee_name);
                case '-attendee_name':
                    return b.attendee_name.localeCompare(a.attendee_name);
                case 'ticket_type':
                    return a.ticket_type.name.localeCompare(b.ticket_type.name);
                case '-check_in_time':
                    if (!a.checked_in_at) return 1;
                    if (!b.checked_in_at) return -1;
                    return new Date(b.checked_in_at).getTime() - new Date(a.checked_in_at).getTime();
                case 'check_in_time':
                    if (!a.checked_in_at) return 1;
                    if (!b.checked_in_at) return -1;
                    return new Date(a.checked_in_at).getTime() - new Date(b.checked_in_at).getTime();
                default:
                    return new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime();
            }
        });

        setFilteredAttendees(filtered);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
                <EventAttendeesFilters 
                    eventSlug={eventSlug}
                    ticketTypes={ticketTypes}
                    onFilterChange={handleFilterChange}
                />
            </div>

            {/* Attendees Table */}
            <div className="lg:col-span-3">
                <EventAttendeesTable attendees={filteredAttendees} />
            </div>
        </div>
    );
};

export default EventAttendeesContent;