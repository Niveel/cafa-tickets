"use client";

import React, { useState } from 'react';
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react';

interface EventsSortTabProps {
    selectedSort: string;
    onSortChange: (sort: string) => void;
}

const sortOptions = [
    { value: '-start_date', label: 'Latest First', description: 'Newest events first' },
    { value: 'start_date', label: 'Earliest First', description: 'Upcoming events first' },
    { value: '-created_at', label: 'Recently Added', description: 'Newly created events' },
    { value: 'created_at', label: 'Oldest Added', description: 'Earliest created events' },
    { value: 'price', label: 'Price: Low to High', description: 'Cheapest tickets first' },
    { value: '-price', label: 'Price: High to Low', description: 'Most expensive first' },
    { value: 'popularity', label: 'Most Popular', description: 'Highest ticket sales' }
];

const EventsSortTab = ({ selectedSort, onSortChange }: EventsSortTabProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectedOption = sortOptions.find(opt => opt.value === selectedSort) || sortOptions[0];

    const handleSelect = (value: string) => {
        onSortChange(value);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Sort Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-6 py-3 bg-primary-100 text-white rounded-xl font-bold normal-text border-2 border-accent hover:bg-primary-200 transition-all duration-300 min-w-[200px]"
                type="button"
                aria-label="Sort events"
                aria-expanded={isOpen}
            >
                <ArrowUpDown className="w-5 h-5 text-accent-50" aria-hidden="true" />
                <span className="flex-1 text-left">{selectedOption.label}</span>
                <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    ></div>

                    {/* Dropdown Content */}
                    <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-primary rounded-xl border-2 border-accent shadow-2xl z-50 min-w-[280px]">
                        {sortOptions.map((option) => {
                            const isSelected = selectedSort === option.value;
                            
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                                        isSelected
                                            ? 'bg-accent text-white'
                                            : 'text-slate-200 hover:bg-primary-100'
                                    }`}
                                    type="button"
                                >
                                    <div className="w-5 h-5 shrink-0 mt-0.5">
                                        {isSelected && (
                                            <Check className="w-5 h-5" aria-hidden="true" />
                                        )}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="normal-text-2 font-bold">
                                            {option.label}
                                        </p>
                                        <p className="small-text opacity-80">
                                            {option.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default EventsSortTab;