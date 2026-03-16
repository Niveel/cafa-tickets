"use client";

import React from 'react';
import { Plus } from 'lucide-react';

import { CreateEventGuardButton, MyEventCard } from '@/components';
import { MyEvent } from '@/types/dash-events.types';


type Props = {
    events: MyEvent[];
    onDelete: (eventId: number, eventSlug: string, eventTitle: string) => void;
    canCreateEvent: boolean;
};

const MyEventsList = ({ events, onDelete, canCreateEvent }: Props) => {
    if (events.length === 0) {
        return (
            <div role="region" aria-label="My events" className="bg-primary rounded-xl p-12 border-2 border-accent/30 text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Plus className="w-10 h-10 text-accent-50" aria-hidden="true" />
                </div>
                <h2 className="big-text-3 font-bold text-white mb-3">
                    No Events Found
                </h2>
                <p className="normal-text text-slate-300 mb-6 max-w-md mx-auto">
                    You haven&apos;t created any events yet. Start by creating your first event and reach thousands of attendees.
                </p>

                <CreateEventGuardButton
                    canCreateEvent={canCreateEvent}
                    createLabel="Create Your First Event"
                    verifyLabel="Verify to Create Event"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text-2 hover:bg-accent-100 transition-all duration-300"
                />
            </div>
        );
    }

    return (
        <div role="region" aria-label="My events" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {events.map((event) => (
                <MyEventCard
                    key={event.id}
                    event={event}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default MyEventsList;
