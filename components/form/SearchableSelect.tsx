"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Check } from 'lucide-react';

type Option = {
    label: string;
    value: string;
    metadata?: Record<string, any>;
};

type SearchableSelectProps = {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    error?: string;
};

const SearchableSelect = ({
    name,
    label,
    value,
    onChange,
    onBlur,
    options,
    placeholder = 'Search...',
    required = false,
    disabled = false,
    isLoading = false,
    error,
}: SearchableSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Filter options based on search query
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get selected option label
    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption?.label || '';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll highlighted option into view
    useEffect(() => {
        if (isOpen && listRef.current) {
            const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
            if (highlightedElement) {
                highlightedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex, isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => 
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredOptions[highlightedIndex]) {
                    handleSelect(filteredOptions[highlightedIndex].value);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setSearchQuery('');
                break;
            case 'Tab':
                setIsOpen(false);
                setSearchQuery('');
                break;
        }
    };

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(0);
        onBlur();
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
        setSearchQuery('');
        inputRef.current?.focus();
    };

    const handleOpen = () => {
        if (disabled || isLoading) return;
        setIsOpen(true);
        setSearchQuery('');
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
        <div ref={containerRef} className="relative">
            {/* Label */}
            <label
                htmlFor={name}
                className="block normal-text-2 font-semibold text-slate-200 mb-2"
            >
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {/* Selected Value Display / Trigger */}
            <div
                onClick={handleOpen}
                className={`
                    w-full px-4 py-3 bg-primary-200 rounded-lg border-2 transition-all
                    flex items-center justify-between cursor-pointer
                    ${isOpen ? 'border-accent' : 'border-accent/30'}
                    ${error ? 'border-red-500' : ''}
                    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent/50'}
                `}
            >
                <span className={`normal-text-2 ${displayValue ? 'text-white' : 'text-slate-500'}`}>
                    {isLoading ? 'Loading banks...' : displayValue || placeholder}
                </span>
                
                <div className="flex items-center gap-2">
                    {value && !disabled && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 hover:bg-accent/20 rounded transition-colors"
                            aria-label="Clear selection"
                        >
                            <X className="w-4 h-4 text-slate-400" />
                        </button>
                    )}
                    <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-primary-200 border-2 border-accent rounded-lg shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="p-3 border-b border-accent/30">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setHighlightedIndex(0);
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="Type to search..."
                                className="w-full pl-10 pr-4 py-2 bg-primary rounded-lg border-2 border-accent/30 text-white normal-text-2 focus:outline-none focus:border-accent transition-all"
                            />
                        </div>
                    </div>

                    {/* Options List */}
                    <ul
                        ref={listRef}
                        className="max-h-64 overflow-y-auto"
                        role="listbox"
                    >
                        {filteredOptions.length === 0 ? (
                            <li className="px-4 py-3 text-center normal-text-2 text-slate-400">
                                No banks found
                            </li>
                        ) : (
                            filteredOptions.map((option, index) => {
                                const isSelected = option.value === value;
                                const isHighlighted = index === highlightedIndex;

                                return (
                                    <li
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                        className={`
                                            px-4 py-3 cursor-pointer flex items-center justify-between
                                            transition-colors normal-text-2
                                            ${isHighlighted ? 'bg-accent/20' : ''}
                                            ${isSelected ? 'bg-accent/10 text-accent-50' : 'text-slate-200'}
                                            hover:bg-accent/20
                                        `}
                                        role="option"
                                        aria-selected={isSelected}
                                    >
                                        <span>{option.label}</span>
                                        {isSelected && (
                                            <Check className="w-4 h-4 text-accent-50" />
                                        )}
                                    </li>
                                );
                            })
                        )}
                    </ul>

                    {/* Results Count */}
                    {searchQuery && (
                        <div className="px-4 py-2 border-t border-accent/30 bg-primary-100">
                            <p className="small-text text-slate-400">
                                {filteredOptions.length} bank{filteredOptions.length !== 1 ? 's' : ''} found
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;