"use client";

import React, { useEffect } from 'react';
import { EventCategory } from "@/types/general.types";

type Props = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    includeAllOption?: boolean;
    required?: boolean;
    disabled?: boolean;
    className?: string;
};

const CategorySelect = ({
    id,
    value,
    onChange,
    label,
    placeholder = "Select a category",
    includeAllOption = false,
    required = false,
    disabled = false,
    className = ""
}: Props) => {
    const [categories, setCategories] = React.useState<EventCategory[]>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/events/categories');
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={className}>
            {label && (
                <label 
                    htmlFor={id} 
                    className="block normal-text-2 text-slate-300 font-medium mb-2"
                >
                    {label}
                    {required && <span className="text-accent-50 ml-1">*</span>}
                </label>
            )}
            <select
                id={id}
                value={value}
                onChange={handleChange}
                disabled={disabled || loading}
                required={required}
                className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <option value="" disabled>Loading categories...</option>
                ) : (
                    <>
                        {includeAllOption && (
                            <option value="">{placeholder}</option>
                        )}
                        {!includeAllOption && !value && (
                            <option value="" disabled>{placeholder}</option>
                        )}
                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </>
                )}
            </select>
        </div>
    );
};

export default CategorySelect;