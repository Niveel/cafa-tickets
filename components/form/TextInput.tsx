import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { TextInputProps } from "@/types/form.types";

const TextInput = ({
    icon,
    name,
    label,
    value,
    onChange,
    placeholder,
    multiline = false,
    rows = 4,
    iconAria,
    iconClick,
    required = false,
    type = 'text',
    ...otherProps
}: TextInputProps) => {
    const inputId = `input-${name}`;

    return (
        <div className="w-full">
            <label 
                htmlFor={inputId} 
                className='block mb-2 normal-text font-semibold text-white'
            >
                {label}
                {required && <span className="text-accent-50 ml-1" aria-label="required">*</span>}
            </label>

            {!multiline ? (
                <div className="relative w-full">
                    <input
                        type={type}
                        id={inputId}
                        name={name}
                        className={`w-full h-12 ${icon ? 'pr-12' : 'pr-4'} pl-4 bg-primary-100 border-2 border-accent text-white placeholder:text-slate-400 normal-text rounded-xl outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300`}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        aria-required={required}
                        aria-invalid={false}
                        {...(otherProps as InputHTMLAttributes<HTMLInputElement>)}
                    />
                    {icon && (
                        <button
                            type="button"
                            className='absolute right-0 top-0 h-12 w-12 text-slate-300 hover:text-accent-50 flex items-center justify-center text-xl transition-colors duration-300'
                            aria-label={iconAria || 'Icon button'}
                            onClick={iconClick}
                            tabIndex={0}
                        >
                            <i className={`fas fa-${icon}`} aria-hidden="true"></i>
                        </button>
                    )}
                </div>
            ) : (
                <textarea
                    id={inputId}
                    name={name}
                    className='w-full px-4 py-3 bg-primary-100 border-2 border-accent text-white placeholder:text-slate-400 normal-text rounded-xl resize-none outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300'
                    placeholder={placeholder}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    aria-required={required}
                    aria-invalid={false}
                    {...(otherProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                ></textarea>
            )}
        </div>
    );
}

export default TextInput;