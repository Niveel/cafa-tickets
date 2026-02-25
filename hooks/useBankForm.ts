// hooks/useBankForm.ts 
"use client";

import { useState, useEffect } from 'react';
import { detectUserCountry } from '@/utils/countryDetection';

type Bank = {
    name: string;
    code: string;
    country: string;
};

export const useBankForm = () => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [isLoadingBanks, setIsLoadingBanks] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isDetectingCountry, setIsDetectingCountry] = useState(true);

    // Detect user's country on mount
    useEffect(() => {
        const detectCountry = async () => {
            setIsDetectingCountry(true);
            
            const detected = await detectUserCountry();
            
            if (detected) {
                const countryCode = detected.code;
                setSelectedCountry(countryCode);
                console.log(`✅ Detected country: ${detected.name} (${countryCode})`);
            } else {
                setSelectedCountry('gh'); // Fallback to Ghana
                console.log('⚠️ Could not detect country, defaulting to Ghana');
            }
            
            setIsDetectingCountry(false);
        };

        detectCountry();
    }, []);

    // Fetch banks when country changes
    useEffect(() => {
        if (isDetectingCountry || !selectedCountry) return;

        const fetchBanks = async () => {
            setIsLoadingBanks(true);
            try {
                const response = await fetch(`/api/banks?country=${selectedCountry}`);
                const data = await response.json();

                if (data.success && data.banks) {
                    setBanks(data.banks);
                    console.log(`✅ Loaded ${data.banks.length} banks for ${selectedCountry}`);
                } else {
                    setBanks([]);
                }
            } catch (err) {
                console.error('Failed to fetch banks:', err);
                setBanks([]);
            } finally {
                setIsLoadingBanks(false);
            }
        };

        fetchBanks();
    }, [selectedCountry, isDetectingCountry]);

    const bankOptions = banks.map(bank => ({
        label: bank.name,
        value: bank.code,
    }));

    const getBankFromCode = (bankCode: string) => {
        return banks.find(b => b.code === bankCode);
    };

    // ✅ Watch for country changes from form
    const handleCountryChange = (newCountry: string) => {
        setSelectedCountry(newCountry);
    };

    return {
        banks,
        bankOptions,
        isLoadingBanks,
        selectedCountry,
        setSelectedCountry: handleCountryChange,
        isDetectingCountry,
        getBankFromCode,
    };
};