"use client";

import React, { useState } from 'react';

import { MyEvent } from '@/types/dash-events.types';
import { CheckInSuccessResponse, CheckInHistoryItem } from '@/types/dashboard.types';
import {
    CheckInHeader,
    EventSelector,
    CheckInScanner,
    CheckInHistory
} from '@/components';

type Props = {
    initialEvents: MyEvent[];
    initialHasMore?: boolean;
};

const CheckInContent = ({ initialEvents, initialHasMore = false }: Props) => {
    const [events, setEvents] = useState<MyEvent[]>(initialEvents);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);
    const [upcomingPage, setUpcomingPage] = useState(1);
    const [ongoingPage, setOngoingPage] = useState(1);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(
        initialEvents.length === 1 ? initialEvents[0].id : null
    );
    const [latestCheckIn, setLatestCheckIn] = useState<CheckInHistoryItem | null>(null);

    const selectedEvent = events.find(e => e.id === selectedEventId);

    const handleCheckInSuccess = (checkInData: CheckInSuccessResponse) => {
        // Convert to CheckInHistoryItem format
        const historyItem: CheckInHistoryItem = {
            ticket_id: checkInData.ticket.ticket_id,
            attendee_name: checkInData.ticket.attendee_name,
            attendee_email: checkInData.ticket.attendee_email,
            ticket_type: checkInData.ticket.ticket_type,
            checked_in_at: checkInData.ticket.checked_in_at,
            checked_in_by: checkInData.ticket.checked_in_by
        };

        setLatestCheckIn(historyItem);
    };

    const handleLoadMore = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        try {
            const nextUpcomingPage = upcomingPage + 1;
            const nextOngoingPage = ongoingPage + 1;

            // Fetch next pages for both upcoming and ongoing events
            const [upcomingResponse, ongoingResponse] = await Promise.all([
                fetch(`/api/events/my-events?page=${nextUpcomingPage}&page_size=20&status=upcoming`),
                fetch(`/api/events/my-events?page=${nextOngoingPage}&page_size=20&status=ongoing`)
            ]);

            const upcomingData = upcomingResponse.ok ? await upcomingResponse.json() : null;
            const ongoingData = ongoingResponse.ok ? await ongoingResponse.json() : null;

            // Combine new results
            const newEvents = [
                ...(upcomingData?.results || []),
                ...(ongoingData?.results || [])
            ];

            if (newEvents.length > 0) {
                setEvents(prev => [...prev, ...newEvents]);
            }

            // Update pages
            setUpcomingPage(nextUpcomingPage);
            setOngoingPage(nextOngoingPage);

            // Check if there are more events
            setHasMore(!!(upcomingData?.next || ongoingData?.next));

        } catch (error) {
            console.error('Error loading more events:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <CheckInHeader />

            {/* Event Selector */}
            {!selectedEventId && (
                <EventSelector 
                    events={events} 
                    onSelectEvent={setSelectedEventId}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    onLoadMore={handleLoadMore}
                />
            )}

            {/* Scanner Interface */}
            {selectedEventId && selectedEvent && (
                <div className="space-y-6">
                    <CheckInScanner 
                        event={selectedEvent}
                        onSuccess={handleCheckInSuccess}
                        onChangeEvent={() => {
                            setSelectedEventId(null);
                            setLatestCheckIn(null);
                        }}
                    />

                    {/* Check-in History */}
                    <CheckInHistory 
                        eventSlug={selectedEvent.slug}
                        latestCheckIn={latestCheckIn}
                    />
                </div>
            )}
        </div>
    );
};

export default CheckInContent;