"use client";

import { useFormikContext } from 'formik';
import { ButtonHTMLAttributes } from 'react';
import { AppButton } from "@/components";

type Props = {
    title: string;
    forceEnable?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'>;

const SubmitButton = ({ title, forceEnable = false, ...props }: Props) => {
    const { handleSubmit, isValid, dirty, isSubmitting } = useFormikContext();

    const isDisabled = !(isValid && (dirty || forceEnable)) || isSubmitting;

    return (
        <AppButton
            type='submit'
            title={isSubmitting ? 'Submitting...' : title}
            variant="primary"
            size="lg"
            fullWidth
            disabled={isDisabled}
            className={isDisabled ? "cursor-not-allowed opacity-50" : ""}
            onClick={() => {
                if (!isDisabled) {
                    handleSubmit();
                }
            }}
            aria-busy={isSubmitting}
            aria-disabled={isDisabled}
            {...props}
        />
    );
}

export default SubmitButton;