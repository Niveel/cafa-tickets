"use client";

import { useState, useEffect } from 'react';

type Country = {
    name: string;
    code: string;
    flag?: string;
};

type CountryOption = {
    label: string;
    value: string;
};

/**
 * Fetch all countries supported by Paystack
 */
export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/countries');
                const data = await response.json();

                if (data.success && data.countries) {
                    setCountries(data.countries);
                } else {
                    throw new Error('Failed to load countries');
                }
            } catch (err) {
                console.error('Failed to fetch countries:', err);
                setError('Failed to load countries');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const countryOptions: CountryOption[] = countries.map(country => ({
        label: country.name,
        value: country.code,
    }));

    return { countries, countryOptions, isLoading, error };
};