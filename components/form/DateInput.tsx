import React from 'react';
import { CalendarDays } from 'lucide-react';

type Props = {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    required?: boolean;
    min?: string;
    max?: string;
};

const DateInput = ({ name, label, value, onChange, onBlur, required = false, min, max }: Props) => {
    const inputId = `date-${name}`;

    return (
        <div className="w-full">
            <label 
                htmlFor={inputId} 
                className="block mb-2 normal-text font-semibold text-white"
            >
                {label}
                {required && <span className="text-accent-50 ml-1" aria-label="required">*</span>}
            </label>
            <div className="relative">
                <input
                    type="date"
                    id={inputId}
                    name={name}
                    value={value || ''} // ✅ Convert null/undefined to empty string
                    onChange={onChange}
                    onBlur={onBlur}
                    min={min}
                    max={max}
                    className="w-full h-12 pl-12 pr-4 bg-primary-100 border-2 border-accent text-white rounded-xl outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 scheme-dark"
                    aria-required={required}
                    aria-invalid={false}
                />
                <CalendarDays
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-50 pointer-events-none"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
};

export default DateInput;