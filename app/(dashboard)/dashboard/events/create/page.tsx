import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {CreateEventForm} from '@/components';

export const metadata: Metadata = {
    title: 'Create Event | Cafa Tickets',
    description: 'Create and publish your event on Ghana\'s premier ticketing platform. Set up ticket types, venue details, and start selling tickets.',
    keywords: ['create event Ghana', 'sell tickets online', 'event management', 'Ghana events'],
};

const CreateEventPage = () => {
    return (
        <main className="min-h-screen bg-primary-100 dash-page">
            <div className="inner-wrapper space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/events"
                        className="w-10 h-10 rounded-lg bg-primary hover:bg-primary-200 flex items-center justify-center transition-colors border-2 border-accent/30 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label="Back to My Events"
                    >
                        <ArrowLeft className="w-5 h-5 text-white" aria-hidden="true" />
                    </Link>
                    <div>
                        <h1 className="big-text-1 font-bold text-white">
                            Create New Event
                        </h1>
                        <p className="normal-text text-slate-400">
                            Fill in the details below to create your event
                        </p>
                    </div>
                </div>

                {/* Form */}
                <CreateEventForm />
            </div>
        </main>
    );
};

export default CreateEventPage;