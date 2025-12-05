import { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
    icon?: string;
    name: string;
    label: string;
    placeholder?: string;
    rows?: number;
    iconAria?: string;
    iconClick?: () => void;
};

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "name" | "value" | "onChange"
> & {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

type TextareaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "value" | "onChange"
> & {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

// Fixed: Allow multiline to be optional boolean, defaulting to false behavior
export type TextInputProps = BaseProps & {
    multiline?: boolean;
} & (InputProps & TextareaProps)