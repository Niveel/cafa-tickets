"use client";

import React, { useState } from 'react';
import { MyEvent } from '@/types/dash-events.types';
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
    const [selectedEventId, setSelectedEventId] = useState<number | null>(
        initialEvents.length === 1 ? initialEvents[0].id : null
    );
    const [checkInHistory, setCheckInHistory] = useState<any[]>([]);

    const selectedEvent = events.find(e => e.id === selectedEventId);

    const handleCheckInSuccess = (checkInData: any) => {
        setCheckInHistory(prev => [checkInData, ...prev]);
    };

    const handleLoadMore = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        try {
            // Simulate API call to fetch next page
            console.log('Loading more events...');
            
            // In production:
            // const response = await fetch(`/api/v1/events/check-in/?page=${nextPage}`);
            // const data = await response.json();
            
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock response - in production, append real data
            // setEvents(prev => [...prev, ...data.results]);
            // setHasMore(!!data.next);
            
            // For now, just set hasMore to false after first load
            setHasMore(false);
            
        } catch (error) {
            console.error('Error loading more events:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <CheckInHeader totalEvents={events.length} />

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
                        onChangeEvent={() => setSelectedEventId(null)}
                    />

                    {/* Check-in History */}
                    {checkInHistory.length > 0 && (
                        <CheckInHistory history={checkInHistory} />
                    )}
                </div>
            )}
        </div>
    );
};

export default CheckInContent;