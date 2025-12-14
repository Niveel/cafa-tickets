import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
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

    // Map icon names to Lucide components
    const getIconComponent = () => {
        if (!icon) return null;
        
        switch (icon) {
            case 'eye':
                return <Eye className="w-5 h-5" aria-hidden="true" />;
            case 'eye-slash':
                return <EyeOff className="w-5 h-5" aria-hidden="true" />;
            default:
                // Fallback to Font Awesome if not a known Lucide icon
                return <i className={`fas fa-${icon}`} aria-hidden="true"></i>;
        }
    };

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
                            className='absolute right-0 top-0 h-12 w-12 text-slate-300 hover:text-accent-50 flex items-center justify-center transition-colors duration-300'
                            aria-label={iconAria || 'Icon button'}
                            onClick={iconClick}
                            tabIndex={0}
                        >
                            {getIconComponent()}
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