"use client";

import React, { useState, useCallback } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';

// Define the libraries array outside component to prevent re-renders
const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

export type LocationData = {
    address: string;
    venue_name: string;
    venue_address: string;
    venue_city: string;
    venue_country: string;
    latitude: string;
    longitude: string;
};

type Props = {
    onLocationSelect: (location: LocationData) => void;
    initialValue?: string;
    label?: string;
    required?: boolean;
    error?: string;
};

const LocationSelector = ({ 
    onLocationSelect, 
    initialValue = '',
    label = 'Venue Location',
    required = false,
    error 
}: Props) => {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [inputValue, setInputValue] = useState(initialValue);

    // Load Google Maps API
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: LIBRARIES,
    });

    // Extract city from address components
    const extractCityFromComponents = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
        // Try to find locality (city)
        const locality = addressComponents.find(comp => 
            comp.types.includes('locality')
        );
        if (locality) return locality.long_name;

        // Fallback to administrative_area_level_2 (district)
        const district = addressComponents.find(comp => 
            comp.types.includes('administrative_area_level_2')
        );
        if (district) return district.long_name;

        // Fallback to administrative_area_level_1 (region)
        const region = addressComponents.find(comp => 
            comp.types.includes('administrative_area_level_1')
        );
        if (region) return region.long_name;

        return '';
    };

    // Extract country from address components
    const extractCountryFromComponents = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
        const country = addressComponents.find(comp => 
            comp.types.includes('country')
        );
        return country?.long_name || 'Ghana';
    };

    // Extract street address from address components
    const extractStreetAddress = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
        const streetNumber = addressComponents.find(comp => 
            comp.types.includes('street_number')
        )?.long_name || '';
        
        const route = addressComponents.find(comp => 
            comp.types.includes('route')
        )?.long_name || '';

        return `${streetNumber} ${route}`.trim();
    };

    // Handle place selection
    const handlePlaceSelect = useCallback(() => {
        if (!autocomplete) return;

        const place = autocomplete.getPlace();

        // Validate that place has geometry
        if (!place.geometry || !place.geometry.location) {
            console.error('No geometry for selected place');
            return;
        }

        const addressComponents = place.address_components || [];

        // Extract location data
        const locationData: LocationData = {
            address: place.formatted_address || '',
            venue_name: place.name || '',
            venue_address: extractStreetAddress(addressComponents) || place.formatted_address || '',
            venue_city: extractCityFromComponents(addressComponents),
            venue_country: extractCountryFromComponents(addressComponents),
            latitude: place.geometry.location.lat().toFixed(6),
            longitude: place.geometry.location.lng().toFixed(6)
        };

        // Update input value
        setInputValue(place.formatted_address || '');

        // Call parent callback
        onLocationSelect(locationData);
    }, [autocomplete, onLocationSelect]);

    // Handle autocomplete load
    const onLoad = useCallback((autocompleteInstance: google.maps.places.Autocomplete) => {
        // Restrict to Ghana (optional - remove if you want worldwide)
        autocompleteInstance.setComponentRestrictions({
            country: ['gh']
        });

        // Set fields to retrieve
        autocompleteInstance.setFields([
            'formatted_address',
            'name',
            'address_components',
            'geometry'
        ]);

        setAutocomplete(autocompleteInstance);
    }, []);

    // Loading state
    if (!isLoaded) {
        return (
            <div>
                <label className="block normal-text-2 text-slate-300 font-medium mb-2">
                    {label}
                    {required && <span className="text-accent-50 ml-1">*</span>}
                </label>
                <div className="w-full h-12 px-4 bg-primary-100 border-2 border-accent/30 rounded-xl flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-accent animate-spin" aria-hidden="true" />
                    <p className="normal-text-2 text-slate-400">Loading Google Maps...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (loadError) {
        return (
            <div>
                <label className="block normal-text-2 text-slate-300 font-medium mb-2">
                    {label}
                    {required && <span className="text-accent-50 ml-1">*</span>}
                </label>
                <div className="w-full p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="normal-text-2 text-red-400 font-semibold mb-1">
                            Failed to Load Google Maps
                        </p>
                        <p className="small-text text-red-300">
                            Please check your internet connection and API key configuration.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <label htmlFor="location-autocomplete" className="block normal-text-2 text-slate-300 font-medium mb-2">
                {label}
                {required && <span className="text-accent-50 ml-1">*</span>}
            </label>

            <div className="relative">
                <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={handlePlaceSelect}
                >
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <MapPin className="w-5 h-5 text-slate-400" aria-hidden="true" />
                        </div>
                        <input
                            id="location-autocomplete"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search for a venue or address..."
                            className={`
                                w-full h-12 pl-12 pr-4 bg-primary-100 border-2 text-white rounded-xl 
                                normal-text-2 placeholder:text-slate-500
                                focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300
                                ${error ? 'border-red-500' : 'border-accent'}
                            `}
                            required={required}
                            aria-invalid={!!error}
                            aria-describedby={error ? 'location-error' : undefined}
                        />
                    </div>
                </Autocomplete>
            </div>

            {/* Error Message */}
            {error && (
                <div id="location-error" className="mt-2 flex items-start gap-2" role="alert">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="small-text text-red-400">{error}</p>
                </div>
            )}

            {/* Helper Text */}
            {!error && (
                <p className="mt-2 small-text text-slate-400">
                    Start typing to search for venues, landmarks, or addresses in Ghana
                </p>
            )}
        </div>
    );
};

export default LocationSelector;