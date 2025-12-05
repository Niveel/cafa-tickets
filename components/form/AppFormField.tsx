"use client";

import { useFormikContext } from 'formik';
import { TextInput, AppErrorMessage, SelectInput, DateInput } from "@/components";

type StringFieldFormValues = Record<string, string>;
type Option = { value: string; label: string };

type Props<Values extends StringFieldFormValues = StringFieldFormValues> = {
    name: keyof Values & string;
    label: string;
    multiline?: boolean;
    rows?: number;
    styles?: string;
    options?: Option[];
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select' | 'date';
    required?: boolean;
    placeholder?: string;
    min?: string;
    max?: string;
} & Omit<
    React.ComponentPropsWithoutRef<typeof TextInput>,
    'name' | 'label' | 'value' | 'onChange' | 'onBlur'
>;

const AppFormField = <Values extends StringFieldFormValues = StringFieldFormValues>({
    name,
    label,
    multiline = false,
    rows = 4,
    styles,
    options = [],
    type = 'text',
    required = false,
    placeholder,
    min,
    max,
    ...props
}: Props<Values>) => {
    const { errors, setFieldTouched, handleChange, touched, values } = useFormikContext<Values>();

    const error = errors[name] as string;
    const isTouched = touched[name] as boolean;
    const value = values[name];

    return (
        <div className={`flex flex-col gap-2 ${styles}`}>
            {type === 'select' ? (
                <SelectInput
                    name={name}
                    label={label}
                    value={value}
                    onChange={handleChange(name)}
                    onBlur={() => setFieldTouched(name)}
                    options={options}
                    required={required}
                    placeholder={placeholder}
                />
            ) : type === 'date' ? (
                <DateInput
                    name={name}
                    label={label}
                    value={value}
                    onChange={handleChange(name)}
                    onBlur={() => setFieldTouched(name)}
                    required={required}
                    min={min}
                    max={max}
                />
            ) : (
                <TextInput
                    type={type}
                    name={name}
                    label={label}
                    multiline={multiline}
                    rows={rows}
                    onBlur={() => setFieldTouched(name)}
                    onChange={handleChange(name)}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    {...props}
                />
            )}
            <AppErrorMessage error={error} visible={isTouched} />
        </div>
    );
}

export default AppFormField;