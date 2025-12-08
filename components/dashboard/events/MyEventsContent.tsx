"use client";

import React from 'react';
import { myEvents } from "@/data/dummy.dash-events";
import { MyEventsFilters, MyEventsList } from "@/components";

type Event = typeof myEvents.results[0];

const MyEventsContent = () => {
    const [filteredEvents, setFilteredEvents] = React.useState<Event[]>(myEvents.results);

    const handleFilterChange = React.useCallback((filters: {
        status: string;
        is_published: string;
        category: string;
        search: string;
        sort_by: string;
    }) => {
        let filtered = [...myEvents.results];

        // Filter by status
        if (filters.status !== 'all') {
            filtered = filtered.filter(event => event.status === filters.status);
        }

        // Filter by published status
        if (filters.is_published === 'true') {
            filtered = filtered.filter(event => event.is_published === true);
        } else if (filters.is_published === 'false') {
            filtered = filtered.filter(event => event.is_published === false);
        }

        // Filter by category
        if (filters.category) {
            filtered = filtered.filter(event => event.category.slug === filters.category);
        }

        // Filter by search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(event => 
                event.title.toLowerCase().includes(searchLower)
            );
        }

        // Sort events
        filtered.sort((a, b) => {
            switch (filters.sort_by) {
                case '-start_date':
                    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
                case 'start_date':
                    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
                case '-created_at':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'created_at':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case '-tickets_sold':
                    return b.analytics.tickets_sold - a.analytics.tickets_sold;
                case 'tickets_sold':
                    return a.analytics.tickets_sold - b.analytics.tickets_sold;
                case '-revenue':
                    return parseFloat(b.analytics.gross_revenue) - parseFloat(a.analytics.gross_revenue);
                case 'revenue':
                    return parseFloat(a.analytics.gross_revenue) - parseFloat(b.analytics.gross_revenue);
                default:
                    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
            }
        });

        setFilteredEvents(filtered);
    }, []);

    const handleDelete = React.useCallback((eventId: number, eventTitle: string) => {
        setFilteredEvents(prevEvents => 
            prevEvents.filter(event => event.id !== eventId)
        );
        
        // Simulate API call
        setTimeout(() => {
            alert(`Event "${eventTitle}" deleted successfully!`);
        }, 500);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
                <MyEventsFilters onFilterChange={handleFilterChange} />
            </div>

            {/* Events List */}
            <div className="lg:col-span-3">
                <MyEventsList 
                    events={filteredEvents}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default MyEventsContent;