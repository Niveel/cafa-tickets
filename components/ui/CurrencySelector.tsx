"use client";

import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

const CurrencySelector = () => {
    const { displayCurrency, setDisplayCurrency, getAllCurrencies, getCurrencySymbol } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const allCurrencies = getAllCurrencies();
    
    // Popular currencies to show first
    const popularCurrencies = ['GHS', 'USD', 'GBP', 'EUR', 'NGN', 'ZAR', 'KES', 'JPY', 'CNY'];
    
    const filteredCurrencies = allCurrencies.filter(curr =>
        curr.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (currency: string) => {
        setDisplayCurrency(currency);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-200 hover:bg-primary-100 rounded-lg border-2 border-accent/30 hover:border-accent transition-all normal-text-2 text-white"
                aria-label="Select currency"
            >
                <Globe className="w-4 h-4" />
                <span className="font-semibold">{displayCurrency}</span>
                <span className="text-slate-400">{getCurrencySymbol(displayCurrency)}</span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-primary rounded-xl border-2 border-accent shadow-2xl z-50 overflow-hidden">
                    {/* Search */}
                    <div className="p-3 border-b border-accent/30">
                        <input
                            type="text"
                            placeholder="Search currency..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-primary-200 rounded-lg text-white small-text focus:outline-none focus:ring-2 focus:ring-accent"
                            autoFocus
                        />
                    </div>

                    {/* Currency List */}
                    <div className="max-h-96 overflow-y-auto">
                        {/* Popular Section */}
                        {!search && (
                            <div className="p-3 border-b border-accent/20">
                                <p className="small-text text-slate-400 mb-2 font-semibold">Popular</p>
                                <div className="space-y-1">
                                    {popularCurrencies.map(curr => (
                                        <button
                                            key={curr}
                                            onClick={() => handleSelect(curr)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all normal-text-2 ${
                                                curr === displayCurrency
                                                    ? 'bg-accent text-white'
                                                    : 'hover:bg-primary-200 text-slate-200'
                                            }`}
                                        >
                                            <span className="font-semibold">{curr}</span>
                                            <span className="text-slate-400">{getCurrencySymbol(curr)}</span>
                                            {curr === displayCurrency && <Check className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Currencies */}
                        <div className="p-3">
                            {!search && <p className="small-text text-slate-400 mb-2 font-semibold">All Currencies</p>}
                            <div className="space-y-1">
                                {filteredCurrencies.map(curr => (
                                    <button
                                        key={curr}
                                        onClick={() => handleSelect(curr)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all small-text ${
                                            curr === displayCurrency
                                                ? 'bg-accent text-white'
                                                : 'hover:bg-primary-200 text-slate-200'
                                        }`}
                                    >
                                        <span className="font-semibold">{curr}</span>
                                        <span className="text-slate-400">{getCurrencySymbol(curr)}</span>
                                        {curr === displayCurrency && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default CurrencySelector;