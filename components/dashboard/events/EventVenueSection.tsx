"use client";

import React from 'react';
import { MapPin, Info, CheckCircle } from 'lucide-react';
import { LocationSelector, type LocationData } from '@/components';
import { useFormikContext } from 'formik';

const EventVenueSection = () => {
    const { setFieldValue, values, errors, touched } = useFormikContext<any>();
    const [locationSelected, setLocationSelected] = React.useState(false);

    // Handle location selection from Google Maps
    const handleLocationSelect = (location: LocationData) => {
        // Set all venue fields
        setFieldValue('venue_name', location.venue_name);
        setFieldValue('venue_address', location.venue_address);
        setFieldValue('venue_city', location.venue_city);
        setFieldValue('venue_country', location.venue_country);
        setFieldValue('venue_latitude', location.latitude);
        setFieldValue('venue_longitude', location.longitude);

        setLocationSelected(true);

        // Show success message briefly
        setTimeout(() => setLocationSelected(false), 3000);
    };

    const getLocationError = () => {
        if (touched.venue_name && typeof errors.venue_name === 'string') {
            return errors.venue_name;
        }
        if (touched.venue_address && typeof errors.venue_address === 'string') {
            return errors.venue_address;
        }
        if (touched.venue_city && typeof errors.venue_city === 'string') {
            return errors.venue_city;
        }
        return undefined;
    };

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Venue Information
                    </h2>
                    <p className="small-text text-slate-400">
                        Where will your event take place?
                    </p>
                </div>
            </div>

            {/* Location Selector */}
            <LocationSelector
                onLocationSelect={handleLocationSelect}
                initialValue={values.venue_address || ''}
                label="Search for Venue"
                required
                error={getLocationError()}
            />

            {/* Location Selected Success Message */}
            {locationSelected && (
                <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 animate-fade-in">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="normal-text-2 text-emerald-400 font-semibold mb-1">
                                Location Selected
                            </p>
                            <p className="small-text text-emerald-300">
                                Venue details have been automatically filled in below
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Location Display */}
            {values.venue_name && (
                <div className="p-5 bg-primary-200 rounded-xl border-2 border-accent/30">
                    <h3 className="big-text-5 font-bold text-white mb-4">
                        Selected Venue Details
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                            <div>
                                <p className="small-text text-slate-400">Venue Name</p>
                                <p className="normal-text-2 font-semibold text-white">{values.venue_name}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                            <div>
                                <p className="small-text text-slate-400">Address</p>
                                <p className="normal-text-2 font-semibold text-white">{values.venue_address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                            <div>
                                <p className="small-text text-slate-400">City</p>
                                <p className="normal-text-2 font-semibold text-white">{values.venue_city}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                            <div>
                                <p className="small-text text-slate-400">Country</p>
                                <p className="normal-text-2 font-semibold text-white">{values.venue_country}</p>
                            </div>
                        </div>

                        {values.venue_latitude && values.venue_longitude && (
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                                <div>
                                    <p className="small-text text-slate-400">GPS Coordinates</p>
                                    <p className="normal-text-2 font-semibold text-white">
                                        {values.venue_latitude}, {values.venue_longitude}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Info Note */}
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-blue-300 font-semibold mb-1">
                            How it works
                        </p>
                        <ul className="small-text-2 text-blue-300 space-y-1 list-disc list-inside">
                            <li>Start typing the venue name or address in the search box</li>
                            <li>Select from the dropdown suggestions</li>
                            <li>All venue details including GPS coordinates will be filled automatically</li>
                            <li>Attendees will be able to see the location on a map</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventVenueSection;