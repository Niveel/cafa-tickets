"use client";

import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { EventDetails, RecurringEventDetails } from '@/types/events.types';

interface VenueSectionProps {
    event: EventDetails | RecurringEventDetails;
}

const VenueSection = ({ event }: VenueSectionProps) => {
    const { venue } = event;

    // Construct Google Maps embed URL
    // const embedMapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${venue.latitude},${venue.longitude}&zoom=15`;

    // Alternative: Use static map URL (no API key needed for viewing)
    const staticMapUrl = `https://maps.google.com/maps?q=${venue.latitude},${venue.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <section className="relative py-8 sm:y-12 bg-primary-100" id="venue">
            <div className="inner-wrapper">
                {/* Section Header */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent">
                            <MapPin className="w-6 h-6 text-accent-50" aria-hidden="true" />
                        </div>
                        <h2 className="big-text-1 font-bold text-white">
                            Venue & Location
                        </h2>
                    </div>
                    <p className="big-text-5 text-slate-200 max-w-3xl">
                        Get directions and explore the venue location. We&apos;ve made it easy for you to find us!
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                    {/* Map */}
                    <div className="lg:col-span-2">
                        <div className="relative rounded-2xl overflow-hidden border-2 border-accent shadow-2xl aspect-video bg-primary">
                            {/* Google Maps Embed */}
                            <iframe
                                src={staticMapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map showing location of ${venue.name}`}
                                className="absolute inset-0 w-full h-full"
                            ></iframe>

                            {/* Map Overlay Badge */}
                            <div className="absolute top-4 left-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-lg border border-accent shadow-lg">
                                <p className="normal-text-2 font-bold text-white">
                                    📍 {venue.name}
                                </p>
                            </div>
                        </div>

                        {/* Quick Actions Below Map */}
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                            <a
                                href={venue.google_maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-accent text-white rounded-xl font-bold normal-text hover:bg-accent-100 transition-all duration-300 hover:scale-105 border-2 border-accent"
                            >
                                <Navigation className="w-5 h-5" aria-hidden="true" />
                                Get Directions
                            </a>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.city)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-primary-100 text-white rounded-xl font-bold normal-text hover:bg-primary-200 transition-all duration-300 border-2 border-accent"
                            >
                                <ExternalLink className="w-5 h-5" aria-hidden="true" />
                                Open in Maps App
                            </a>
                        </div>
                    </div>

                    {/* Venue Details Card */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Venue Info */}
                        <div className="p-6 bg-primary rounded-xl border border-accent">
                            <h3 className="big-text-4 font-bold text-white mb-6">
                                Venue Details
                            </h3>

                            <div className="space-y-5">
                                {/* Name */}
                                <div>
                                    <p className="small-text text-slate-300 mb-1 font-semibold">Venue Name</p>
                                    <p className="big-text-5 font-bold text-white">
                                        {venue.name}
                                    </p>
                                </div>

                                {/* Address */}
                                <div>
                                    <p className="small-text text-slate-300 mb-1 font-semibold">Address</p>
                                    <p className="normal-text text-white">
                                        {venue.address}
                                    </p>
                                    <p className="normal-text text-slate-200">
                                        {venue.city}, {venue.country}
                                    </p>
                                </div>

                                {/* Coordinates */}
                                <div>
                                    <p className="small-text text-slate-300 mb-1 font-semibold">Coordinates</p>
                                    <div className="flex items-center gap-2">
                                        <code className="px-3 py-1.5 bg-primary-100 text-accent-50 rounded-lg small-text font-mono border border-accent/30">
                                            {venue.latitude}, {venue.longitude}
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* How to Get There */}
                        <div className="p-6 bg-linear-to-br from-accent/5 to-accent/10 rounded-xl border border-accent">
                            <h3 className="big-text-5 font-bold text-white mb-4 flex items-center gap-2">
                                <Navigation className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                Getting There
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-accent-50 font-bold text-sm">🚗</span>
                                    </div>
                                    <div>
                                        <p className="normal-text-2 font-bold text-white">By Car</p>
                                        <p className="small-text text-slate-300">
                                            Parking available nearby
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-accent-50 font-bold text-sm">🚌</span>
                                    </div>
                                    <div>
                                        <p className="normal-text-2 font-bold text-white">Public Transport</p>
                                        <p className="small-text text-slate-300">
                                            Check local bus routes to {venue.city}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-accent-50 font-bold text-sm">🚕</span>
                                    </div>
                                    <div>
                                        <p className="normal-text-2 font-bold text-white">Ride-Share</p>
                                        <p className="small-text text-slate-300">
                                            Uber, Bolt available in the area
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accessibility Info */}
                        <div className="p-6 bg-primary rounded-xl border border-accent">
                            <h3 className="big-text-5 font-bold text-white mb-3">
                                Accessibility
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-50">✓</span>
                                    <p className="small-text text-slate-200">Wheelchair accessible venue</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-50">✓</span>
                                    <p className="small-text text-slate-200">Accessible parking available</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-50">✓</span>
                                    <p className="small-text text-slate-200">Accessible restrooms</p>
                                </div>
                            </div>
                            <p className="small-text text-slate-400 mt-4">
                                For specific accessibility needs, please contact the organizer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VenueSection;