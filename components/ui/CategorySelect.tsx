import React from 'react';
import { eventCategories } from "@/data/dummy.general";

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
                disabled={disabled}
                required={required}
                className="w-full h-12 px-4 bg-primary-100 border-2 border-accent text-white rounded-xl normal-text-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {includeAllOption && (
                    <option value="">{placeholder}</option>
                )}
                {!includeAllOption && !value && (
                    <option value="" disabled>{placeholder}</option>
                )}
                {eventCategories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;